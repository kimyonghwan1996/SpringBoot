package user.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import user.bean.UserDTO;

import java.util.List;
import java.util.Optional;

public interface UserService {

    void write(UserDTO userDTO);

    String isExistId(String id);

    Page<UserDTO> getUserList(Pageable pageable);

    Optional<UserDTO> getUser(String id);

    void update(UserDTO userDTO);

    void delete(String id);

    Page<UserDTO> getUserSearchList(String columnName, String value, Pageable pageable);
}
