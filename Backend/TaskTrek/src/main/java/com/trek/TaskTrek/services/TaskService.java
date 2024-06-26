package com.trek.TaskTrek.services;

import com.trek.TaskTrek.entity.Task;
import com.trek.TaskTrek.repositories.TaskRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TaskService {
    @Autowired
    private TaskRepository rep;


    public Task addTask(Task t){
        return rep.save(t);
    }
    public Task fetchTaskById(ObjectId id){
        return rep.findTaskById(id);
    }

    public boolean updateStatus(ObjectId id, String status){
        Task t = rep.findTaskById(id);
        if(t==null){
            return false;
        }
        t.setStatus(status);
        rep.save(t);
        return true;
    }
    public boolean addComment(ObjectId id, String comment){
        Task t = rep.findTaskById(id);
        if(t==null){
            return false;
        }
        t.setTaskComment(comment);
        rep.save(t);
        return true;
    }
}

