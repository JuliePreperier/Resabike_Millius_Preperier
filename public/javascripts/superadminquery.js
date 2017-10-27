function deleteLine(id){
    console.log(id)
    $.ajax({
        url: "/superadmin/line",
        method: 'delete',
        data: {id_line: id}
    }).done(function(res) {
       console.log(res)
    });
}