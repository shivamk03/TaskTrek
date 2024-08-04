//package com.trek.TaskTrek.services;
//
//import com.trek.TaskTrek.entity.Admin;
//import org.junit.jupiter.api.*;
//import org.junit.jupiter.params.ParameterizedTest;
//import org.junit.jupiter.params.provider.CsvSource;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertNotNull;
//
//@SpringBootTest
//public class AdminServiceTests {
//    @Autowired
//    AdminService adminService;
//
//    @BeforeAll
//    public static void beforeAll(){
//        System.out.println("Before All");
//    }
//
//    @BeforeEach
//    public void beforeEach(){
//        System.out.println("Before Each");
//    }
//
//    @AfterEach
//    public void afterEach(){
//        System.out.println("After Each");
//    }
//
//    @AfterAll
//    public static void afterAll(){
//        System.out.println("After all");
//    }
//
//    @Test
//    public void createUser(){
//        assertEquals(4,2+2);
//    }
//
//    @Test
//    public void findByUsername(){
//        Admin a = adminService.fetchUserByUsername("admin1@gmail.com");
//        assertEquals(a.getUsername(),"admin1@gmail.com");
//        assertNotNull(a);
//    }
//
//    @ParameterizedTest
//    @CsvSource({
//        "1,1,2",
//            "2,2,5",
//            "3,3,4"
//    })
//    public void testingTests(int a, int b, int c){
//        assertEquals(a+b,c);
//    }
//
//
//}
