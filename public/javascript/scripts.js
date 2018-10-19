let newNuggetForm = document.getElementById("newNugget");
var userPosition = null;
var map = L.map('map').setView([51.505, -0.09], 3);
var nuggetPoints = [];
var markers = L.markerClusterGroup({
    chunkedLoading: true,
    spiderfyOnMaxZoom: false
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibmV3ZHJ1bW1lcjIiLCJhIjoiY2puYjJsODluMDJ3NDNsbzdiNDl6OWlpOSJ9.MTeHTnBG_LzEANKixJujEg'
}).addTo(map);

navigator.geolocation.getCurrentPosition(function(position) {
    map.setView([position.coords.latitude, position.coords.longitude], 13);
    userPosition = position;
    userPositionLat = position.coords.latitude;
    userPositionLong = position.coords.longitude;
    console.log("Position Set");
});

axios.get('/nuggets')
    .then(function(response) {

        response.data.nuggets.forEach((nugget) => {
            nuggetPoints.push({
                pos: [nugget.location.coordinates[0], nugget.location.coordinates[1]],
                popup: nugget.description
            });
        });

        // nuggetPoints.forEach(function (obj) {
        //     var m = L.marker(obj.pos).addTo(map),
        //         p = new L.Popup({ autoClose: false, closeOnClick: false })
        //                 .setContent(obj.popup)
        //                 .setLatLng(obj.pos);
        //     m.bindPopup(p).openPopup();
        // });

        for (var i = 0; i < nuggetPoints.length; i++) {
            var nugget = nuggetPoints[i];
            var title = nugget.popup;
            var marker = L.marker(L.latLng(nugget.pos[0], nugget.pos[1]), {
                title: title
            });
            marker.bindPopup(title);
            markers.addLayer(marker);
        }

        map.addLayer(markers);
    })
    .catch(function(error) {
        console.log(error);
    });


markers.on('clusterclick', function(a) {
    a.layer.spiderfy();
});


newNuggetForm.addEventListener("submit", e => {

    e.preventDefault(); //prevents browser from refreshing

    var item = $("input[id='nugget-description']").val();

    if ($.trim(item) === '') {
        alert("Please Enter Something!");
    } else {
        // let nugget = $(newNuggetForm).serialize();

        const nuggetDescription = $('#nugget-description').val();

        var body = {
            description: nuggetDescription,
            location: [userPositionLat, userPositionLong]
        }

        // console.log(nugget);

        nuggetPoints.push({
            pos: [userPositionLat, userPositionLong],
            popup: item
        });

        nuggetPoints.forEach(function(obj) {
            var m = L.marker(obj.pos).addTo(map),
                p = new L.Popup({
                    autoClose: false,
                    closeOnClick: false
                })
                .setContent(obj.popup)
                .setLatLng(obj.pos);
            m.bindPopup(p).openPopup();

        });
        axios.post(`/nuggets`, body)
            .then(function(response) {
                console.log(response);
            }).catch(function(error) {
                console.log(error);
            });
    }
});


// $('form').each(function() {
//     $('input').keypress(function(e) {
//         // Was enter pressed?

//             // this.form.submit();
//         }
//     });
//
//     $('input[type=submit]').hide();
//    });
