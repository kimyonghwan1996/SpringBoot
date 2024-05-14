$(function(){
    //id에 해당하는 데이터 가져오기
    $.ajax({
        type: 'post'
        , url: '/user/getUser'
        , data: 'id=' + $('#id').val()
        , dataType: 'json'
        , success: function (data){
            console.log(JSON.stringify(data));

            $('#name').val(data.name);
            $('#pwd').val(data.pwd);
        }
        , error: function (e){
            console.log(e);
        }
    })
})
// 취소 버튼
$('#resetBtn').click(function (){
   location.reload();
});

// 수정 버튼
$('#updateBtn').click(function (){
    // div영역 초기화
    $('#nameDiv').empty();
    $('#pwdDiv').empty();

    var pwd = $('#pwd').val();
    var name = $('#name').val();
    console.log(id);

    if(pwd == ""){
        $('#pwdDiv').html('비밀번호를 입력하세요.')
    }
    else if(name == ""){
        $('#nameDiv').html('이름을 입력하세요.')
    }
    else
    $.post({
        url: '/user/update'
        , data: $('#updateForm').serialize()
        , success: function (){
            alert('회원정보 수정 완료');
            //리스트 보기, 대신 수정한 페이지로 가기
            location.href='/user/list'
        }
        , error: function (e){
            console.log(e);
        }
    })
})