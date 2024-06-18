package com.trek.tasktrek.repositories;

import com.trek.tasktrek.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, ObjectId> {
    public User findByEmail(String email);
}
