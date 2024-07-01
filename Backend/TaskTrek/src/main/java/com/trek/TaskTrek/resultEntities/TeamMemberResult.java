package com.trek.TaskTrek.resultEntities;

import com.trek.TaskTrek.entity.Task;

import java.util.List;

public class TeamMemberResult {
    public List<Task> member;
    public TeamMemberResult(List<Task> s){
        member=s;
    }
}
