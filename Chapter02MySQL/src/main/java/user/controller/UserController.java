package user.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import user.bean.UserDTO;
import user.service.UserSErvice;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;



@Controller
@RequestMapping("user")
public class UserController {
    @Autowired
    private UserSErvice userService;

    @GetMapping("writeForm")
    public String writeForm() {
        return "user/writeForm";
    }

    @PostMapping("write")
    @ResponseBody
    public void write(@ModelAttribute UserDTO userDTO) {
        
        userService.write(userDTO);
    }
    
    @PostMapping(value="isExistId")
	@ResponseBody
	public String isExistId(@RequestParam("id") String id) { //whrit.js에 있는 id를 가져옴
		return userService.isExistId(id);
	}
    
    @GetMapping("list")
    public String list(@RequestParam(value = "pg", required =false, defaultValue = "1") String pg,
                                     Model model) {
        model.addAttribute("pg", pg);

        return "user/list";
    }

    @PostMapping(value="getUserList")
	@ResponseBody
	public Map<String, Object> list(@RequestParam("pg") String pg) {
		return userService.getUserList(pg);
	}

    @GetMapping(value="updateForm")
    public String updateForm(@RequestParam("id") String id,
                            @RequestParam("pg") String pg,
                            Model model){
        model.addAttribute("id", id);
        model.addAttribute("pg", pg);
        return "/user/updateForm";
    }

    @PostMapping(value="getUser")
    @ResponseBody
    public UserDTO getUser(@RequestParam("id") String id){
        return userService.getUser(id);
    }

    @PostMapping(value="update")
    @ResponseBody
    public void update(@ModelAttribute UserDTO userDTO) {
        userService.update(userDTO);
    }

    @PostMapping(value="delete")
    @ResponseBody
    public void delete(@RequestParam("id") String id) {
        userService.delete(id);
    }
}
