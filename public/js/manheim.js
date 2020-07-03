$(document).ready(function () {
    $.getJSON( "/js/vehicleType.json", function( data ) {
        var items = [];
        $.each( data, function( key, val ) {
            items.push( "<option  value='"+val.value+"'>" + val.name + "</option>" );
        });


        $('#makesSelect').html(items.join( "" ))

    });
})
