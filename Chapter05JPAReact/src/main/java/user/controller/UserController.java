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

@CrossOrigin    // 다른 포트에서 넘오는 것을 받을 수 있다.
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
   public void write(@ModelAttribute UserDTO userDTO){
       userService.write(userDTO);
   }

    @GetMapping(path = "isExistId")
    public String isExistId(@RequestParam(value = "id") String id){
        return userService.isExistId(id);
    }

//    @GetMapping(path = "list")
//    public String list(@RequestParam(path = "page", required = false, defaultpath = "0")String page, Model model){
//        System.out.println("page = " + page);
//        model.addAttribute("page", page);
//        return "user/list";
//  }
//
   @GetMapping(path = "getUserList")
   public Page<UserDTO> getUserList(           // Spring Data JPA를 사용하여 페이징 처리
           //page는 0부터 시작, 0이면1페이지, 1이면 2페이지 , 내림차순 정렬
           @PageableDefault(page = 0,size = 3,sort = "name", direction = Sort.Direction.DESC) Pageable pageable){
       return userService.getUserList(pageable);
   }
//
   @GetMapping(path = "getUser")
   public Optional<UserDTO> getUser(@RequestParam(value = "id") String id){
       return userService.getUser(id);
   }
//
   @GetMapping(path = "updateForm")
   public String updateForm(@RequestParam(value = "id") String id,
                            @RequestParam(value = "page") String pg, Model model){
       model.addAttribute("id",id);
       model.addAttribute("page", pg);
       return "user/updateForm";
   }
//
//
   @PutMapping(path = "update")
   @ResponseBody
   public void update(@ModelAttribute UserDTO userDTO){
       userService.update(userDTO);
   }
//
   @DeleteMapping(path = "delete")
   public void delete(@RequestParam(value = "id") String id){
       userService.delete(id);
   }
//
   @GetMapping(path = "getUserSearchList")
   public Page<UserDTO> getUserSearchList(@RequestParam(value = "columnName") String columnName,
                                          @RequestParam(value = "value") String value,
                                          @PageableDefault(page = 0,size = 3,sort = "name", direction = Sort.Direction.DESC) Pageable pageable){

       return userService.getUserSearchList(columnName,value,pageable);
   }

}
