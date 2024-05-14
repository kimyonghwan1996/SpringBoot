package user.bean;



import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="userimage")
@Getter
@Setter
public class UserUploadDTO {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY) //MySQL의 AUTO_INCREMENT를 사용하여
    //자동으로 시퀀스 적용
    @Column(name="seq")
    private int seq;

    @Column(name="imageName", length = 50)
    private String imageName;

    @Column(name="imageContent", length = 4000)
    private String imageContent;

    @Column(name="imageFileName", nullable = false, length = 100)
    private String imageFileName;

    @Column(name="imageOriginalFileName", nullable = false, length = 100)
    private String imageOriginalFileName;



    public int getSeq() {
        return seq;
    }

    public String getImageName() {
        return imageName;
    }

    public String getImageContent() {
        return imageContent;
    }

    public String getImageFileName() {
        return imageFileName;
    }

    public String getImageOriginalFileName() {
        return imageOriginalFileName;
    }


    public void setSeq(int seq) {
        this.seq = seq;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public void setImageContent(String imageContent) {
        this.imageContent = imageContent;
    }

    public void setImageFileName(String imageFileName) {
        this.imageFileName = imageFileName;
    }

    public void setImageOriginalFileName(String imageOriginalFileName) {
        this.imageOriginalFileName = imageOriginalFileName;
    }
}
