package com.example.chapter03;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Table(name="board")
@Getter
@Setter
public class BoardDTO {
    @Id
    @Column(name = "seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "BOARD_SEQ_GENERATOR")
    private int seq;

    @Column(name = "id", nullable = false, length = 30)
    private String id;

    @Column(name = "name", nullable = false, length = 30)
    private String name;
    @Column(name = "subject")
    private String subject;
    @Column(name = "content")
    private String content;
//    @CreationTimestamp //엔티티가 생성되는 시점의 시간 등록 - insert할 때 자동으로 시간등록
    @UpdateTimestamp //update할때 자동으로 시간 등록
    private LocalDateTime logtime = LocalDateTime.now();
//    private Timestamp logtime;
}

//create table board