package com.trek.TaskTrek.repositories;

import com.trek.TaskTrek.entity.TeamMembers;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.DeleteQuery;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TeamMembersRepository extends MongoRepository<TeamMembers, ObjectId> {
    @DeleteQuery
    public void deleteByUsername(String username);
    public TeamMembers findByUsername(String username);
}
