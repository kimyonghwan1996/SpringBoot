$(function () {
    $.ajax({
        type: 'post'
        , url: '/user/getUserList'
        , data: {'page': $('#page').val()}
        , dataType: 'json'
        , success: function (data) {
            console.log(JSON.stringify(data));  // 콘솔로 확인하려고

            /*
            * Spring Data JPA를 사용하여 페이지네이션을 구현할 때, Page<T> 객체를 반환하면,
            *  JSON 응답은 Page 인스턴스에 포함된 여러 정보들과 함께 content 배열을 포함
            *  즉. 페이지는 데이터는 content로 받아야한다.(원래는 data.list로 받음)
            * */
            $.each(data.content, function (index, items) {
                var result = `<tr>`
                    + `<td align="center">` + items.name + `</td>`
                    + `<td align="center">` + `<a href="#" class="idA">` + items.id + '</a>' + `</td>`
                    + `<td align="center">` + items.pwd + `</td>`
                $('#userListTable').append(result);
            });

            // 페이징 처리
            var pagingHTML = '';
            for (var i = 0; i < data.totalPages; i++) {
                if (i == $('#page').val()) {
                    pagingHTML += `<span id='currentPaging' onclick='userPaging(`+i+`)'> ` + (i + 1) + ` </span>`
                } else {
                    pagingHTML += `<span id='paging' onclick='userPaging(`+i+`)'> ` + (i + 1) + ` </span>`
                }
            }
            $('#userPagingDiv').html(pagingHTML);

            //아이디를 클릭했을 때
            $('.idA').click(function () {
                //alert('name=' + $(this).parent().prev().text());
                location.href = '/user/updateForm?id=' + $(this).text() + '&page=' + $('#page').val();
            })
        }
        , error: function (e) {
            console.log(e);
        }
    })
})