package com.trek.tasktrek.services;

import com.trek.tasktrek.entity.User;
import com.trek.tasktrek.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserServices {
    @Autowired
    private UserRepository rep;

    public User createUser(User user){
        rep.save(user);
        return user;
    }

    public User getUser(String email){
        return rep.findByEmail(email);
    }
}
