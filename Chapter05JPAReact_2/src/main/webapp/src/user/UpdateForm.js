import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from'../css/UpdateForm.module.css';

const UpdateForm = () => {

    const nameRef=useRef()
    const {userId } = useParams()
    const nav = useNavigate()
    const [userDTO,setUserDTO]=useState({
        name:'',
        id: userId,
        pwd:''
    })
    const {name,id,pwd}=userDTO

    const [nameDiv, setNameDiv] = useState('')
    const [pwdDiv, setPwdDiv] = useState('')
    const [reset, setReset] = useState(false)

    const onInput=(e)=>{
        const {name, value} = e.target

        setUserDTO({
            ...userDTO,[name] : value
        })
    }
    useEffect(()=>{
        
        axios.get(`http://localhost:8080/user/getUser?id=${userId}`, {
        })
        .then(res => {
             setUserDTO(res.data)
        })
        .catch(error => console.log(error))
    },[reset])


    const onUpdateSubmit=(e)=>{
        e.preventDefault()
        setNameDiv('')
        setPwdDiv('')
        if (!name){
            setNameDiv('이름 입력')
        }else if(pwd===''){
            setPwdDiv('비밀번호 입력')
        }else{
            axios.put('http://localhost:8080/user/update', null,{params:userDTO})
            .then(res => {
                alert('회원수정 완료')
                nav(-1) 
            })
            .catch(error => console.log(error))
        } 
    }
    const onDeleteSubmit=(e)=>{
        e.preventDefault()

        axios.delete(`http://localhost:8080/user/delete?id=${userId}`)
        .then(res =>{
            alert('회원정보 삭제 완료')
            nav('/user/list/0')
        })
        .catch(error => console.log(error))

    }
    const onReset = (e)=>{
        e.preventDefault()
        setReset( !reset)
    }
    return (
        <div>
           
            
            <a href="/">
                    <img src="/logo512.png" height="50px" alt="자연"/>
            </a>
            <form className={styles.UpdateForm}>
	<table border="1">
		<tr>
			<th>이름</th>
			<td>
            <input type="text" name="name" value={name} ref={nameRef} onChange={ onInput}  />
				<div id="nameDiv"></div>
			</td>
		</tr>
		<tr>
			<th>아이디</th>
			<td>
				<input type="text" name="id" id="id" value={id }  readonly/>
               
			</td>
		</tr>
		<tr>
			<th>비밀번호</th>
			<td>
            <input type="text" name="pwd" value={pwd} onChange={onInput}/>
				<div id="pwdDiv"></div>
			</td>
		</tr>
		
		<tr>
			
			<td colspan="2" align="center">
				<input type="button" value="수정" onClick={onUpdateSubmit}/>&nbsp;
                <input type="button" value="목록" onClick={()=> nav(-1)}/>&nbsp;
				<input type="button" value="삭제" onClick={onDeleteSubmit}/>&nbsp;
				<input type="reset" value="취소" onClick={onReset}/>
			</td>
		</tr>
	    </table>
        </form>
    </div>
    );
};

export default UpdateForm;