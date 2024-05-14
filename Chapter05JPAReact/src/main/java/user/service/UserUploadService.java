package user.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import user.bean.UserUploadDTO;

public interface UserUploadService {

    void upload(List<UserUploadDTO> userImageList);

    Page<UserUploadDTO> getUserList(Pageable pageable);

}
