package com.trek.TaskTrek.entity;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.bson.types.Binary;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@Getter
@Setter
public class Task {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
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
    private Date complete;
    @NonNull
    private String status;
    private String taskComment;

//    private Binary file;

}
