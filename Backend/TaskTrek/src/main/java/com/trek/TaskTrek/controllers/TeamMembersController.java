package com.trek.TaskTrek.controllers;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.trek.TaskTrek.entity.Task;
import com.trek.TaskTrek.entity.TeamMembers;
import com.trek.TaskTrek.services.TaskService;
import com.trek.TaskTrek.services.TeamMembersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("team")
public class TeamMembersController {
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(15);
    @Autowired
    private TeamMembersService service;

    @Autowired
    private TaskService taskService;

    ObjectMapper mapper = new ObjectMapper();
    @PostMapping("/")
    public ResponseEntity<?> login(@RequestBody TeamMembers a){
        try{
            TeamMembers entry = service.fetchUserByUsername(a.getUsername());
            boolean matched = passwordEncoder.matches(a.getPassword(),entry.getPassword());
            if(matched){
                return new ResponseEntity<>(entry, HttpStatus.OK);
            }
            return new ResponseEntity<>(null,HttpStatus.NOT_ACCEPTABLE);
        }catch(Exception e){
            System.out.println(e.getMessage());
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/fetchAll")
    public ResponseEntity<?> fetchAllTasks(@RequestBody TeamMembers teamMember){
        try{
            DateFormat obj = new SimpleDateFormat("dd MMM yyyy HH:mm:ss:SSS Z");
            TeamMembers t = service.fetchUserByUsername(teamMember.getUsername());
            List<Task> entries = t.getTaskEntries();
            List<Task> result = new ArrayList<>();
            for(Task task :entries){
                Task T = taskService.fetchTaskById((task.getId()));
                result.add(T);
            }

            String json = mapper.writeValueAsString(result);
            return new ResponseEntity<>(json, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }



}
