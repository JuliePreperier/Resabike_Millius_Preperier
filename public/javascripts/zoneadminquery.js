
/* This document is used to pass from the client side to the server side with AJAX methods.*/

/* Is used to update a bus driver login from zoneadmin client side --> point to a .put method in the zoneadmin route*/
function updateBusDriver(){
    var idLogin = $('#idLogin').val();
    var username = $('#busdriverUsername').val();
    var password = $('#busdriverPassword').val();


    $.ajax({
        url: "/zoneadmin/zoneadmin_informations/login",
        type: 'PUT',
        data: {idLogin: idLogin, username: username, password: password},
        success: function(data) {
            console.log(data);
            setTimeout(function(){
                window.location.reload(true);
            },500);
        }
    })
}

/* Is used to update a PersonContact from zoneadmin client side --> point to a .put method in the zoneadmin route*/
function updatePersonContact(){
    var idPersonContact = $('#idPersonContact').val();
    var firstname = $('#firstname').val();
    var lastname = $('#lastname').val();
    var telephon = $('#telephon').val();
    var email = $('#email').val();


    $.ajax({
        url: "/zoneadmin/zoneadmin_informations/personContact",
        type: 'PUT',
        data: {idPersonContact: idPersonContact, firstname: firstname, lastname: lastname, telephon: telephon, email:email },
        success: function(data) {
            console.log(data);
            setTimeout(function(){
                window.location.reload(true);
            },500);
        }
    })
}

/* Is used to delete a line from zoneadmin client side --> point to a .delete method in the zoneadmin route*/
function deleteLine(id){
    console.log(id)
    $.ajax({
        url: "/zoneadmin/zoneadmin_lignes",
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

/* Is used to update the "isConfirmed" column in reservation from zoneadmin client side --> point to a .put method in the zoneadmin route*/
function acceptReservation(){

    var idReservation = $('#idReservation').val();

    $.ajax({
        url: "/zoneadmin/zoneadmin_reservations",
        type: 'PUT',
        data: {isConfirmed: 1, idReservation: idReservation},
        success: function(data) {
            console.log(data);
            setTimeout(function(){
                window.location.reload(true);
            },500);
        }
    })
}

/* Is used to delete a reservation from zoneadmin client side --> point to a .delete method in the zoneadmin route*/
function refuseReservation(){
    var idReservation = $('#idReservation').val();

    $.ajax({
        url: "/zoneadmin/zoneadmin_reservations",
        type: 'DELETE',
        data: {id_reservation: idReservation},
        success: function(data) {
            console.log(data)
            setTimeout(function(){
                window.location.reload(true);
            },500);
        }
    })
}

/* Is used to count the number of bike per journey (only confirmed reservation) from zoneadmin client side --> point to a .get method in the zoneadmin route*/
function countBikesPerJourney(){
    var idJourney = $('select[name=id_journey]').val();

    $.ajax({
        url: "/zoneadmin/zoneadmin_reservations/nbBikes="+idJourney,
        type: 'GET',
        success: function(nbBike) {
            console.log(nbBike);
            $("#response").html(nbBike);
        }
    })

}