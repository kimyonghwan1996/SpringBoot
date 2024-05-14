package user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import user.bean.UserDTO;
import user.service.UserService;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(path = "user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping(path = "writeForm")
    public String writeFrom(){
        return "user/writeForm";
    }

    @PostMapping(path = "write")
    @ResponseBody
    public void write(@ModelAttribute UserDTO userDTO){
        userService.write(userDTO);
    }

    //axios.get() 로 요청했기 때문에 GetMapping 으로 바꿈 그리고 ResponseBody 없앰 그리고 value가 아니고 path 임
    @GetMapping(path = "isExistId")
    public String isExistId(@RequestParam String id){
//        System.out.println("hi ? ");
        return userService.isExistId(id);
    }

//
//    @GetMapping(value = "list")
//    public String list(@RequestParam(value = "page", required = false, defaultValue = "0")String page, Model model){
//        System.out.println("page = " + page);
//        model.addAttribute("page", page);
//        return "user/list";
//    }
//

    //axios get요청
    @GetMapping(path = "getUserList")
    public Page<UserDTO> getUserList(@RequestParam(value = "page", required = false, defaultValue = "0")String page,
            // Spring Data JPA를 사용하여 페이징 처리
            //page는 0부터 시작, 0이면1페이지, 1이면 2페이지 , 내림차순 정렬
            @PageableDefault(page = 0,size = 3,sort = "name", direction = Sort.Direction.DESC) Pageable pageable){
        return userService.getUserList(pageable);
    }
//
    @GetMapping(path = "getUser")

    public Optional<UserDTO> getUser(@RequestParam(value = "id") String id){
        return userService.getUser(id);
    }

    @GetMapping(path = "updateForm")
    public String updateForm(@RequestParam(value = "id") String id,
                             @RequestParam(value = "page") String pg,
                            Model model){
        model.addAttribute("id",id);
        model.addAttribute("page", pg);
        return "user/updateForm";
    }
//
//
    @PutMapping(value = "update")
    @ResponseBody
    public void update(@ModelAttribute UserDTO userDTO){
        userService.update(userDTO);
    }
//
    @DeleteMapping(value = "delete")
    public void delete(@RequestParam String id){
        userService.delete(id);
    }

    @GetMapping(path = "getUserSearchList")
    public Page<UserDTO> getUserSearchList(
            @RequestParam(value = "columnName") String columnName,
            @RequestParam(value = "value") String value,
            @PageableDefault(page = 0,size = 3,sort = "name", direction = Sort.Direction.DESC) Pageable pageable){
        return userService.getUserSearchList(columnName,value, pageable);
    }

}