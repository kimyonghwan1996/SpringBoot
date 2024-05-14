package user.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "usertable")
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    @Column(name = "name", nullable = false, length = 30)
    private String name;
    @Id
    @Column(name = "id")
    private String id;
    @Column(name = "pwd")
    private String pwd;


}
