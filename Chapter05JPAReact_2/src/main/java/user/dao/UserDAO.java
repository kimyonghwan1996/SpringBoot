package user.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import user.bean.UserDTO;
import java.util.List;

@Repository
public interface UserDAO extends JpaRepository<UserDTO, String> {

    // 쿼리 메소드
    List<UserDTO> findByNameContaining(String value);

    List<UserDTO> findByIdContaining(String value);

    @Query("select dto from UserDTO dto where dto.name like concat('%', ?1, '%') ")     // UserDTO에서 dto를 가져와라, ?1 => 첫번째 파라미터
    public Page<UserDTO> getUserSearchName(String value, Pageable pageable);

    @Query("select dto from UserDTO dto where dto.id like %:value%")                // :첫번째파라미터이름 == ?1
    public Page<UserDTO> getUserSearchId(String value, Pageable pageable);


}
/*
 * List를 반환하는 메소드의 경우 null이 아닌 빈 List를 반환하는 것이 일반적입니다.
 * 따라서 Optional을 사용하는 것은 단일 객체를 반환하는 쿼리 메소드에 더 적합합니다.
 * */