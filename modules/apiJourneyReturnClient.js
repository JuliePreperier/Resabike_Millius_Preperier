var axios = require('axios')

module.exports= {
    searchLine(body) {
        return new Promise(function (resolve, reject) {
            var num = 10; // nombre de return
            //dd mmmm, yyyy
            //hh:mm
            // Make a request for a user with a given ID'
            axios.get('https://timetable.search.ch/api/route.en.json?from='+body.station[0]+'&to='+body.station[1]+'&num='+num+'&date='+body.dateRes+'&time='+body.timeRes).then((response) => {
                resolve(response.data.connections)
            }).catch(function (error) {
                console.log(error);
            });
        })
    },

    searchLineComp(from, to, date, time){
        return new Promise(function (resolve, reject) {
            var num = 1; // nombre de return
            //dd mmmm, yyyy
            //hh:mm
            // Make a request for a user with a given ID'
            axios.get('https://timetable.search.ch/api/route.en.json?from='+from+'&to='+to+'&num='+num+'&date='+date+'&time='+time).then((response) => {
                resolve(response.data.connections)
            }).catch(function (error) {
                console.log(error);
            });
        })
    }
}