var axios = require('axios')

module.exports= {
    searchLine(body) {
        return new Promise(function (resolve, reject) {
            var num = 2; // nombre de return
            var time = '14:00';

            // Make a request for a user with a given ID'
            axios.get('https://timetable.search.ch/api/route.en.json?from='+body.fromStation+'&to='+body.toStation+'&num='+num+'&time='+time).then((response) => {
                console.log('https://timetable.search.ch/api/route.en.json?from='+body.fromStation+'&to='+body.toStation+'&num='+num);
                console.log(response.data);
                resolve(response.data)
            }).catch(function (error) {
                console.log(error);
            });
        })
    }
}