package com.trek.TaskTrek.services;

import com.trek.TaskTrek.entity.Task;
import com.trek.TaskTrek.entity.TeamMembers;
import com.trek.TaskTrek.repositories.TaskRepository;
import com.trek.TaskTrek.repositories.TeamMembersRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.ObjectInput;
import java.util.List;
@Component
public class TeamMembersService {
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private TeamMembersRepository rep;

    @Autowired
    private TaskRepository task_rep;

    public void createTeamMember(TeamMembers user) {
        rep.save(user);
    }

    public TeamMembers getTeamMember(String username){
        return rep.findByUsername(username);

    }
    public TeamMembers fetchUserByUsername(String username){
        return rep.findByUsername(username);
    }
    public TeamMembers createUser(TeamMembers user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        rep.save(user);
        return user;

    }

    public List<Task>  fetchTaskEntriesByUsername(String username){
        TeamMembers t = fetchUserByUsername(username);
        return t.getTaskEntries();
    }
    public void deleteByUsername(String username){
        rep.deleteByUsername(username);
    }
}
