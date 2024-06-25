package com.trek.TaskTrek.entity;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@Getter
@Setter
public class Task {
    @Id
    private ObjectId id;
    @NonNull
    private String heading;
    private String description;
    @NonNull
    private String category;
    @NonNull
    private Date start;
    @NonNull
    private Date end;
    @NonNull
    private String status;
    private String taskComment;

    @DBRef(db = "teamMembers")
    private TeamMembers teamMember;
}
