function deleteLine(id){
    console.log(id)
    $.ajax({
        url: "/superadmin/superadmin_lignes",
        type: 'DELETE',
        data: {id_line: id},
        success: function(data) {
            console.log(data)
            setTimeout(function(){
                window.location.reload(true);
            },500);
        }
    })
}

function deleteZone(id){
    console.log(id)
    $.ajax({
        url: "/superadmin/superadmin_zones",
        type: 'DELETE',
        data: {id_zone: id},
        success: function(data) {
            console.log(data)
            setTimeout(function(){
                window.location.reload(true);
            },500);
            }
    })
}

