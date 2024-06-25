package com.trek.TaskTrek.repositories;

import com.trek.TaskTrek.entity.Admin;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdminRepository extends MongoRepository<Admin, ObjectId> {
    public Admin findByUsername(String username);
}
