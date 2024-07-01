package com.trek.TaskTrek.controllers;

import com.trek.TaskTrek.entity.Admin;
import com.trek.TaskTrek.entity.Task;
import com.trek.TaskTrek.entity.TeamMembers;
import com.trek.TaskTrek.resultEntities.TokenClass;
import com.trek.TaskTrek.services.AdminService;
import com.trek.TaskTrek.services.TaskService;
import com.trek.TaskTrek.services.TeamMembersService;
import com.trek.TaskTrek.utils.JwtUtil;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("admin")
public class AdminController {
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(15);

    @Autowired
    private AdminService adminService;

    @Autowired
    private TeamMembersService teamService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

//    @Autowired
//    private TokenClass token;

    @PostMapping("/")
    public ResponseEntity<?> login(@RequestBody Admin a){
        try{
            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(a.getUsername(),a.getPassword()));
            String jwt = jwtUtil.generateToken(a.getUsername());
            TokenClass token = new TokenClass(jwt);
            return new ResponseEntity<>(token, HttpStatus.OK);
        }catch(Exception e){
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody Admin user){
        try{
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            Admin a = adminService.createUser(user);
            return new ResponseEntity<>(true,HttpStatus.OK);
        }catch(Exception e) {
            return new ResponseEntity<>(false,HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getTeam")
    public ResponseEntity<?> getCompanyTeam(){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            List<?> teamMembers = adminService.fetchCompanyTeamMembers(authentication.getName());
            return new ResponseEntity<>(teamMembers, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add-member")
    public ResponseEntity<?> addTeamMember(@RequestBody TeamMembers t){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Admin a = adminService.fetchUserByUsername(authentication.getName());
            String password = passwordEncoder.encode(a.getCompany() +'@'+ t.getUsername());
            t.setPassword(password);
            t.setCompany(a.getCompany());
            boolean res = adminService.addTeamMember(t,a);
            return new ResponseEntity<>(res,HttpStatus.OK);
        }catch(Exception e){
            System.out.println(e.getMessage());

            return new ResponseEntity<>(false,HttpStatus.BAD_REQUEST);
        }

    }
    @GetMapping("/getTeamTasks")
    public ResponseEntity<?> getCompanyTeamTasks(){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            List<Optional<TeamMembers>> teamMembers = adminService.fetchCompanyTeamMembers(authentication.getName());
            HashMap <String, List<Task>> teamData = new HashMap<>();
            for(Optional<TeamMembers> s:teamMembers){
                List<Task> entries = teamService.fetchTaskEntriesByUsername(s.get().getUsername());
                List<Task> tasks = new ArrayList<>();
                for(Task t : entries){
                    tasks.add(taskService.fetchTaskById(t.getId()));
                }
                teamData.put(s.get().getUsername(),tasks);
            }
           return new ResponseEntity<>(teamData, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping("/addTask/{username}/{date}")
    public ResponseEntity<?> addTeamTask(@RequestBody Task t, @PathVariable String username, @PathVariable String date){
        try{
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            t.setEnd(sdf.parse(date));
            t.setStart(new Date());
            t.setStatus("false");
            TeamMembers member = teamService.fetchUserByUsername(username);
            Task Db_t =taskService.addTask(t);
            member.getTaskEntries().add(Db_t);
            teamService.createTeamMember(member);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }catch(Exception e){
            System.out.println(e.getMessage());
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }

    }
}
