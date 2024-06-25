package com.trek.TaskTrek.repositories;

import com.trek.TaskTrek.entity.Task;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TaskRepository extends MongoRepository<Task, ObjectId> {
    public Task findTaskById(ObjectId id);
}
