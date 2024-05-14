import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from '../css/List.module.css';

const List = () => {
  const {page} = useParams()
  
  const [ data, setData ] = useState([])
  const [pagingHTML,setPagingHTML] = useState([])
  
  const [columnName,setColumnName] = useState('name')
  const [value,setValue] = useState('')
  const [searchList,setSearchList] = useState(false)
  
  const navigate = useNavigate()
  
  const onSearchBtn = () =>{
    setSearchList(!searchList)
    navigate('/user/list/0')
  }

  useEffect(() => {
    value === '' ? 
      axios.get(`http://localhost:8080/user/getUserList?page=${page}`)
          .then(res => {
            setData(res.data.content)

            setPagingHTML(Array.from({length:res.data.totalPages}, (_,index) => index + 1))
            //Array.from()은 문자열 등 유사 배열 (Array-like) 객체나 이터러블한 객체를 배열로 만들어 주는 매서드
            console.log(res.data)
            // res.data를 출력해보면 데이터가 content라는 이름에 들어가잇음
            // => 스프링 부트에서 page<>리턴했기 때문
          })
          .catch(error => console.log(error))
      :
      axios.get(`http://localhost:8080/user/getUserSearchList?page=${page}`,{
        params:{
          columnName: columnName,
          value: value
        }
      })
          .then(res => {
            setData(res.data.content)
            setPagingHTML(Array.from({length:res.data.totalPages}, (_,index) => index + 1))
          })
          .catch(error => console.log(error))
  },[page, searchList])

  // useEffect(() => {
  //   axios.get(`http://localhost:8080/user/getUserList?id=${text}`)
  //       .then(res => {
  //         setData(res.data.content)

  //         setPagingHTML(Array.from({length:res.data.totalPages}, (_,index) => index + 1))
  //         //Array.from()은 문자열 등 유사 배열 (Array-like) 객체나 이터러블한 객체를 배열로 만들어 주는 매서드
  //         console.log(res.data)
  //         // res.data를 출력해보면 데이터가 content라는 이름에 들어가잇음
  //         // => 스프링 부트에서 page<>리턴했기 때문
  //       })
  //       .catch(error => console.log(error))
  //     },[page])
  

  console.log(data)
  return (
    <div>
      <Link to="/">
        <img src="/image/규영.jpg" height="53px" alt="자연" />
        <img src="/image/자연3.jpg" width="80px" alt="자연" />
      </Link>
      <table border="1" frame="hsides" role="rows" id="userListTable">
        <thead> {/* <thead> 요소 추가 */}
          <tr>
            <th>이름</th>
            <th>아이디</th>
            <th>비밀번호</th>
          </tr>
        </thead>
        <tbody> {/* <tbody> 요소 추가 */}
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td><Link className={styles.idA} to={`/user/updateForm/${item.id}`}>{item.id}</Link></td>
              <td>{item.pwd}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{width:'700px', textAlign:'center', marginTop:'50px'}}>
          <form >
              <select name='columnName' onChange={(e) => setColumnName(e.target.value)} style={{width:100, margin:5}}>
                <option value='name'>이름</option>
                <option value='id'>ID</option>
              </select>
              <input type='text' name='value' onChange={(e) => setValue(e.target.value)} placeholder='입력'/>
              <input type='button' value='검색' onClick={onSearchBtn}/>
          </form>
      </div>
      {/* 페이징 */}
      <p style={{width:'650px', textAlign:'center'}}>
        {
          pagingHTML.map(item => <span key={item}>
                                    {/* page는 useparams()으로 받은 객체 라서 parsInt()사용 */}
                                    <Link id={item === (parseInt(page) + 1) ? styles.currentPaging : styles.paging}
                                          to={`/user/list/${item-1}`}>{item}
                                 </Link></span>)
        }
      </p>
    </div>
  );
};

export default List;