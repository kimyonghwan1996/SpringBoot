$(function(){
	//아이디 가져오기
	
	$.ajax({
		type:'post',
		url:'/user/getUser',
		data:'id='+$('#id').val(),
		dataType:'json',
		success: function(data){
			console.log(JSON.stringify(data));
			$('#name').val(data.name);
			$('#pwd').val(data.pwd);
		},
		error: function(e){
			console.log(e);
		}
	});
});

//취소버튼

$('#resetBtn').click(function(){
	location.reload();
});

//수정버튼
/*
$('#updateBtn').click(function(){
	$('#nameDiv').empty();
	$('#pwdDiv').empty();
	
	if($('#name').val() =='') 
			$('#nameDiv').html('이름입력');
		else if($('#pwd').val() =='') 
			$('#pwdDiv').html('비밀번호입력');
		else 
			$.ajax({
				type:'post',
				url:'/Chapter06_Web/user/update',
				data: $('#updateForm').serialize(),
				success: function(){
					alert('수정완료');
					location.href='/Chapter06_Web/user/list?pg=' + $('#pg').val();
				},
				error: function(e){
					console.log(e);
				}
			});
	
});
*/