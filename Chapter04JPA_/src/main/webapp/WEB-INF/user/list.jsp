<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <style>
        body{text-align: center;}
        /* 실제 컨텐츠를 포함하는 컨테이너 요소 */
        .container {
            display: inline-block;
            vertical-align: middle;
            text-align: left; /* 컨텐츠의 가로 정렬을 왼쪽으로 */
        }
        table {border-collapse: collapse;}
        td, th{padding: 5px; width: 250px;}
        #userPagingDiv {
            text-align:center;
            margin-top: 10px;
            padding: 10px;
        }
        span {
            padding: 10px;
            width: 20px;
        }
        #pagingDiv span{text-decoration: none; padding:3px 10px; border-radius: 5px; margin: 0 10px;}
        #currentPaging{background-color : #4CAF50; color:white;}
        #paging:hover{background-color : #ddd; text-decoration:underline; cursor: pointer; }
        span:Link{color: black; text-decoration: none;}
        span:visited{color: black; text-decoration: none;}
        span:hover{color: #4CAF50; text-decoration: underline;}
        span:active{color: black; text-decoration: none;}
    </style>
</head>
<body>
<div class="container">
    <a href="/"><img src="/image/규영.jpg" height="53px" alt="자연"><img src="/image/자연3.jpg" width="80px" alt="자연"></a>
    <input type="text" id="page" value="${page}"/>

    <table border="1" frame="hsides" role="rows" id="userListTable">
        <tr>
            <th >이름</th>
            <th>아이디</th>
            <th>비밀번호</th>
        </tr>
        <%-- 동적 처리 --%>
    </table>
    <%-- 페이징 처리 --%>
    <div id="userPagingDiv"></div>

    <%-- 검색 기능 --%>
    <div style="width:700px; text-align: center; margin-top: 20px;">
        <form id="searchListForm">
            <select id="columnName" style="width: 100px;">
                <option value="name">이름</option>
                <option value="id">아이디</option>
            </select>
            <input type="text" id="value">
            <input type="button" id="searchListBtn" value="검색">
            <input type="button" onclick="location.reload()" value="목록">
        </form>
    </div>


<script src="https://code.jQuery.com/jquery-3.7.1.min.js"></script>
<script src="/js/list.js"></script>
<script src="/js/searchList.js"></script>
<script>
    function userPaging(page){
        location.href= '/user/list?page=' + page;
    }
</script>
</body>
</html>
