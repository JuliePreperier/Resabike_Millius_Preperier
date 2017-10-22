function autocompdb(id){
    $('#'+id).autocomplete({
        source: function (request, response) {
            $.get('https://timetable.search.ch/api/completion.en.json', {term: request.term}, function(data) { // aller chercher dans la DB !!!
                response($.map(data, function(station) {
                    return station.label

                }));
            }, 'json');
        },
    });
}