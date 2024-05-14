package user.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import user.bean.UserDTO;
import user.bean.UserUploadDTO;
import user.dao.UserUploadDAO;

@Service
public class UserUploadServiceImpl implements UserUploadService{
    @Autowired
    private UserUploadDAO userUploadDAO;

    @Override
    public void upload(List<UserUploadDTO> userImageList) {
        userUploadDAO.saveAll(userImageList);
    }

    @Override
    public Page<UserUploadDTO> getUserList(Pageable pageable) {
        // TODO Auto-generated method stub
        Page<UserUploadDTO> list = userUploadDAO.findAll(pageable);
        return list;
    }
}
