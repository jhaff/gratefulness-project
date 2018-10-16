$('form').each(function() {
    $('input').keypress(function(e) {
        // Was enter pressed?
        if(e.which == 10 || e.which == 13) {
            var item = $("input[id='nugget-description']").val();
            console.log("hello");
            if ($.trim(item) === '') {
                alert("Please Enter Something!");
                return false;
            }
            this.form.submit();
        }
    });

    $('input[type=submit]').hide();
   });

   var map = L.map('map').setView([51.505, -0.09], 3);

   L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibmV3ZHJ1bW1lcjIiLCJhIjoiY2puYjJsODluMDJ3NDNsbzdiNDl6OWlpOSJ9.MTeHTnBG_LzEANKixJujEg'
}).addTo(map);

navigator.geolocation.getCurrentPosition(function(position) {
  map.setView([position.coords.latitude, position.coords.longitude], 13);
});
