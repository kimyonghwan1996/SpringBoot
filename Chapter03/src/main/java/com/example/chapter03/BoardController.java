package com.example.chapter03;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BoardController {
    @Autowired
    private BoardService boardService;

    @GetMapping("/board/write")
    public String write() {
        boardService.write();
        return "등록 완료";
    }

    @GetMapping("/board/list")
    public List<BoardDTO> list(){
        return boardService.list();
    }
}
