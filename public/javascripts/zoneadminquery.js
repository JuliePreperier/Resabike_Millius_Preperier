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

function countBikesPerJourney(){
    var idJourney = $('#idJourney').val();

    $.ajax({
        url: "/zoneadmin/zoneadmin_reservations/nbBikes="+idJourney,
        type: 'GET',
        success: function(nbBike) {
            console.log(nbBike);
            $("#response").html(nbBike);
        }
    })


}