package com.trek.TaskTrek.resultEntities;

import com.trek.TaskTrek.entity.TeamMembers;

public class TeamResult {
    public String userType = "Team Member";
    public TeamMembers member;
    public TeamResult(TeamMembers t){
        this.member = t;
    }
}
