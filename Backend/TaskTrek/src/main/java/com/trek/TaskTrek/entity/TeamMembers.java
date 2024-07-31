package com.trek.TaskTrek.entity;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
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
public class TeamMembers {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
    private String company;
    @NonNull
    @Indexed(unique = true)
    private String username;
    private String name;
    private String role;
    @NonNull
    private String password;

    @DBRef(lazy = true)
    private List<Task> taskEntries = new ArrayList<>();
}
