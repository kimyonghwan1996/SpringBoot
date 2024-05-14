package spring.conf;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;


import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Configuration
@PropertySource("classpath:spring/naver.properties")
@ConfigurationProperties(prefix="ncp")
@Getter
@Setter
public class NaverConfiguration {
    private String accessKey;
    private String secretKey;
    private String regionName;
    private String endPoint;

    public void setAccessKey(String accessKey) {
        this.accessKey = accessKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    public void setRegionName(String regionName) {
        this.regionName = regionName;
    }

    public void setEndPoint(String endPoint) {
        this.endPoint = endPoint;
    }

    public String getAccessKey() {
        return accessKey;
    }

    public String getSecretKey() {
        return secretKey;
    }

    public String getRegionName() {
        return regionName;
    }

    public String getEndPoint() {
        return endPoint;
    }


}