var map = L.map('map').setView([20.12248590121993, -98.73668905258992], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let invisible = L.geoJSON(datos, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 0,
            color: 'transparent',
            fillOpacity: 0.1
        });
    }
});
invisible.addTo(map);






function actualizarGraficasBasadoEnFeaturesVisibles() {
    const bounds = map.getBounds();

    datos_filtrados = datos.features.filter(feature => {
        const lat = feature.geometry.coordinates[1];
        const lng = feature.geometry.coordinates[0];
        return bounds.contains([lat, lng]);
    })

    // Aquí puedes actualizar las gráficas usando datos_filtrados
    console.log("Número de features visibles:", datos_filtrados.length);
}

map.on("zoomend dragend", actualizarGraficasBasadoEnFeaturesVisibles);