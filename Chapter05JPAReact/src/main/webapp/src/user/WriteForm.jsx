import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../css/UpdateForm.module.css";
import axios from "axios";

const WriteForm = () => {
  const nameRef = useRef();
  const [userDTO, setUserDTO] = useState({
    name: "",
    pwd: "",
    id: "",
  });
  const { name, id, pwd } = userDTO;

  const [nameCheck, setNameCheck] = useState("");
  const [idCheck, setIdCheck] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");

  const navigate = useNavigate();

  const onInput = (e) => {
    const { value, name } = e.target;
    setUserDTO({ ...userDTO, [name]: value });
  };

  const onWriteSubmit = (e) => {
    e.preventDefault();

    setIdCheck("");
    setNameCheck("");
    setPwdCheck("");
    if (name === "") {
      setNameCheck("이름을 입력해주세요");
    } else if (id === "") {
      setIdCheck("아이디를 입력해주세요");
    } else if (pwd === "") {
      setPwdCheck("비밀번호를 입력해주세요");
    } else if (idCheck === "사용 가능") {
      axios
        .post("http://localhost:8080/user/write", null, { params: userDTO})
        .then((res) => {
          alert("회원가입 완료");
          navigate("/user/list/0");
        })
        .catch((error) => console.log(error));
    }
  };

  //아이디 중복체크
  const onIsExistId = () => {
    axios
      .get(`http://localhost:8080/user/isExistId?id=${id}`)
      .then((res) => {
        setIdCheck(res.data === "exist" ? "사용 불가능" : "사용 가능");
      })
      .catch((error) => console.log(error));
  };

  const onReset = (e) => {
    e.preventDefault();
    setUserDTO({
      name: "",
      id: "",
      pwd: "",
    });
    setIdCheck("");
    setNameCheck("");
    setPwdCheck("");
    nameRef.current.focus();
  };

  return (
    <div className={styles.table}>
      <form id="writeForm">
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
                ref={nameRef}
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
                onBlur={onIsExistId}
                onChange={onInput}
              />
              <div
                style={{ color: idCheck === "사용 가능" ? "blue" : "red" }}
                id="idDiv"
              >
                {idCheck}
              </div>
            </td>
          </tr>
          <tr>
            <th>비밀번호</th>
            <td>
              <input type="text" name="pwd" id="pwd" onChange={onInput} />
              <div className={styles.check} id="pwdDiv">
                {pwdCheck}
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2" align="center">
              <input type="button" onClick={onWriteSubmit} value="입력하기" />
              <input type="button" onClick={onReset} value="초기화" />
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default WriteForm;
