$(document).ready(function () {
    console.log("ok");
    $('select').material_select();
    $(".button-collapse").sideNav();
    $('.modal#modaleditzone').modal({
        dismissible: false, // Modal can be dismissed by clicking outside of the modal
        ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
            console.log(trigger);
            var zoneName = trigger.data("zoneName");
            var zoneUsername = trigger.data("zoneUsername");
            var zonePassword = trigger.data("zonePassword");
            var firstname = trigger.data("firstname");
            var lastname = trigger.data("lastname");
            var telephon = trigger.data("telephon");
            var email = trigger.data("email");
            var busdriverUsername = trigger.data("busdriverUsername");
            var busdriverPassword = trigger.data("busdriverPassword");
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