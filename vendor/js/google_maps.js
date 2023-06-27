
function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: {
            lat: 44,
            lng: -33
        }
    }
    );

}

window.initMap = initMap;