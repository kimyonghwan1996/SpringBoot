import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UploadList = () => {  
    const [list, setList] = useState([])
    useEffect(()=>{
        
        axios.get(`http://localhost:8080/user/getUploadList`)
        .then(res => {
            setList(res.data)
           
            
            console.log(res.data)
            //res.data를 출력해보면 데이터가 content라는 이름에 들어있는 것을 확인 할 수 있다.
            // => 스프링 부트에서 Page<> 로 리턴했기 때문이다
        })
        .catch(error => console.log(error))
        
    },[])

    return (
        <div>
            <a href="/">
                    <img src="/logo512.png" height="50px" alt="자연"/>
            </a>
            <table id="uploadListTable" border="1" frame="hsides" rule="rows">
	<tr>
		<th width="100">번호</th>
		<th width="200">이미지</th>
		<th width="200">이미지 이름</th>
	</tr>
        <tbody>
            {
                list.map(item => <tr key={item.seq} style={{textAlign: 'center'}}>
                    <td>{item.seq}</td>
                    <td><img src={`https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-80/storage/${item.imageFileName}`} alt={item.imageName}
                    style={{width: '70px', height: '70px'}}/></td>
                    <td>{item.imageName}</td>
                </tr>)
            }
          </tbody>
          <tfoot>

          </tfoot>
       
    </table>
        </div>
    );
};

export default UploadList;

/*GET : 데이터 조회
POST : 데이터 등록 및 전송
PUT : 데이터 수정
DELETE : 데이터 삭제 */