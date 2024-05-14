import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UploadForm = () => {
    const [userUploadDTO, setUserUploadDTO] = useState({
        imageName:'',
        imageContent:'',
        imageFileName:'',
        imageOriginalName:''
    })
    const {imageName, imageContent, imageFileName, imageOriginalName} = userUploadDTO

    const [imgList, setImgList] = useState([])
    const [files, setFiles] = useState('')
    
    const imgRef = useRef()
    const navigate = useNavigate();

    const onInput = (e) =>{
        const {name, value} = e.target

        setUserUploadDTO({
            ...userUploadDTO,
            [name]: value
        })
    }

    const onCamera = () =>{
        imgRef.current.click()
    }

    const onImgInput = (e) =>{
        const files = Array.from(e.target.files)
        console.log(files)
        var imgArray = []

        files.map((item, index) => {
            const objectURL = URL.createObjectURL(item)
            imgArray.push(objectURL)
        })

        setImgList(imgArray)
        setFiles(e.target.files)
    }

    const onUploadSubmit = (e) =>{
        e.preventDefault()

        var formData = new FormData()
        formData.append('userUploadDTO', new Blob([JSON.stringify(userUploadDTO)], {type:'application/json'}))

        // Object.values(files).map((item,index) =>{
        //     formData.append('img', item)
        // })

        for(var i=0; i<files.length; i++){
            formData.append('img', files[i])
        }

        axios.post('http://localhost:8080/user/upload', formData, {header:{
            'Content-Type': 'multipart.form-data'
        }})
             .then(res =>{
                alert('이미지 업로드 완료')
                navigate(-1);
             })
             .catch(error => console.log(error))
    }

    const onReset = (e) => {
        e.preventDefault()

        setUserUploadDTO({
            imageName:'',
            imageContent:'',
            imageFileName:'',
            imageOriginalName:''
        })

        setImgList([])
        imgRef.current.value = ''
    }

    return (
        <div>
            <Link to="/"><img src="/image/규영.jpg" height="50px" alt="자연" /></Link>
            <form>
                <table border='1'>
                    <thead>
                        
                    </thead>
                    <tbody>
                        <tr>
                            <th size='20'>상품명</th>
                            <td>
                                <input type='text' name='imageName' value={imageName} size='35' onChange={onInput} />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan='2' align='center'>
                                <textarea name='imageContent' rows='10' cols='60' value={imageContent} onChange={onInput}></textarea>
                            </td>
                        </tr>

                        <tr>
                            <td colSpan='2'>
                                <span>
                                    {
                                        imgList.map((item, index) =><img key={index} src={item} style={{width:'100px', height:'100px'}}/>)
                                    }
                                </span>
                                <img src="/image/자연3.jpg" onClick={onCamera } width="80px" alt="자연" style={{cursor:'pointer'}}/>
                                <input type='file' name='img[]' ref={imgRef} multiple='multiple' onChange={onImgInput} style={{visibility : 'hidden'}} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan='2' align='center'>
                                <button onClick={onUploadSubmit}>이미지 업로드</button> &nbsp;
                                <button onClick={onReset}>취소</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default UploadForm;
/*
formData.append() 사용하여 FormData에 데이터를 추가하는데,
new Blob([JSON.stringify(userUploadDTO)], { type: 'application/json' }) 부분은 
JSON 데이터를 Blob 객체로 변환하여 FormData에 추가하는 것을 나타낸다.
JSON.stringify(userUploadDTO)는 JavaScript 객체인 userUploadDTO를 JSON 문자열로 변환한다. 
이렇게 하면 객체의 속성과 값을 JSON 형식으로 표현할 수 있다.
formData.append() 사용하여 FormData에 데이터를 추가하는데,
new Blob([JSON.stringify(userUploadDTO)], { type: 'application/json' }) 부분은 
JSON 데이터를 Blob 객체로 변환하여 FormData에 추가하는 것을 나타낸다.

JSON.stringify(userUploadDTO)는 JavaScript 객체인 userUploadDTO를 JSON 문자열로 변환한다. 
이렇게 하면 객체의 속성과 값을 JSON 형식으로 표현할 수 있다.

new Blob([JSON.stringify(userUploadDTO)], { type: 'application/json' })는 JSON 문자열을 포함하는 Blob 객체를 생성한다. 
Blob은 바이너리 데이터를 나타내는 객체로, 파일이나 데이터를 다룰 때 사용된다.
{ type: 'application/json' } 부분은 Blob 객체의 MIME 유형을 지정한다. 
여기서는 JSON 데이터를 나타내는 'application/json' 유형을 사용한다.

formData.append('userUploadDTO', ...)은 FormData에 userUploadDTO라는 이름으로 Blob 객체를 추가한다.
즉, 이 부분은 JSON 형식의 데이터를 FormData에 추가하는 역할을 한다.

이렇게 하면 Spring Boot 컨트롤러에서 @RequestPart("userUploadDTO")를 사용하여 FormData에서 JSON 데이터를 추출할 수 있게 된다.
이렇게 변환된 데이터를 다시 객체로 파싱하고 사용할 수 있다.
이러한 접근 방식은 JSON 데이터를 FormData에 포함시켜 파일 업로드와 관련된 데이터와 함께 전송하는 방법 중 하나이다.
*/