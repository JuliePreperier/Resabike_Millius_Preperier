function completionFrom(){
    var input = $('#from').val();

    $.ajax({
        url: "/zoneadmin/completion/input="+input,
        type: 'GET',
        datatype: 'JSON',
        success: function(reservations) {
            alert('success !');
        },
        error: function(){
            alert('fail');
        }
    })


}

function countBikesPerJourney(){
    var idJourney = $('#from').val();

    $.ajax({
        url: "/zoneadmin/zoneadmin_reservations/nbBikes="+idJourney,
        type: 'GET',
        success: function(nbBike) {
            console.log(nbBike);
            $("#response").html(nbBike);
        }
    })
}