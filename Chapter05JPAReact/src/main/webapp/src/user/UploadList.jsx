import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from '../css/List.module.css';

const UploadList = () => {
    const {page} = useParams()
  
    const [ data, setData ] = useState([])
    const [pagingHTML,setPagingHTML] = useState([])
    
    const [columnName,setColumnName] = useState('name')
    const [value,setValue] = useState('')
    const [searchList,setSearchList] = useState(false)
    
    const navigate = useNavigate()

    useEffect(() => {
    axios.get(`http://localhost:8080/user/getImageList?page=${page}`)
        .then(res => {
            setData(res.data.content)

            setPagingHTML(Array.from({length:res.data.totalPages}, (_,index) => index + 1))

            console.log(res.data)
        })
        .catch(error => console.log(error))
    },[page])

    return (
        <div>
      <Link to="/">
        <img src="/image/규영.jpg" height="53px" alt="자연" />
      </Link>
      <table border="1" frame="hsides" role="rows" id="imageListTable">
        <thead> {/* <thead> 요소 추가 */}
          <tr>
            <th>순번</th>
            <th>이미지</th>
            <th>파일명</th>
          </tr>
        </thead>
        <tbody> {/* <tbody> 요소 추가 */}
          {data.map((item) => (
            <tr key={item.seq}>
              <td>{item.seq}</td>
              <td></td>
              <td>{item.imageName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 페이징 */}
      <p style={{width:'650px', textAlign:'center'}}>
        {
          pagingHTML.map(item => <span key={item}>
                                    {/* page는 useparams()으로 받은 객체 라서 parsInt()사용 */}
                                    <Link id={item === (parseInt(page) + 1) ? styles.currentPaging : styles.paging}
                                          to={`/user/imageList/${item-1}`}>{item}
                                 </Link></span>)
        }
      </p>
    </div>
    );
};

export default UploadList;