let newNuggetForm = document.getElementById("newNugget");
var userPosition = null;
var map = L.map('map').setView([51.505, -0.09], 3);
var nuggetPoints = [];

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
 attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
 maxZoom: 18,
 id: 'mapbox.streets',
 accessToken: 'pk.eyJ1IjoibmV3ZHJ1bW1lcjIiLCJhIjoiY2puYjJsODluMDJ3NDNsbzdiNDl6OWlpOSJ9.MTeHTnBG_LzEANKixJujEg'
}).addTo(map);

navigator.geolocation.getCurrentPosition(function(position) {
map.setView([position.coords.latitude, position.coords.longitude], 13);
userPosition = position
});


newNuggetForm.addEventListener("submit", e => {

    e.preventDefault(); //prevents browser from refreshing

    var item = $("input[id='nugget-description']").val();

    if ($.trim(item) === '') {
        alert("Please Enter Something!");
    } else {
        let nugget = $(newNuggetForm).serialize();

        nuggetPoints.push({pos: [userPosition.coords.latitude, userPosition.coords.longitude], popup: item});

        nuggetPoints.forEach(function (obj) {
            var m = L.marker(obj.pos).addTo(map),
                p = new L.Popup({ autoClose: false, closeOnClick: false })
                        .setContent(obj.popup)
                        .setLatLng(obj.pos);
            m.bindPopup(p).openPopup();


        axios.post(`/nuggets`, nugget)
            .then(function(response) {
                console.log(response);
            }).catch(function(error){
                console.log(error);
            });
    });
}});


// $('form').each(function() {
//     $('input').keypress(function(e) {
//         // Was enter pressed?

//             // this.form.submit();
//         }
//     });
//
//     $('input[type=submit]').hide();
//    });
