package com.trek.TaskTrek.entity;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document
@Getter
@Setter
public class Admin {
    @Id
    private ObjectId id;
    @NonNull
    private String company;
    @NonNull
    @Indexed(unique = true)
    private String username;
    @NonNull
    private String password;

    @DBRef(lazy = true)
    private List<TeamMembers> teamMembers = new ArrayList<>();
}