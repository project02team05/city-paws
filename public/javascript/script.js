var map;

function createMap () {
    var options = {
        center: { lat: 43.653225, lng: -79.383186},
        zoom: 15,
        disableDefaultUI: true
    };

    map = new google.maps.Map(document.getElementById('map'), options);
}