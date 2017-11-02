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