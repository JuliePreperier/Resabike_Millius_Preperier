var axios = require('axios')

module.exports= {
    searchLine(fromStation, toStation) {
        return new Promise(function (resolve, reject) {
            var num = 1; // nombre de return

            // Make a request for a user with a given ID'
            axios.get('https://timetable.search.ch/api/route.en.json?from='+fromStation+'&to='+toStation+'&num='+num).then((response) => {
                console.log('https://timetable.search.ch/api/route.en.json?from='+fromStation+'&to='+toStation+'&num='+num);
                console.log(response.data);
                resolve(response.data)
            }).catch(function (error) {
                console.log(error);
            });
        })
    }
}