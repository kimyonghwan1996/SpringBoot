package com.example.chapter03;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Chapter03Application {

    public static void main(String[] args) {
        SpringApplication.run(Chapter03Application.class, args);
    }

}
/*
스프링 JPA(Java Persistence API)
스프링에서 데이터를 처리할 수 있도록 돕는 라이브러리이다
데이터베이스에 종속적인 SQL문 없이도 개발이 가능하기 때문에 개발의 생산성을 높일 수 있다
기존의 JDBC 등을 이용해서 직접 구현했던 데이터베이스 관련 작업을 대신 처리해주는 추상화된 계층의 구현 스펙이다

스프링 데이터 JPA를 사용하는 경우는 별도의 구현 클래스를 만들지 않고 인터페이스만 정의함으로써 기능을 사용할 수 있다.
스프링 부트가 내부적으로 인터페이스에 대한 구현 객체를 자동으로 생성해준다.

@Entity
spring-boot-starter-data-jpa 의존성을 추가하고 @Entity 어노테이션을 붙이면 테이블과 자바 클래스가 매핑이 된다.
*/