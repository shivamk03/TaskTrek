package com.trek.TaskTrek.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class EmailSenderService {
    @Autowired
    private JavaMailSender mailSender;

    public boolean taskGenerationEmail(String toEmail, String subject, String heading, String description, java.util.Date end){
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("kambojshivam045@gmail.com");
            message.setTo(toEmail);
            String str = "A new Task has been assigned to you by your project manager.\nHeading: " + heading + "\nDescription: " + description + "\nThe task will be ending on: " + end;
            message.setText(str);
            message.setSubject(subject);

            mailSender.send(message);
            return true;
        }
        catch(Exception e){
            System.out.println(e.getMessage());
            return false;
        }
    }
    public boolean teamMemberAddGeneration(String toEmail, String company){
        try{
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("kambojshivam035@gmail.com");
            message.setTo(toEmail);
            String subject = "Welcome to TaskTrek";
            String str = "Welcome to TaskTrek, Simplify life for both you and your team. The world’s #1 task manager and to-do list app.\nYou have been added to the team of by the "+company+". Start your journey by logging into your account and get updated with the tasks assigned to you.";
            message.setText(str);
            message.setSubject(subject);

            mailSender.send(message);
            return true;
        }catch(Exception e){
            System.out.println(e.getMessage());
            return false;
        }
    }
    public boolean statusUpdated(String toEmail, String heading, Date d){
        try{
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("kambojshivam045@gmail.com");
            message.setTo(toEmail);
            String subject ="Task status updated successfully";
            String text = "The task "+ heading+ " has been submitted successfully on "+d;
            message.setText(text);
            message.setSubject(subject);

            mailSender.send(message);
            return true;
        }catch(Exception e){
            System.out.println(e.getMessage());
            return false;
        }
    }
}
