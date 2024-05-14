<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <style>
        body{
            text-align: center;
        }
        /* 실제 컨텐츠를 포함하는 컨테이너 요소 */
        .container {
            display: inline-block;
            vertical-align: middle;
            text-align: left; /* 컨텐츠의 가로 정렬을 왼쪽으로 */
        }
        th, td{
            padding: 5px;
        }
        div{
            color: red;
            font-size: small;
        }
    </style>
</head>
<body class="container">
<form id="writeForm">
    <a href="/"><img src="/image/규영.jpg" height="50px" alt="자연"><img src="/image/자연3.jpg" width="80px" alt="자연"></a>
    <table border="1">
        <tr>
            <th>이름</th>
            <td>
                <input type="text" name="name" id="name">
                <div id="nameDiv"></div>
            </td>
        </tr>
        <tr>
            <th>아이디</th>
            <td>
                <input type="text" name="id" id="id">
                <div id="idDiv"></div>
            </td>
        </tr>
        <tr>
            <th>비밀번호</th>
            <td>
                <input type="text" name="pwd" id="pwd">
                <div id="pwdDiv"></div>
            </td>
        </tr>
        <tr>
            <td colspan="2" align="center">
                <input type="button" id="writeBtn" value="입력하기">
            </td>
        </tr>
    </table>
</form>
<script src="https://code.jQuery.com/jquery-3.7.1.min.js"></script>
<script src="../js/write.js"></script>
</body>

</html>
