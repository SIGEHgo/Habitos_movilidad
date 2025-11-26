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

  /////////////////////
  // Primera pestaña //
  /////////////////////

  datos_edad_grafica = Object.entries(
    datos_filtrados.reduce((acc, d) => {
      const clave = d.properties.Edad_Clasificacion;
      acc[clave] = (acc[clave] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([g, v]) => ({ g, v }))
    .sort((a, b) => {
      const ordenDeseado = ["20-30 años", "31-59 años", "60 y más"];
      return ordenDeseado.indexOf(a.g) - ordenDeseado.indexOf(b.g);
    });

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






  /////////////////////
  // Segunda pestaña //
  /////////////////////

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



datos_gasto_mensual_grafica = Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave =
      d.properties["Normalmente, ¿Cuánto gasta mensualmente en transporte?"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {})
)
  .map(([g, v]) => ({ g, v }))
  .sort((a, b) => {
    const ordenDeseado = [
      "Menos de $500.00",
      "De $501.00 a $1,000.00",
      "De $1,001.00 a $1,500.00",
      "De $1,501.00 a $2,000.00",
      "De $2,001.00 a $2,500.00",
      "De $2,501.00 a $3,000.00",
      "Más de $3,000.00",
    ];
    return ordenDeseado.indexOf(a.g) - ordenDeseado.indexOf(b.g);
  });
actualizador_gasto_mensual_grafica.data.datasets[0].data = datos_gasto_mensual_grafica.map(d => d.v);
actualizador_gasto_mensual_grafica.data.labels = datos_gasto_mensual_grafica.map(d => d.g);
actualizador_gasto_mensual_grafica.update();    

//////////////////////
// Tercera pestaña //
////////////////////

datos_tiempo_hogarT_grafica =  Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave = d.properties["¿Cuál es el tiempo de traslado que realiza a su lugar de trabajo?_Hogar_Trabajo"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {})
).map(([g, v]) => ({g, v}))
.sort((a, b) => {
  const ordenDeseado = ["Menos de 10 min.", "De 10 a 15 min.", "De 16 a 30 min.", "De 31 a 60 min.", "Más de 1 hora"];
  return ordenDeseado.indexOf(a.g) - ordenDeseado.indexOf(b.g);
});
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
).map(([g, v]) => ({ g, v}))
.sort((a, b) => {
  const ordenDeseado = ["06:00 - 07:00 am", "07:00 - 08:00 am", "08:00 - 09:00 am", "09:00 - 10:00 am", "Otro"];
  return ordenDeseado.indexOf(a.g) - ordenDeseado.indexOf(b.g);
});
actualizador_horarios_hogarT_grafica.data.datasets[0].data = datos_horarios_hogarT_grafica.map(d => d.v);
actualizador_horarios_hogarT_grafica.data.labels = datos_horarios_hogarT_grafica.map(d => d.g);
actualizador_horarios_hogarT_grafica.update();



/////////////////////
// Cuarta pestaña //
///////////////////

datos_tiempo_trabajoH_grafica =  Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave = d.properties["¿Cuál es el tiempo de traslado que realiza a su domicilio particular?_Trabajo_Hogar"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {})
).map(([g, v]) => ({g, v}))
.sort((a, b) => {
  const ordenDeseado = ["Menos de 10 min.", "De 10 a 15 min.", "De 16 a 30 min.", "De 31 a 60 min.", "Más de 1 hora"];
  return ordenDeseado.indexOf(a.g) - ordenDeseado.indexOf(b.g);
});
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
).map(([g, v]) => ({ g, v}))
.sort((a, b) => {
  const ordenDeseado = ["3:00 a 4:30 pm", "4:30 – 5:30 pm", "5::30 – 6:30 pm", "6:30 – 7:00 pm", "7:00 – 7:30 pm", "7:30 pm  en adelante"];
  return ordenDeseado.indexOf(a.g) - ordenDeseado.indexOf(b.g);
});
actualizador_horarios_trabajoH_grafica.data.datasets[0].data = datos_horarios_trabajoH_grafica.map(d => d.v);
actualizador_horarios_trabajoH_grafica.data.labels = datos_horarios_trabajoH_grafica.map(d => d.g);
actualizador_horarios_trabajoH_grafica.update();


/////////////////////////////////////////////////////////
/// Alternativas de transporte para realizar el viaje ///
/////////////////////////////////////////////////////////

datos_vehiculo_particular_hogarT =  Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave = d.properties["De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [Vehículo particular]_Hogar_Trabajo"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {...labelsFijos})
).map(([g, v]) => ({ g, v}));

datos_transporte_publico_hogarT =  Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave = d.properties["De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [Transporte público colectivo (micro, urvan, combi)]_Hogar_Trabajo"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {...labelsFijos})
).map(([g, v]) => ({ g, v}));

datos_tuzobus_hogarT =  Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave = d.properties["De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [Tuzobús]_Hogar_Trabajo"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {...labelsFijos})
).map(([g, v]) => ({ g, v}));

datos_taxi_hogarT =  Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave = d.properties["De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [Taxi]_Hogar_Trabajo"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {...labelsFijos})
).map(([g, v]) => ({ g, v}));

datos_bicicleta_hogarT =  Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave = d.properties["De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [Bicicleta]_Hogar_Trabajo"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {...labelsFijos})
).map(([g, v]) => ({ g, v}));

datos_pie_hogarT =  Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave = d.properties["De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [A pie]_Hogar_Trabajo"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {...labelsFijos})
).map(([g, v]) => ({ g, v}));

datos_auto_compartido_hogarT =  Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave = d.properties["De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [Auto compartido]_Hogar_Trabajo"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {...labelsFijos})
).map(([g, v]) => ({ g, v}));


matriz_hogarT = unirColumnas(
  datos_vehiculo_particular_hogarT.map(d => d.v),
  datos_transporte_publico_hogarT.map(d => d.v),
  datos_tuzobus_hogarT.map(d => d.v),
  datos_taxi_hogarT.map(d => d.v),
  datos_bicicleta_hogarT.map(d => d.v),
  datos_pie_hogarT.map(d => d.v),
  datos_auto_compartido_hogarT.map(d => d.v),
);


actualizador_transporte_elegir_hogarT_grafica.data.datasets[0].data = matriz_hogarT[0];
actualizador_transporte_elegir_hogarT_grafica.data.datasets[1].data = matriz_hogarT[1];
actualizador_transporte_elegir_hogarT_grafica.data.datasets[2].data = matriz_hogarT[2];
actualizador_transporte_elegir_hogarT_grafica.data.datasets[3].data = matriz_hogarT[3];
actualizador_transporte_elegir_hogarT_grafica.data.datasets[4].data = matriz_hogarT[4];
actualizador_transporte_elegir_hogarT_grafica.data.datasets[5].data = matriz_hogarT[5];
actualizador_transporte_elegir_hogarT_grafica.data.datasets[6].data = matriz_hogarT[6];
actualizador_transporte_elegir_hogarT_grafica.update();


//////////////////////////////////////////////////////////////////
/// Alternativas de transporte para realizar el viaje al hogar ///
//////////////////////////////////////////////////////////////////

datos_vehiculo_particular_trabajoH =  Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave = d.properties["De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su domicilio particular? (Deberá elegir una opción diferente en cada columna) [Vehículo particular]_Trabajo_Hogar"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {...labelsFijos})
).map(([g, v]) => ({ g, v}));

datos_transporte_publico_trabajoH =  Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave = d.properties["De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su domicilio particular? (Deberá elegir una opción diferente en cada columna) [Transporte público colectivo (micro, Urvan, combi)]_Trabajo_Hogar"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {...labelsFijos})
).map(([g, v]) => ({ g, v}));

datos_tuzobus_trabajoH =  Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave = d.properties["De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su domicilio particular? (Deberá elegir una opción diferente en cada columna) [Tuzobús]_Trabajo_Hogar"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {...labelsFijos})
).map(([g, v]) => ({ g, v}));

datos_taxi_trabajoH =  Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave = d.properties["De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su domicilio particular? (Deberá elegir una opción diferente en cada columna) [Taxi]_Trabajo_Hogar"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {...labelsFijos})
).map(([g, v]) => ({ g, v}));

datos_bicicleta_trabajoH =  Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave = d.properties["De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su domicilio particular? (Deberá elegir una opción diferente en cada columna) [Bicicleta]_Trabajo_Hogar"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {...labelsFijos})
).map(([g, v]) => ({ g, v}));

datos_pie_trabajoH =  Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave = d.properties["De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su domicilio particular? (Deberá elegir una opción diferente en cada columna) [A pie]_Trabajo_Hogar"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {...labelsFijos})
).map(([g, v]) => ({ g, v}));

datos_auto_compartido_trabajoH =  Object.entries(
  datos_filtrados.reduce((acc, d) => {
    const clave = d.properties["De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su domicilio particular? (Deberá elegir una opción diferente en cada columna) [Auto compartido]_Trabajo_Hogar"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {...labelsFijos})
).map(([g, v]) => ({ g, v}));

matriz_trabajoH = unirColumnas(
  datos_vehiculo_particular_trabajoH.map(d => d.v),
  datos_transporte_publico_trabajoH.map(d => d.v),
  datos_tuzobus_trabajoH.map(d => d.v),
  datos_taxi_trabajoH.map(d => d.v),
  datos_bicicleta_trabajoH.map(d => d.v),
  datos_pie_trabajoH.map(d => d.v),
  datos_auto_compartido_trabajoH.map(d => d.v),
);


actualizador_transporte_elegir_trabajoH_grafica.data.datasets[0].data = matriz_trabajoH[0];
actualizador_transporte_elegir_trabajoH_grafica.data.datasets[1].data = matriz_trabajoH[1];
actualizador_transporte_elegir_trabajoH_grafica.data.datasets[2].data = matriz_trabajoH[2];
actualizador_transporte_elegir_trabajoH_grafica.data.datasets[3].data = matriz_trabajoH[3];
actualizador_transporte_elegir_trabajoH_grafica.data.datasets[4].data = matriz_trabajoH[4];
actualizador_transporte_elegir_trabajoH_grafica.data.datasets[5].data = matriz_trabajoH[5];
actualizador_transporte_elegir_trabajoH_grafica.data.datasets[6].data = matriz_trabajoH[6];
actualizador_transporte_elegir_trabajoH_grafica.update();
}



map.on("zoomend dragend", actualizarGraficasBasadoEnFeaturesVisibles);