$('#searchListBtn').click(function (){
    if($('#value').val() == ''){
        alert('검색어를 입력하세요')
    } else{
        $.post({
            url: '/user/getUserSearchList',
            data: {'columnName': $('#columnName').val(),
                    'value': $('#value').val()},
            dataType: 'json',
            success: function (data){
                console.log(JSON.stringify(data))

                $('#userListTable tr:gt(0)').remove()
                $('#userPagingDiv').remove()

                $.each(data, function (index, items) {
                    var result = `<tr>`
                        + `<td align="center">` + items.name + `</td>`
                        + `<td align="center">` + `<a href="#" class="idA">` + items.id + '</a>' + `</td>`
                        + `<td align="center">` + items.pwd + `</td>`
                    $('#userListTable').append(result);
                });

            },
            error: function (e){
                console.log(e)
            }
        })
    }
})