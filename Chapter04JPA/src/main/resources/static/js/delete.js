$(function(){
	//입력
	$('#deleteBtn').click(function(){
		if(confirm('삭제하시겠습니까?')){
			$.ajax({
				type: 'post',
				url: '/user/delete',
				data: $('#id').val(),
				success: function(){
					alert('삭제완료');
					location.href='/user/list';
				},
				error: function(e){
					console.log(e);
				}
			});
		}//if
	});
});