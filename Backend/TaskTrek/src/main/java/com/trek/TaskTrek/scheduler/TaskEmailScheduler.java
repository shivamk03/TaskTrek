package com.trek.TaskTrek.scheduler;

import com.trek.TaskTrek.entity.Task;
import com.trek.TaskTrek.entity.TeamMembers;
import com.trek.TaskTrek.services.EmailSenderService;
import com.trek.TaskTrek.services.TaskService;
import com.trek.TaskTrek.services.TeamMembersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Component
public class TaskEmailScheduler {

    @Autowired
    private TaskService taskService;

    @Autowired
    private TeamMembersService teamMembersService;

    private final EmailSenderService senderService = new EmailSenderService();

    @Scheduled(fixedRate = 900000)
    public void scheduleEmailSends(){
        try{
            Date d = new Date();
            List<Task> taskList = taskService.fetchAllTask();

            for(Task t:taskList){
//                milliseconds represent 2 days
                if(t.getEnd().getTime()-d.getTime()<=172800000){
                    Optional<TeamMembers> member = teamMembersService.fetchById(t.getId());
                    if(member.isPresent()) {
                        senderService.taskReminderGeneration(member.get().getUsername(),t.getHeading(), t.getDescription(),t.getEnd());
                    }
                }
            }

        }catch (Exception e){
            System.out.println(e.getMessage());
        }

    }

}
