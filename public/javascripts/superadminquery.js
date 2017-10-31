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

function updateZoneInfos(){
    alert($('#zoneName').val());
    var idZone = $('#id_zone').val();
    var zoneName = $('#zoneName').val();
    var zoneUsername = $('#zoneUsername').val();
    var zonePassword = $('#zonePassword').val();
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var telephon = $('#telephon').val();
    var email = $('#email').val();
    var busdriverUsername = $('#busdriverUsername').val();
    var busdriverPassword = $('#busdriverPassword').val();


    $.ajax({
        url: "/superadmin/superadmin_zones",
        type: 'PUT',
        data: {idZone: idZone, zoneName: zoneName, zoneUsername: zoneUsername, zonePassword: zonePassword, firstName: firstName, lastName: lastName, telephon: telephon, email: email, busdriverUsername: busdriverUsername, busdriverPassword: busdriverPassword},
        success: function(data) {
            console.log(data);
            alert("yeahdfjafaoifja");
            setTimeout(function(){
                window.location.reload(true);
            },500);
        }
    })
}