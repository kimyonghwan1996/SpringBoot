package user.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import user.bean.UserUploadDTO;
import user.service.ObjectStorageService;
import user.service.UserUploadService;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path="user")
public class UserUploadController {
    @Autowired
    private ObjectStorageService objectStorageService;

    private String bucketName = "bitcamp-6th-bucket-80";

    @Autowired
    private UserUploadService userUploadService;

    @PostMapping(path="upload")
    public void upload(@RequestPart UserUploadDTO userUploadDTO,
                       @RequestPart("img") List<MultipartFile> list,
                       HttpSession session){
        System.out.println("userUploadDTO=" + userUploadDTO);
        System.out.println("list = " + list);

        //실제폴더
        String filePath = session.getServletContext().getRealPath("/public/storage");
        System.out.println("실제폴더=" + filePath);

        File file;
        String originalFileName;
        String fileName;
        //파일명만 모아서 DB로 보내기
        List<UserUploadDTO> userImageList = new ArrayList<>();

        for(MultipartFile img : list){
            originalFileName = img.getOriginalFilename();
            fileName = objectStorageService.uploadFile(bucketName, "storage/", img);  //UUID
            file = new File(filePath, originalFileName); //파일 생성
            try {
                img.transferTo(file);
            } catch(IOException e){
                e.printStackTrace();
            }
//            try {
//                result += "<span><img src='/mini/storage/" +
//                        URLEncoder.encode(originalFileName, "UTF-8") +  "'/></span>";
//            } catch (UnsupportedEncodingException e) {
//                // TODO Auto-generated catch block
//                e.printStackTrace();
//            }
            UserUploadDTO dto = new UserUploadDTO();
            dto.setImageName(userUploadDTO.getImageName());
            dto.setImageContent(userUploadDTO.getImageContent());
            dto.setImageFileName(fileName);
            dto.setImageOriginalFileName(originalFileName);

            userImageList.add(dto);
        }//for

        //DB
        userUploadService.upload(userImageList);
    }

    @GetMapping(path="getUploadList")
    public List<UserUploadDTO> getUploadList() {
        return userUploadService.getUploadList();
    }
}
