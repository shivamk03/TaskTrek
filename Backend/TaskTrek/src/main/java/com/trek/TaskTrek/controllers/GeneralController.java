package com.trek.TaskTrek.controllers;

import com.trek.TaskTrek.entity.TeamMembers;
import com.trek.TaskTrek.entity.UserInput;
import com.trek.TaskTrek.resultEntities.AdminResult;
import com.trek.TaskTrek.resultEntities.TeamResult;
import com.trek.TaskTrek.services.TeamMembersService;
import com.trek.TaskTrek.utils.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.coyote.Response;
import com.trek.TaskTrek.entity.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("general")
public class GeneralController {

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(15);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private TeamMembersService service;

    @PostMapping("/")
    public ResponseEntity<?> login(@RequestBody UserInput u){
        try{
            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(u.getUsername(),u.getPassword()));
            String jwt = jwtUtil.generateToken(u.getUsername());
            AdminResult token = new AdminResult(jwt);
            return new ResponseEntity<>(token, HttpStatus.OK);
        }catch(Exception e){
            try{
                TeamMembers entry = service.fetchUserByUsername(u.getUsername());
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
}
