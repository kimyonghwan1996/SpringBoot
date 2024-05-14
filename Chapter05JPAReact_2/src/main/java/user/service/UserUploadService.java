package user.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import user.bean.UserDTO;
import user.bean.UserUploadDTO;

import java.util.List;

public interface UserUploadService {
    public void upload(List<UserUploadDTO> userImageList);

    public List<UserUploadDTO> getUploadList();

}
