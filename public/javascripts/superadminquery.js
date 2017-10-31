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
    var idZone = $(document.getElementsById('id_zone')).value();
    var zoneName = $(document.getElementsById('zoneName')).value();
    var zoneUsername = $(document.getElementsById('zoneUsername')).value();
    var zonePassword = $(document.getElementsById('zonePassword')).value();
    var firstName = $(document.getElementsById('firstName')).value();
    var lastName = $(document.getElementsById('lastName')).value();
    var telephon = $(document.getElementsById('telephon')).value();
    var email = $(document.getElementsById('email')).value();
    var busdriverUsername = $(document.getElementsById('busdriverUsername')).value();
    var busdriverPassword = $(document.getElementsById('busdriverPassword')).value();


    $.ajax({
        url: "/superadmin/superadmin_zones",
        type: 'PUT',
        data: {idZone: idZone, zoneName: zoneName, zoneUsername: zoneUsername, zonePassword: zonePassword, firstName: firstName, lastName: lastName, telephon: telephon, email: email, busdriverUsername: busdriverUsername, busdriverPassword: busdriverPassword},
        success: function(data) {
            console.log(data)
            setTimeout(function(){
                window.location.reload(true);
            },500);
        }
    })
}