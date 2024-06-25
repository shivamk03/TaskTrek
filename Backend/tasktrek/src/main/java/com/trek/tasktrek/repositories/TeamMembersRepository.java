package com.trek.TaskTrek.repositories;

import com.trek.TaskTrek.entity.TeamMembers;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TeamMembersRepository extends MongoRepository<TeamMembers, ObjectId> {
    public TeamMembers findByUsername(String username);

}
