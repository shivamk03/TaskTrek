package com.trek.TaskTrek.services;

import com.trek.TaskTrek.entity.Admin;
import com.trek.TaskTrek.entity.TeamMembers;
import com.trek.TaskTrek.repositories.AdminRepository;
import com.trek.TaskTrek.repositories.TeamMembersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AdminService {
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(15);

    @Autowired
    private AdminRepository rep;

    @Autowired
    private TeamMembersRepository t_rep;

    public Admin createUser(Admin user){
        rep.save(user);
        return user;
    }

    public Admin fetchUserByUsername(String username){
        return rep.findByUsername(username);
    }
    public List<Optional<TeamMembers>> fetchCompanyTeamMembers(String username){
        Admin a = rep.findByUsername(username);
        List<TeamMembers> teamMembers = a.getTeamMembers();
        List<Optional<TeamMembers>> teamMemberDetails = new ArrayList<>();
        for(TeamMembers t : teamMembers){
            teamMemberDetails.add(t_rep.findById(t.getId()));

        }
        return teamMemberDetails;
    }
    public boolean addTeamMember(TeamMembers t,Admin a){
        try{
            TeamMembers new_t = t_rep.save(t);
            a.getTeamMembers().add(new_t);
            rep.save(a);
            return true;
        }catch(Exception e){
            System.out.println(e.getMessage());
            return false;
        }
    }
}
