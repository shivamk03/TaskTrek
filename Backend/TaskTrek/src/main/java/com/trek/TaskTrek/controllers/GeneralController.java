package com.trek.TaskTrek.controllers;
import com.trek.TaskTrek.entity.Admin;
import com.trek.TaskTrek.entity.TeamMembers;
import com.trek.TaskTrek.entity.UserInput;
import com.trek.TaskTrek.resultEntities.AdminResult;
import com.trek.TaskTrek.resultEntities.TeamResult;
import com.trek.TaskTrek.services.AdminService;
import com.trek.TaskTrek.services.EmailSenderService;
import com.trek.TaskTrek.services.TeamMembersService;
import com.trek.TaskTrek.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("general")
public class GeneralController {

    @Autowired
    private JwtUtil jwtUtil;

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(15);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AdminService adminService;

    @Autowired
    private TeamMembersService teamMemberService;

    @Autowired
    private EmailSenderService emailSenderService;
    @PostMapping("/")
    public ResponseEntity<?> login(@RequestBody UserInput u){
        try{
            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(u.getUsername(),u.getPassword()));
            String jwt = jwtUtil.generateToken(u.getUsername());
            AdminResult token = new AdminResult(jwt);
            return new ResponseEntity<>(token, HttpStatus.OK);
        }catch(Exception e){
            try{
                TeamMembers entry = teamMemberService.fetchUserByUsername(u.getUsername());
                boolean matched = passwordEncoder.matches(u.getPassword(),entry.getPassword());
                if(matched){
                    TeamResult res = new TeamResult(entry);
                    return new ResponseEntity<>(res, HttpStatus.OK);
                }
                return new ResponseEntity<>(null,HttpStatus.NOT_ACCEPTABLE);
            }catch(Exception exc){
                System.out.println(e.getMessage());
                return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
            }
        }
    }

    @PostMapping("/forgotPassword")
    public ResponseEntity<?> forgotPasswordEndpoint(@RequestBody UserInput u){
        try{
            Admin a = adminService.fetchUserByUsername(u.getUsername());
            if(a!=null){
                String jwtExpiry = jwtUtil.generateTokenForgotPassword(u.getUsername());
                emailSenderService.sendResetPasswordGeneration(u.getUsername(),jwtExpiry);
                return new ResponseEntity<>(null, HttpStatus.OK);
            }

            TeamMembers t = teamMemberService.fetchUserByUsername(u.getUsername());
            if(t!=null){
                String jwtExpiry = jwtUtil.generateTokenForgotPassword(u.getUsername());
                emailSenderService.sendResetPasswordGeneration(u.getUsername(),jwtExpiry);
                return new ResponseEntity<>(null, HttpStatus.OK);
            }
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/setNewPassword/{expiryTimeToken}")
    public ResponseEntity<?> setNewPassword(@RequestBody UserInput user, @PathVariable String expiryTimeToken){
        long currentMilli = new Date().getTime();
        if(jwtUtil.isTokenExpired(expiryTimeToken) || jwtUtil.validateToken(expiryTimeToken, user.getUsername())){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        try{
            Admin a =adminService.fetchUserByUsername(user.getUsername());
            if(a!=null){
                a.setPassword(passwordEncoder.encode(user.getPassword()));
                adminService.createUser(a);
                emailSenderService.sendPasswordResetSuccessful(user.getUsername());
                return new ResponseEntity<>(null, HttpStatus.OK);
            }
            TeamMembers t = teamMemberService.fetchUserByUsername(user.getUsername());
            if(t!=null){
                t.setPassword(passwordEncoder.encode(user.getPassword()));
                teamMemberService.createTeamMember(t);
                emailSenderService.sendPasswordResetSuccessful(user.getUsername());
                return new ResponseEntity<>(null, HttpStatus.OK);
            }
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
