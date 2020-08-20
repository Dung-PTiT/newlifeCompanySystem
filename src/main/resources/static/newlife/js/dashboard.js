$(document).ready(function () {
    initMap();
});

function initMap() {
    var map = new google.maps.Map(document.getElementById('add_company_map'), {
        zoom: 17,
        center: {lat: 21.020309, lng: 105.826360},
        disableDefaultUI: true,
        fullscreenControl: true,
        zoomControl: true
    });
    var infowindow = new google.maps.InfoWindow;

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(21.020309, 105.826360),
        map: map
    });
}