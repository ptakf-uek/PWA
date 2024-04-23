// Service Worker
window.onload = () => {
  "use strict";

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./js/sw.js");
  }
};

// create leaflet map
var map = L.map("map").setView([50.06914, 19.9547], 13);

// add openstreetmap tile layer to map
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// get current position from gps
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition((position) => {
    map.locate({ setView: true, maxZoom: 16 });
  });
}

// if location is found
function onLocationFound(e) {
  var radius = e.accuracy;

  L.marker(e.latlng)
    .addTo(map)
    .bindPopup("You are within " + radius + " meters from this point")
    .openPopup();

  L.circle(e.latlng, radius).addTo(map);
}

map.on("locationfound", onLocationFound);

// if location is not found
function onLocationError(e) {
  alert(e.message);
}

map.on("locationerror", onLocationError);
