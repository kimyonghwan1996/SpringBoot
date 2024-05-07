$(function(){
    $('#writeBtn').click(function(){
		$('#nameDiv').empty();
		$('#idDiv').empty();
		$('#pwdDiv').empty();
	
		if($('#name').val() =='') 
			$('#nameDiv').html('이름입력');
		else if($('#id').val() =='') 
			$('#idDiv').html('아이디입력');
		else if($('#pwd').val() =='') 
			$('#pwdDiv').html('비밀번호입력');
		else 
			$.ajax({
				type: 'post',
				url: '/user/write',
				data: $('#writeForm').serialize(),
				success: function(){
					alert('회원가입완료');
					location.href='/user/list';
				},
				error: function(e){
					console.log(e);
				}
			});
	});

	$('#id').focusout(function(){
		$('#id').empty();	
		
		if($('#id').val() == '')
			$('#idDiv').html('아이디를 입력하세요.');
		else
			$.ajax({
				type: 'post',
				url: '/user/isExistId',
				data: 'id=' + $('#id').val(), //서버로 보내는 데이터
				dataType: 'text', //서버로 받는 데이터 타입
				success: function(data){
					alert(data);
					if(data.trim() == 'exist')
						$('#idDiv').html('사용 불가능').css('color', 'red');
					else if(data == 'non_exist'){
						$('#idDiv').html('사용 가능').css('color', 'blue');
						$('#check').val($('#id').val());
					}
				},
				error: function(e){
					console.log(e);
				}
		});
	});
});