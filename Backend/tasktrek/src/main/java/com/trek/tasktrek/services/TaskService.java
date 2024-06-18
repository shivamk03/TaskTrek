package com.trek.tasktrek.services;

import com.trek.tasktrek.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;

@Component
@RequestMapping("user")
public class TaskService {
    @Autowired
    private TaskRepository rep;



}
