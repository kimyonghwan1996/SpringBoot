package user.service;

import java.util.Map;

import user.bean.UserDTO;

public interface UserSErvice {
    public void write(UserDTO userDTO);

    public String isExistId(String id);

    public Map<String, Object> getUserList(String pg);

    public UserDTO getUser(String id);

    public void update(UserDTO userDTO);

    public void delete(String id);
}
