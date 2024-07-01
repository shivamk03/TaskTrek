package com.trek.TaskTrek.controllers;
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

import java.util.ArrayList;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("team")
public class TeamMembersController {
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    @Autowired
    private TeamMembersService service;

    @Autowired
    private TaskService taskService;

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
            TeamMembers t = service.fetchUserByUsername(teamMember.getUsername());
            List<Task> entries = t.getTaskEntries();
            List<Task> result = new ArrayList<>();
            for(Task id :entries){
                result.add(taskService.fetchTaskById(id.getId()));
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }



}
