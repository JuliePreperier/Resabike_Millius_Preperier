/* This document is used to pass from the client side to the server side with AJAX methods.*/

/* Is used to delete a line from superadmin client side --> point to a .delete method in the superadmin route*/
function deleteLine(id){
    console.log(id)
    $.ajax({
        url: "/superadmin/superadmin_lignes",
        type: 'DELETE',
        data: {id_line: id},
        success: function(data) {
            // Once it succeed, wait 5 sec and refresh the current page
            console.log(data)
            setTimeout(function(){
                window.location.reload(true);
            },500);
        }
    })
}

/* Is used to delete a zone from superadmin client side --> point to a .delete method in the superadmin route*/
function deleteZone(id){
    console.log(id)
    $.ajax({
        url: "/superadmin/superadmin_zones",
        type: 'DELETE',
        data: {id_zone: id},
        success: function(data) {
            // Once it succeed, wait 5 sec and refresh the current page
            console.log(data)
            setTimeout(function(){
                window.location.reload(true);
            },500);
        }
    })
}

/* Is used to update a zone from superadmin client side --> point to a .put method in the superadmin route*/
function updateZoneInfos(){
    /* Retreive all needed infos with JQuery*/
    var idZone = $('#idZone').val();
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
            // Once it succeed, wait 5 sec and refresh the current page
            console.log(data);
            setTimeout(function(){
                window.location.reload(true);
            },500);
        }
    })
}