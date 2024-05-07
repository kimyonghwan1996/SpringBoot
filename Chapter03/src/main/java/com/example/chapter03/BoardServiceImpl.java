package com.example.chapter03;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardServiceImpl implements BoardService{
    @Autowired
    private BoardDAO boardDAO;
    @Override
    public void write() {
        BoardDTO boardDTO = new BoardDTO();
        boardDTO.setId("kkk1234");
        boardDTO.setName("KYH");
        boardDTO.setSubject("ㅎㅇ");
        boardDTO.setContent("ㅎㅇ");

        //DB
        boardDAO.save(boardDTO); //data가 있으면 update, 없으면 insert
    }

    @Override
    public List<BoardDTO> list() {
        //return boardDAO.findAll(); // == select * from board
        return boardDAO.findAllByOrderBySeqDesc();
    }
}
