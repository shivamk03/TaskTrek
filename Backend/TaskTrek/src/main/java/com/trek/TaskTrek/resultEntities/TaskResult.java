package com.trek.TaskTrek.resultEntities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.trek.TaskTrek.entity.Task;
import lombok.NonNull;
import org.bson.types.ObjectId;

import java.util.Date;

//@JsonIgnoreProperties(ignoreUnknown=true)

public class TaskResult {
   public Task t ;
    public String start;
    public String end;
    public String complete;
    public TaskResult(Task t , String start, String end, String complete){
        this.complete= complete;
        this.t= t;
        this.start = start;
        this.end = end;
    }
}
