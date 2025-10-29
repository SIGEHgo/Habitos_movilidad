var map = L.map('map').setView([20.4784, -98.8636], 8);

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

L.geoJSON(hogar_cp, {
    style: function (feature) {
        return {
            color: 'rgba(179, 142, 93, 1)',
            weight: 2,
            fillOpacity: 0.4
        };
    },
    onEachFeature: function (feature, layer) {
        const p = feature.properties || {};
        const html1 = `
            <b>Código Postal:</b> ${p["Código postal_Hogar_Trabajo"]}
            <br><b>Municipio:</b> ${p.NOM_MUN}
            <br><b>Lugares a donde van:</b> ${p.depencia}
            <br><b>Total de personas que viajan:</b> ${p.n}
        `;
        
        layer.bindPopup(html1);
        layer.bindTooltip(p["Código postal_Hogar_Trabajo"], { 
            direction: "center" 
        });
    }
}).addTo(map);

const trabajoLayer = L.geoJSON(trabajo_cp, {
    style: function (feature) {
        return {
            color: 'rgba(98, 17, 50, 1)',
            weight: 2,
            fillOpacity: 0.4
        };
    },
    onEachFeature: function (feature, layer) {
        const p = feature.properties || {};
        const html2 = `
            <b>Código Postal:</b> ${p["Código Postal_Trabajo_Hogar"]}
            <br><b>Municipio:</b> ${p.NOM_MUN}
            <br><b>Dependencias:</b> ${p.depencia}
            <br><b>Personas que trabajan:</b> ${p.n}
        `;
        layer.bindPopup(html2);
        layer.bindTooltip(p["Código Postal_Trabajo_Hogar"], {
            direction: "center"
        });
    }
});

const overlays = {
    "Zonas de trabajo": trabajoLayer
};

L.control.layers({}, overlays, { collapsed: false }).addTo(map);










function actualizarGraficasBasadoEnFeaturesVisibles() {
  const bounds = map.getBounds();

  datos_filtrados = datos.features.filter((feature) => {
    const lat = feature.geometry.coordinates[1];
    const lng = feature.geometry.coordinates[0];
    //rellenes datos_edad_grafica.
    return bounds.contains([lat, lng]);
  });

  // Aquí puedes actualizar las gráficas usando datos_filtrados
  console.log("Número de features visibles:", datos_filtrados.length);


  // Primera pestaña
  datos_edad_grafica = Object.entries(
    datos_filtrados.reduce((acc, d) => {
      const clave = d.properties.Edad_Clasificacion;
      acc[clave] = (acc[clave] || 0) + 1;
      return acc;
    }, {})
  ).map(([g, v]) => ({ g, v }));
  actualizador_edad_grafica.data.datasets[0].data = datos_edad_grafica.map(d => d.v);
  actualizador_edad_grafica.data.labels = datos_edad_grafica.map(d => d.g);
  actualizador_edad_grafica.update();



  datos_genero_grafica = Object.entries(
    datos_filtrados.reduce((acc, d) => {
      const clave = d.properties.Genero;
      acc[clave] = (acc[clave] || 0) + 1;
      return acc;
    }, {})
  ).map(([g, v]) => ({ g, v }));
  actualizador_genero_grafica.data.datasets[0].data = datos_genero_grafica.map(d => d.v);
  actualizador_genero_grafica.data.labels = datos_genero_grafica.map(d => d.g);
  actualizador_genero_grafica.update();



  datos_discapacidad_grafica = Object.entries(
    datos_filtrados.reduce((acc, d) => {
      const clave = d.properties["¿Usted presenta alguna discapacidad?"];
      acc[clave] = (acc[clave] || 0) + 1;
      return acc;
    }, {})
  ).map(([g, v]) => ({ g, v }));
  actualizador_discapacidad_grafica.data.datasets[0].data = datos_discapacidad_grafica.map((d) => d.v);
  actualizador_discapacidad_grafica.data.labels = datos_discapacidad_grafica.map((d) => d.g);
  actualizador_discapacidad_grafica.update();



  datos_dependencia_grafica = Object.entries(
    datos_filtrados.reduce((acc, d) => {
      const clave = d.properties.Dependencia;
      acc[clave] = (acc[clave] || 0) + 1;
      return acc;
    }, {})
  ).map(([g, v]) => ({ g, v }));
  actualizador_dependencia_grafica.data.datasets[0].tree = datos_dependencia_grafica;
  actualizador_dependencia_grafica.update();







  // Segunda pestaña
  datos_medios_transporte_grafica = Object.entries(
    datos_filtrados.reduce((acc, d) => {
      const clave = d.properties["¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio"];
      acc[clave] = (acc[clave] || 0) + 1;
      return acc;
    }, {})
  ).map(([g, v]) => ({ g, v }));
  actualizador_medios_transporte_grafica.data.datasets[0].tree = datos_medios_transporte_grafica;
  actualizador_medios_transporte_grafica.update();



datos_frecuencia_viajes_grafica = Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave = d.properties["¿Con qué frecuencia realiza este viaje?_Hogar_Trabajo"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {})
).map(([g, v]) => ({ g, v }));
actualizador_frecuencia_viajes_grafica.data.datasets[0].data = datos_frecuencia_viajes_grafica.map(d => d.v);
actualizador_frecuencia_viajes_grafica.data.labels = datos_frecuencia_viajes_grafica.map(d => d.g);
actualizador_frecuencia_viajes_grafica.update();



datos_viajes_intermedios_grafica =  Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave = d.properties["¿Cuántos viajes intermedios realiza antes de llegar a su destino final?_Hogar_Trabajo"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {})
).map(([g, v]) => ({ g, v}));
actualizador_viajes_intermedios_grafica.data.datasets[0].data = datos_viajes_intermedios_grafica.map(d => d.v);
actualizador_viajes_intermedios_grafica.data.labels = datos_viajes_intermedios_grafica.map(d => d.g);
actualizador_viajes_intermedios_grafica.update();



datos_gasto_mensual_grafica =  Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave = d.properties["Normalmente, ¿Cuánto gasta mensualmente en transporte?"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {})
).map(([g, v]) => ({ g, v}));
actualizador_gasto_mensual_grafica.data.datasets[0].data = datos_gasto_mensual_grafica.map(d => d.v);
actualizador_gasto_mensual_grafica.data.labels = datos_gasto_mensual_grafica.map(d => d.g);
actualizador_gasto_mensual_grafica.update();    


// Tercera pestaña
datos_tiempo_hogarT_grafica =  Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave = d.properties["¿Cuál es el tiempo de traslado que realiza a su lugar de trabajo?_Hogar_Trabajo"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {})
).map(([g, v]) => ({g, v}));
actualizador_tiempo_hogarT_grafica.data.datasets[0].data = datos_tiempo_hogarT_grafica.map(d => d.v);
actualizador_tiempo_hogarT_grafica.data.labels = datos_tiempo_hogarT_grafica.map(d => d.g);
actualizador_tiempo_hogarT_grafica.update();



datos_accesibilidad_hogarT_grafica =  Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave = d.properties["¿Cómo calificaría la accesibilidad al transporte público desde su domicilio particular?_Hogar_Trabajo"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {})
).map(([g, v]) => ({g, v}));

actualizador_accesibilidad_hogarT_grafica.data.datasets[0].data = datos_accesibilidad_hogarT_grafica.map(d => d.v);
actualizador_accesibilidad_hogarT_grafica.data.labels = datos_accesibilidad_hogarT_grafica.map(d => d.g);
actualizador_accesibilidad_hogarT_grafica.update();



datos_horarios_hogarT_grafica =  Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave = d.properties["¿Cuál es el horario típico de su primer viaje?_Homologado"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {})
).map(([g, v]) => ({ g, v}));
actualizador_horarios_hogarT_grafica.data.datasets[0].data = datos_horarios_hogarT_grafica.map(d => d.v);
actualizador_horarios_hogarT_grafica.data.labels = datos_horarios_hogarT_grafica.map(d => d.g);
actualizador_horarios_hogarT_grafica.update();




// Cuarta pestaña

datos_tiempo_trabajoH_grafica =  Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave = d.properties["¿Cuál es el tiempo de traslado que realiza a su domicilio particular?_Trabajo_Hogar"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {})
).map(([g, v]) => ({g, v}));
actualizador_tiempo_trabajoH_grafica.data.datasets[0].data = datos_tiempo_trabajoH_grafica.map(d => d.v);
actualizador_tiempo_trabajoH_grafica.data.labels = datos_tiempo_trabajoH_grafica.map(d => d.g);
actualizador_tiempo_trabajoH_grafica.update();


datos_accesibilidad_trabajoH_grafica =  Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave = d.properties["¿Cómo calificaría la accesibilidad al transporte público desde su lugar de trabajo?"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {})
).map(([g, v]) => ({g, v}));
actualizador_accesibilidad_trabajoH_grafica.data.datasets[0].data = datos_accesibilidad_trabajoH_grafica.map(d => d.v);
actualizador_accesibilidad_trabajoH_grafica.data.labels = datos_accesibilidad_trabajoH_grafica.map(d => d.g);
actualizador_accesibilidad_trabajoH_grafica.update();



datos_horarios_trabajoH_grafica =  Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave = d.properties["Comúnmente, ¿En qué horario realiza el viaje de regreso a su domicilio particular?_Trabajo_Hogar"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {})
).map(([g, v]) => ({ g, v}));
actualizador_horarios_trabajoH_grafica.data.datasets[0].data = datos_horarios_trabajoH_grafica.map(d => d.v);
actualizador_horarios_trabajoH_grafica.data.labels = datos_horarios_trabajoH_grafica.map(d => d.g);
actualizador_horarios_trabajoH_grafica.update();





}



map.on("zoomend dragend", actualizarGraficasBasadoEnFeaturesVisibles);