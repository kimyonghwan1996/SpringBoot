package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


// @Controller
@RestController //@ResponseBody 안써도 됨
public class HelloController {
    public HelloController() {
        System.out.println("hellocontroller 기본 생성자");
    }

    @GetMapping("hello")
    // @ResponseBody
    public String hello(@RequestParam(value="name") String name) {
        
        return "안녕하슈 " + name;
    }
    
}
