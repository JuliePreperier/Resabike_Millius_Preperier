function logout(){

    $.ajax({
        url: "/login/logout",
        type: 'GET'
    })


}