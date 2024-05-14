import React, { useRef, useState } from 'react';
import axios from 'axios';
import '../css/WriteForm.module.css';
import { useNavigate, useParams } from 'react-router-dom';



const WriteForm = () => {
    const {page} = useParams()
    const nameRef=useRef()

    const [userDTO,setUserDTO]=useState({
        name:'',
        id:'',
        pwd:''
    })
    const {name,id,pwd}=userDTO;
    const [idDiv,setIdDiv]=useState('')
    const nav = useNavigate();
    
    const onIsExistId =() =>{
        axios.get(`http://localhost:8080/user/isExistId?id=${id}`)
            .then(res=>{
                setIdDiv(res.data === 'exist' ? '사용 불가능' : '사용 가능')
            })
            .catch(error=>console.log(error))
    }
    const onWrite=()=>{
        document.getElementById('nameDiv').innerText='';
        setIdDiv('')
        document.getElementById('pwdDiv').innerText='';


        if(name===''){
            document.getElementById('nameDiv').innerText='이름을 입력하세요';
            nameRef.current.focus()
        }else if(id===''){
            setIdDiv('아디를 입력하세요');
        }
        else if(pwd===''){
            document.getElementById('pwdDiv').innerText='비번을 입력하세요';
        }else if(idDiv==='사용 가능'){

            //첫번째
            /*
            axios.post('http://localhost:8080/user/write', null,{
                params:{
                    name: name,
                    id: id,
                    pwd: pwd
                }
            })
            .then(res => {
                alert('회원가입축하')
                
            })
            .catch()
            */

            //두번째
            axios.post('http://localhost:8080/user/write', null,{
                params:
                    userDTO
                
            })
            .then(res => {
                alert('회원가입축하')
                nav('/user/list/0')
                
            })
            .catch(error => console.log(error))
            
        }
    }
    return (
        <div>
            <form id="writeForm">
                <a href="/">
                    <img src="/logo512.png" height="50px" alt="자연"/>
                </a>
                <table border="1">
                    <tr>
                        <th>이름</th>
                        <td>
                            <input type="text" name="name" value={name} ref={nameRef} onChange={(e)=>{
                                setUserDTO({...userDTO,name:e.target.value} )
                            }}  />
                            <div id="nameDiv"></div>
                        </td>
                    </tr>
                    <tr>
                        <th>아이디</th>
                        <td>
                            <input type="text" name="id" value={id} onChange={(e)=>{
                                setUserDTO({...userDTO,id:e.target.value})
                            }} onBlur={onIsExistId}/>
                            <div id="idDiv" style={{color: idDiv==='사용 가능' && 'blue'}}>{idDiv}</div>
                        </td>
                    </tr>
                    <tr>
                        <th>비밀번호</th>
                        <td>
                            <input type="text" name="pwd" value={pwd} onChange={(e)=>{
                                setUserDTO({...userDTO,pwd:e.target.value})
                            }}/>
                            <div id="pwdDiv"></div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" align="center">
                            <input type="button" id="writeBtn" value="입력하기" onClick={onWrite}/>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    );
};

export default WriteForm;