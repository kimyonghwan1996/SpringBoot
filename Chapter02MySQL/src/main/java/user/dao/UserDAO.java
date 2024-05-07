package user.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import user.bean.UserDTO;

@Mapper
public interface UserDAO {

    public void write(UserDTO userDTO);

    public UserDTO isExistId(String id);

    public List<UserDTO> getUserList(int startNum);

    public int getTotalA();

    public UserDTO getUserList(String id);

    public void update(UserDTO userDTO);

    public void delete(String id);

}