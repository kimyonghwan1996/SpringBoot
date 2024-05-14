package user.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "userimage")
@Getter
@Setter
public class UserUploadDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //my sql의 auto-increament를 사용하여 자동 시퀀스 적용
    @Column(name = "seq")
    private int seq;

    @Column(name = "imageName", length = 50)
    private String imageName;

    @Column(name = "imageContent", length = 4000)
    private String imageContent;

    @Column(name = "imageFileName", nullable = false, length = 100)
    private String imageFileName; //UUID 이름

    @Column(name = "imageOriginalFileName",nullable = false, length = 100)
    private String imageOriginalFileName;  //이미지 원래 이름
}