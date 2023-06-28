function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: {
            lat: 50.112400,
            lng: 8.668600
        }
    });

    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    var locations = [
        { lat: 50.112400, lng: 8.668600 },
    ];

    var markers = locations.map(function (location, indexing) {
        return new google.maps.Marker({
            position: location,
            label: labels[indexing % labels.length],
        });
    });

    var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
}

window.initMap = initMap;