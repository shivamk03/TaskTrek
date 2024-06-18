package com.trek.tasktrek.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
public class Response {
    private boolean success;
    private User user;
}
