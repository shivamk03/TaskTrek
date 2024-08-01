package com.trek.TaskTrek.resultEntities;

public class AdminResult {
    public String userType = "admin";
    public String token;
    public AdminResult(String s){
        token=s;
    }
}
