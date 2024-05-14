$(function(){
    $('#writeBtn').click(function(){
        $('#idDiv').empty();

        var id = $('#id').val();
        var pwd = $('#pwd').val();
        var name = $('#name').val();
        console.log(id);

        if(id == ""){
            $('#idDiv').html('아이디를 입력하세요.')
        }
        else if(pwd == ""){
            $('#pwdDiv').html('비밀번호를 입력하세요.')
        }
        else if(name == ""){
            $('#nameDiv').html('이름을 입력하세요.')
        }
        else {
            $.post({
                url: '/user/write'
                , data: $('#writeForm').serialize() // 변수=값&변수=값..
                , success: function (){
                    alert('회원가입 완료');
                    location.href='/';
                }
                , error: function (e){
                    console.log(e);
                }
            })
        }
    })

    // 아이디 중복 체크
    $('#id').blur(function(){
        var id = $('#id').val();
        if(id == ""){
            $('#idDiv').html('아이디를 입력하세요')
        }
        else{
            $.post({
                url : '/user/isExistId'
                , data : {'id' : id} //변수 : 값 -> Json 타입
                , dataType : 'text'
                , success : function(data){
                    console.log(data);
                    if(data == 'exist'){
                        $('#idDiv').html(' 사용 불가능한 아이디').css('color', 'red')
                    }else if(data == "non_exist"){
                        $('#idDiv').html('사용 가능한 아이디').css('color', 'blue')
                    }
                }
            })
        }
    })

});
