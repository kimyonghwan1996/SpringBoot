import React, { useEffect, useState } from 'react';
import styles from '../css/List.module.css';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
const List = () => {
    const {page} = useParams()
    console.log('page = ' + page)
    const [list, setList] = useState([])
    const [pagingHTML, setPagingHTML] = useState([])
    const [columnName, setColumnName] = useState('name')
    const [value, setValue] = useState('')
    const [searchList, setSearchList] = useState(false)
    const navigate = useNavigate()
   
     
    useEffect(()=>{
        value ==='' ?
        axios.get(`http://localhost:8080/user/getUserList?page=${page}`)
        .then(res => {
            setList(res.data.content)
            
            setPagingHTML(Array.from({length: res.data.totalPages},(_,index)=>index+1))
            //Array.from()은 문자열 등 유사 배열(Array-like) 객체나 이터러블한 
            //객체를 배열로 만들어주는 메서드이다.
            
            console.log(res.data)
            //res.data를 출력해보면 데이터가 content라는 이름에 들어있는 것을 확인 할 수 있다.
            // => 스프링 부트에서 Page<> 로 리턴했기 때문이다
        })
        .catch(error => console.log(error))
        :
        axios.get(`http://localhost:8080/user/getUserSearchList?page=${page}`, {
            params: {
                columnName: columnName,
                value: value
            }
        }) 
        .then(res => {
            setList(res.data.content)
            setPagingHTML(Array.from({length: res.data.totalPages},(_,index)=>index+1))
        // navigate(`/user/list/${value}`)
        })
        .catch(error => console.log(error))
    },[page])
    
    const onSearchListBtn=()=>{
          setSearchList(!searchList)
          navigate(`/user/list/0`)
}
    return (
        <div>
            <h3>
            <a href="/">
                    <img src="/logo512.png" height="50px" alt="자연"/>
                </a>
            </h3>
            <table border='1' frame='hsides' role='rows'>
                <tr>
                    <th>이름</th>
                    <th>아이디</th>
                    <th>비밀번호</th>
                </tr>
                <tbody>
                    {
                    list.map(item => {
                        return(
                            <tr key={item.id}>
                                <td align='center'>{item.name}</td>
                                <td align='center'>
                                    <Link className={styles.idA} 
                                          to={`/user/updateForm/${item.id}`}>
                                        {item.id}
                                    </Link>
                                    </td>
                                <td align='center'>{item.pwd}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            {/*페이징 처리 */}
            <p style={{width: '650px', textAlign: 'center'}}>
                {
                    pagingHTML.map(item=> <span key={item}>
                        <Link id={(item-1) === parseInt(page)?styles.currentPaging:styles.paging}
                        to={`/user/list/${item-1}`}>
                        {item}</Link>
                    </span>)
                }

            </p>
            <div style={{width: '650px', textAlign:'center', marginTop: '50px'}}>
                <form id="searchListForm">
                <select name="columnName" onChange={ (e) => setColumnName(e.target.value)}
                style={{width:100, margin:5}}>
                    <option value="name">이름</option>
                    <option value="id">아이디</option>
                </select>
                <input type="text" name='value' value={value}  onChange={(e)=>setValue(e.target.value)}/>
                <input type="button" value="검색" onClick={onSearchListBtn}/>
                </form>
            </div>
        </div>
    );
};

export default List;