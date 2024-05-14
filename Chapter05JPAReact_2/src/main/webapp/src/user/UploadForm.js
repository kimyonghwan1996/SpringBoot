import React, { useRef, useState } from 'react';
import cameraImg from '../image/camera.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const UploadForm = () => {
    const imgRef = useRef()
        const[userUploadDTO, setUserUploadDTO] = useState({
           imageName: '',    
           imageContent: '', 
           imageFileName: '', 
           imageOriginalName: '', 
        })
        const{imageName, imageContent, imageFileName, imageOriginalName}=userUploadDTO
        const navigate = useNavigate()
        const [imgList, setImgList] = useState([])
        const [files, setFiles] = useState('')
        const onInput=(e)=>{
            const {name, value}=e.target

            setUserUploadDTO({
                ...userUploadDTO,
                [name]:value
            })
        }

        const onCamera=()=>{
            imgRef.current.click()
        }
        const onImgInput=(e)=>{
                const files = Array.from(e.target.files)
                var imgArray = []

                files.map((item, index) => {
                    const objectURL = URL.createObjectURL(item)
                    imgArray.push(objectURL)
                })

                setImgList(imgArray) //카메라를 누르면 이미지 미리보기 하려고
                setFiles(e.target.files)//formData에 넣어서 서버로 보내려고 
        }
        const onUploadSubmit=(e)=>{
            e.preventDefault()

            var formData = new FormData()
            formData.append('userUploadDTO', new Blob([JSON.stringify(userUploadDTO)], {type:'application/json'}))

            // Object.values(files.map((item, index)=>{
            //     formData.append('img', item)
            // }))

            for(var i=0; i<files.length; i++){
                formData.append('img', files[i])
            }
            axios.post('http://localhost:8080/user/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res=>{
                alert('이미지 업로드 완료')
                navigate('/user/UploadList')

        })
            .catch(error=> console.log(error))
        }
        const onReset=(e)=>{
            e.preventDefault()

            setUserUploadDTO({
                imageName:'',
                imageContent:'',
                imageFileName:'',
                imageOriginalName:'',
            })
            setImgList([])
            imgRef.current.value=''
        }
    return (
        <div>
            <a href="/">
                <img src="/logo512.png" height="50px" alt="자연"/>
            </a>

            <form>
                <table border='1'>
                    <thead> </thead>
                    <tbody>
                         <tr>
                            <th>상품명</th>
                            <td>
                                <input type='text' name='imageName' value={imageName} size='35' onChange={onInput}/>
                               
                            </td>
                        </tr>
                        <tr>
                            <td colSpan='2' align='center'>
                                <textarea name='imageContent' rows='10' cols='60'
                                value={imageContent} onChange={onInput}></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan='2'>
                                <span>
                                    {
                                        imgList.map((item, index)=><img key={index}
                                                                        src={item}
                                                                        style={{width:'100px', height:'100px'}}/>)
                                    }
                                </span>
                                <img src={cameraImg} onClick={onCamera} style={{width:70, height:70}} alt='카메라'/>
                                
                                <input type='file' 
                                name="img[]" 
                                ref={imgRef} 
                                multiple='multiple' 
                                onChange={onImgInput}
                                style={{visibility: 'hidden'}}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan='2' align='center'> 
                                    <button onClick={onUploadSubmit}>이미지 업로드</button>&nbsp;
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