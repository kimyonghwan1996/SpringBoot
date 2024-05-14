<%--
  Created by IntelliJ IDEA.
  User: jungyeon
  Date: 2024-03-22
  Time: 오후 12:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
  <style>
    td, th{
      padding: 5px;
    }
    div{
      color: red;
      font-size: small;
    }
  </style>
</head>
<body>
<form id="updateForm">
  <input type="hidden" id="id" value="${id}">
  <a href="/"><img src="/image/규영.jpg" height="50px" alt="자연"><img src="/image/자연3.jpg" width="80px" alt="자연"></a>
  <table border="1">
    <tr>
      <th width="200px">이름</th>
      <td>
        <input type="text" name="name" id="name">
        <div id="nameDiv"></div>
      </td>
    </tr>
    <tr>
      <th>아이디</th>
      <td>
        <input type="text" name="id" value="${id}" readonly>
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
        <input type="button" id="updateBtn" value="수정하기">
        <input type="button" id="deleteBtn" value="삭제하기">
        <input type="reset" id="resetBtn" value="새로고침">
      </td>
    </tr>
  </table>
</form>
<script src="https://code.jQuery.com/jquery-3.7.1.min.js"></script>
<script src="../js/update.js"></script>
<script src="../js/delete.js"></script>
</body>
</html>
