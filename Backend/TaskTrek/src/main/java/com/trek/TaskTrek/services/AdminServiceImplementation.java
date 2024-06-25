package com.trek.TaskTrek.services;

import com.trek.TaskTrek.entity.Admin;
import com.trek.TaskTrek.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class AdminServiceImplementation implements UserDetailsService {

    @Autowired
    AdminRepository a_rep;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Admin a = a_rep.findByUsername(username);
        if (a != null) {
            return org.springframework.security.core.userdetails.User.builder().username(a.getUsername()).password(a.getPassword()).build();
        }
        throw new UsernameNotFoundException("Username not found: " + username);
    }
}
