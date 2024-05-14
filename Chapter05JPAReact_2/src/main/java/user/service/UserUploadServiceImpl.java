package user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import user.bean.UserDTO;
import user.bean.UserUploadDTO;
import user.dao.UserUploadDAO;

import java.util.List;

@Service
public class UserUploadServiceImpl implements UserUploadService{
    @Autowired
    private UserUploadDAO userUploadDAO;
    @Override
    public void upload(List<UserUploadDTO> userImageList) {
        userUploadDAO.saveAll(userImageList);
    }

    @Override
    public List<UserUploadDTO> getUploadList() {
//        return userUploadDAO.findAll() ;
        return userUploadDAO.findAllByOrderBySeqDesc(); //쿼리메소드 - seq로 내림차순
    }

}
