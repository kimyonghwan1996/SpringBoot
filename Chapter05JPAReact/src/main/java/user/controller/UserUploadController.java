package user.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;
import user.bean.UserUploadDTO;
import user.service.UserUploadService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;




@CrossOrigin
@RestController
@RequestMapping(path = "user")
public class UserUploadController {
    @Autowired
    private UserUploadService userUploadService;

    @PostMapping(path = "upload")
    public void upload(@RequestPart("userUploadDTO") UserUploadDTO userUploadDTO,
                       @RequestPart("img") List<MultipartFile> list,
                       HttpSession session){
        System.out.println("userUploadDTO " + userUploadDTO);
        System.out.println("list " + list);

        //실제폴더
        String filePath = session.getServletContext().getRealPath("/public/storage");
        System.out.println("실제 폴더 "+ filePath);

        File file;
        String originalFileName;
        String fileName;

        //파일명만 모아서 db보내기
        List<UserUploadDTO> userImageList = new ArrayList<>();

        for(MultipartFile img : list){
            originalFileName = img.getOriginalFilename();

            fileName = "none" ; //UUID
            file = new File(filePath, originalFileName); //파일생성

            try {
                img.transferTo(file);
            } catch (IOException e) {
                e.printStackTrace();
            }

            UserUploadDTO dto = new UserUploadDTO();
            dto.setImageName(userUploadDTO.getImageName());
            dto.setImageContent(userUploadDTO.getImageContent());
            dto.setImageFileName(fileName);
            dto.setImageOriginalFileName(originalFileName);

            userImageList.add(dto);
        }

        //DB
        userUploadService.upload(userImageList);
    }

    @GetMapping("getImageList")
    public Page<UserUploadDTO> getImageList(
        @PageableDefault(page = 0,size = 3,sort = "seq", direction = Sort.Direction.DESC) Pageable pageable){
       return userUploadService.getUserList(pageable);
    }
}