package com.example.chapter03;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardDAO extends JpaRepository<BoardDTO, Long> {//CrudRepository 같은 거, <엔티티, PrimaryKey의 자료형>

    List<BoardDTO> findAllByOrderBySeqDesc();
}