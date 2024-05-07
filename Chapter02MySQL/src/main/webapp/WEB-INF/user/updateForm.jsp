<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style type="text/css">
table{
	border-collapse : collapes;
}
th, td{
	padding:5px;
	width: 200px;
}
</style>
</head>
<body>
<a href="/"><img src="/image/magie1.jpg" alt="" width="50" height="50"/></a>

<form id="updateForm">
	<input type="hidden" id="id" value="${id }">
	<input type="hidden" id="pg" value="${pg }">

	<table border="1">
		<tr>
			<th>이름</th>
			<td>
				<input type="text" name="name" id="name" >
				<div id="nameDiv"></div>
			</td>
		</tr>
		
		<tr>
			<th>아이디</th>
			<td>
				<input type="text" name="id"  value="${id }" readonly>
				
			</td>
		</tr>
		
		<tr>
			<th>비밀번호</th>
			<td>
				<input type="password" name="pwd" id="pwd">
				<div id="pwdDiv"></div>
			</td>
		</tr>
		
		<tr>
			<td colspan="2" align="center">
				<input type="button" value="수정" id="updateBtn">
				<input type="button" value="삭제" id="deleteBtn">
				<input type="reset" value="취소"  id="resetBtn">
			</td>
		</tr>
	</table>
</form>

<script type="text/javascript" src="http://code.jQuery.com/jquery-3.7.1.min.js"></script>
<script type="text/javascript" src="../js/update.js"></script>

</body>
</html>