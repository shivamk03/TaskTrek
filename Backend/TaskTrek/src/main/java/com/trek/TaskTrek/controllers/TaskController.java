package com.trek.TaskTrek.controllers;

import com.trek.TaskTrek.entity.Task;
import com.trek.TaskTrek.services.EmailSenderService;
import com.trek.TaskTrek.services.TaskService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("task")
public class TaskController {
    @Autowired
    private TaskService service;

    @Autowired
    EmailSenderService senderService;

    @PostMapping("/update-status/{id}")
    public ResponseEntity<?> updateTask(@RequestBody Task t, @PathVariable ObjectId id){
        try{
            boolean res = service.updateStatus(id, t.getStatus());
            if(res) {
//                senderService.statusUpdated()
                return new ResponseEntity<>(true, HttpStatus.OK);
            }
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }catch(Exception e){
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/update-comment/{id}")
    public ResponseEntity<?> updateComment(@RequestBody Task t, @PathVariable ObjectId id){
        try{
            boolean res = service.addComment(id, t.getTaskComment());
            if(res) {
                return new ResponseEntity<>(true, HttpStatus.OK);
            }
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }catch(Exception e){
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }
}
