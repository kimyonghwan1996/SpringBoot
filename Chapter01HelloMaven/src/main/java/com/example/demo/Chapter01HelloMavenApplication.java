package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication //스프링부트로 만든 애플리케이션 시작 클래스임
public class Chapter01HelloMavenApplication {

	public static void main(String[] args) {
		SpringApplication.run(Chapter01HelloMavenApplication.class, args);
		
		System.out.println("hello spring boot");
	}

}
