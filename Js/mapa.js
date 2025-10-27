var map = L.map('map').setView([20.12248590121993, -98.73668905258992], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([20.12248590121993, -98.73668905258992]).addTo(map)
    .bindPopup('Descansito')
    .openPopup();