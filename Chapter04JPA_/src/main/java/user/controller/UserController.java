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
import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping(value = "user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping(value = "writeForm")
    public String writeFrom(){
        return "user/writeForm";
    }

    @PostMapping(value = "write")
    @ResponseBody
    public void write(@ModelAttribute UserDTO userDTO){
        userService.write(userDTO);
    }

    @PostMapping(value = "isExistId")
    @ResponseBody
    public String isExistId(@RequestParam String id){
        return userService.isExistId(id);
    }


    @GetMapping(value = "list")
    public String list(@RequestParam(value = "page", required = false, defaultValue = "0")String page, Model model){
        System.out.println("page = " + page);
        model.addAttribute("page", page);
        return "user/list";
    }

    @PostMapping(value = "getUserList")
    @ResponseBody
    public Page<UserDTO> getUserList(           // Spring Data JPA를 사용하여 페이징 처리
            //page는 0부터 시작, 0이면1페이지, 1이면 2페이지 , 내림차순 정렬
            @PageableDefault(page = 0,size = 3,sort = "name", direction = Sort.Direction.DESC) Pageable pageable){
        return userService.getUserList(pageable);
    }

    @PostMapping(value = "getUser")
    @ResponseBody
    public Optional<UserDTO> getUser(@RequestParam(value = "id") String id){
        return userService.getUser(id);
    }

    @GetMapping(value = "updateForm")
    public String updateForm(@RequestParam(value = "id") String id,
                             @RequestParam(value = "page") String pg, Model model){
        model.addAttribute("id",id);
        model.addAttribute("page", pg);
        return "user/updateForm";
    }


    @PostMapping(value = "update")
    @ResponseBody
    public void update(@ModelAttribute UserDTO userDTO){
        userService.update(userDTO);
    }

    @PostMapping(value = "delete")
    @ResponseBody
    public void delete(@RequestParam String id){
        userService.delete(id);
    }

    @PostMapping(value = "getUserSearchList")
    @ResponseBody
    public List<UserDTO> getUserSearchList(@RequestParam(value = "columnName") String columnName,
                                           @RequestParam(value = "value") String value){
        return userService.getUserSearchList(columnName,value);
    }

}
