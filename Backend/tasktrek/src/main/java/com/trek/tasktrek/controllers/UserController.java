package com.trek.tasktrek.controllers;

import com.trek.tasktrek.entity.Response;
import com.trek.tasktrek.entity.User;
import com.trek.tasktrek.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("user")
public class UserController {
    @Autowired
    private UserServices service;

    @PostMapping("/")
    public ResponseEntity<?> login(@RequestBody User user){
        User u = service.getUser(user.getEmail());
        Response r = new Response();
        if(u!=null && u.getPassword().equals(user.getPassword())){
            r.setSuccess(true);
            r.setUser(u);
            return new ResponseEntity<>(r, HttpStatus.OK);
        }
        r.setSuccess(false);
        r.setUser(null);
        return new ResponseEntity<>(r, HttpStatus.NOT_FOUND);
    }

    @PostMapping("/create-user")
    public ResponseEntity<?> createUser(@RequestBody User user){
        try{
            user.setRole("user");
            User u =service.createUser(user);
            Response r = new Response();
            r.setSuccess(true);
            r.setUser(u);
            return new ResponseEntity<>(r , HttpStatus.OK);
        }catch(Exception e){
            Response r = new Response();
            r.setSuccess(false);
            r.setUser(null);
            return new ResponseEntity<>(r , HttpStatus.NOT_FOUND);
        }
    }
}
