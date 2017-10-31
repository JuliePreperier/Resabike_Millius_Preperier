$(document).ready(function () {
    console.log("ok");
    $('select').material_select();
    $(".button-collapse").sideNav();
    $('.modal#modaleditzone').modal({
        dismissible:false,
        ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
            var idZone = trigger.data("idzone");
            var zoneName = trigger.data("zonename");
            var zoneUsername = trigger.data("zoneusername");
            var zonePassword = trigger.data("zonepassword");
            var firstname = trigger.data("firstname");
            var lastname = trigger.data("lastname");
            var telephon = trigger.data("telephon");
            var email = trigger.data("email");
            var busdriverUsername = trigger.data("busdriverusername");
            var busdriverPassword = trigger.data("busdriverpassword");
            modal.find('input[id="idZone"]').val(idZone);
            modal.find('input[id="zoneName"]').val(zoneName);
            modal.find('input[id="zoneUsername"]').val(zoneUsername);
            modal.find('input[id="zonePassword"]').val(zonePassword);
            modal.find('input[id="firstname"]').val(firstname);
            modal.find('input[id="lastname"]').val(lastname);
            modal.find('input[id="telephon"]').val(telephon);
            modal.find('input[id="email"]').val(email);
            modal.find('input[id="busdriverUsername"]').val(busdriverUsername);
            modal.find('input[id="busdriverPassword"]').val(busdriverPassword);

            console.log(zoneName);
        }
    });
});