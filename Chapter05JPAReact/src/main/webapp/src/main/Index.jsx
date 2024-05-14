import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
    return (
      <div>
        <h3>*** 메인 화면 ***</h3>
        <hr />
        <h4>
          <p>
            <Link to={"/user/writeForm"}>등록</Link>
          </p>
          <p>
            <Link to={"/user/list/0"}>출력</Link>
          </p>
          <br/><br/>
          <p>
            <Link to={"/user/uploadForm"}>이미지 업로드</Link>
          </p>
          <p>
            <Link to={"/user/uploadList"}>이미지 목록</Link>
          </p>
        </h4>
      </div>
    );
};

export default Index;