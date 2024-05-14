import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../css/WriteForm.module.css";
import axios from "axios";

const UpdateForm = () => {
    const nameRef = useRef();

    const {userId}= useParams()

    const [userDTO, setUserDTO] = useState({
        name: "",
        pwd: "",
        id: userId,
    });

    const { name, id, pwd } = userDTO;

    const [nameCheck, setNameCheck] = useState("");
    const [pwdCheck, setPwdCheck] = useState("");

    const [reset, setReset] = useState(false);

    const navigate = useNavigate();

    const onUpdateSubmit = (e) => {
        e.preventDefault();

        setNameCheck("");
        setPwdCheck("");
        if (name === "") {
          setNameCheck("이름을 입력해주세요");
        } else if (pwd === "") {
          setPwdCheck("비밀번호를 입력해주세요");
        } else{
                axios.put("http://localhost:8080/user/update", null, { params: userDTO})
                     .then((res) => {
                         alert("회원수정 완료");
                         navigate(-1);
                     })
                     .catch((error) => console.log(error));
        }
    };

    const onInput = (e) => {
        const { value, name } = e.target;
        setUserDTO({ ...userDTO, [name]: value });
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/user/getUser?id=${userId}`)
             .then((res) => setUserDTO(res.data))
             .catch((error) => console.log(error));
    }, [reset])

    const onDeleteSubmit = (e) =>{
        e.preventDefault();

        axios.delete(`http://localhost:8080/user/delete?id=${id}`)
             .then((res) => {
                alert("삭제되었습니다.")
                navigate("/user/list/0");
            })
             .catch(error => console.log(error))
    }

    const onReset = (e) => {
        e.preventDefault();

        setReset(!reset);

        setNameCheck("");
        setPwdCheck("");
    };

    return (
        <div className={styles.container}>
          <form id="updateForm">
            <Link to="/">
              <img src="/image/규영.jpg" height="50px" alt="자연" />
              <img src="/image/자연3.jpg" width="80px" alt="자연" />
            </Link>
            <table border="1" height={100}>
              <tr>
                <th>이름</th>
                <td>
                  <input
                    type="text"
                    value={name}
                    name="name"
                    id="name"
                    onChange={onInput}
                  />
                  <div className={styles.check} id="nameDiv">
                    {nameCheck}
                  </div>
                </td>
              </tr>
              <tr>
                <th>아이디</th>
                <td>
                  <input
                    type="text"
                    name="id"
                    id="id"
                    value={id}
                  />
                  <div
                    style={{ color: "blue" }}
                    id="idDiv"
                  ></div>
                </td>
              </tr>
              <tr>
                <th>비밀번호</th>
                <td>
                  <input type="text" name="pwd" id="pwd" value={pwd} onChange={onInput} />
                  <div className={styles.check} id="pwdDiv">
                    {pwdCheck}
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2" align="center">
                  <input type="button" onClick={() => navigate(-1)} value="목록" /> &nbsp;
                  <input type="button" onClick={onUpdateSubmit} value="입력하기" /> &nbsp;
                  <input type="button" onClick={onDeleteSubmit} value="삭제" /> &nbsp;
                  <input type="button" onClick={onReset} value="초기화" />
                </td>
              </tr>
            </table>
          </form>
        </div>
      );
};

export default UpdateForm;