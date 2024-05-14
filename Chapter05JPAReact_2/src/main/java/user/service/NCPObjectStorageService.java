package user.service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import spring.conf.NaverConfiguration;

import java.io.InputStream;
import java.util.List;
import java.util.UUID;

@Service
public class NCPObjectStorageService implements ObjectStorageService{
    final AmazonS3 s3;



    public NCPObjectStorageService(NaverConfiguration naverConfiguration) {
        s3 = AmazonS3ClientBuilder
                .standard()
                .withEndpointConfiguration(
                        new AwsClientBuilder
                                .EndpointConfiguration(naverConfiguration.getEndPoint(),
                                naverConfiguration.getRegionName())
                )
                .withCredentials(new AWSStaticCredentialsProvider(
                                new BasicAWSCredentials(naverConfiguration.getAccessKey(),
                                        naverConfiguration.getSecretKey())
                        )
                )
                .build();
    }
    @Override
    public String uploadFile(String bucketName, String directoryPath, MultipartFile img) {
        if(img.isEmpty()) return null;

        try(InputStream fileIn = img.getInputStream()) {
            //String imageOriginalFileName = img.getOriginalFilename();
            String fileName = UUID.randomUUID().toString();

            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(img.getContentType());

            PutObjectRequest putObjectRequest =
                    new PutObjectRequest(bucketName,
                            directoryPath + fileName,
                            fileIn,
                            objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead);
            s3.putObject(putObjectRequest);
            return fileName;
        }catch(Exception e) {
            throw new RuntimeException("파일 업로드 에러" + e);
            //e.pringStackTrace(); //이것은 return 타입이 String이기 때문에 에러 발생
        }
    }

    @Override
    public void deleteFile(String bucketName, String string, String imageFileName) {

    }

    @Override
    public void deleteFile(String bucketName, String directoryPath, List<String> list) {
        for(String imageFileName : list)
            s3.deleteObject(bucketName, directoryPath+imageFileName);

    }
}
