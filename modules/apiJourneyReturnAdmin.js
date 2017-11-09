var axios = require('axios')

/*This method search in the API with 4 arguments. It is used when a admin wants to create a new line in a zone.*/

module.exports= {
    searchLine(body) {
        return new Promise(function (resolve, reject) {
            var num = 2; // nb of return
            var time = '14:00'; // default time to have a correct connection (API problem)

            // Make a request for a user with a given ID'
            axios.get('https://timetable.search.ch/api/route.en.json?from='+body.fromStation+'&to='+body.toStation+'&num='+num+'&time='+time).then((response) => {
                resolve(response.data) // return the response.data to have directly the connections.
            }).catch(function (error) {
                console.log(error);
            });
        })
    }
}