let labelsFijos = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0
};

function unirColumnas(...columnas) {
  return columnas[0].map((_, i) => columnas.map(col => col[i]));
}

let datos_vehiculo_particular_hogarT =  Object.entries(
  datos.features.reduce((acc, d) => {
    const clave = d.properties["De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [Vehículo particular]_Hogar_Trabajo"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {...labelsFijos})
).map(([g, v]) => ({ g, v}));

let datos_transporte_publico_hogarT =  Object.entries(
  datos.features.reduce((acc, d) => {
    const clave = d.properties["De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [Transporte público colectivo (micro, urvan, combi)]_Hogar_Trabajo"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {...labelsFijos})
).map(([g, v]) => ({ g, v}));

let datos_tuzobus_hogarT =  Object.entries(
  datos.features.reduce((acc, d) => {
    const clave = d.properties["De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [Tuzobús]_Hogar_Trabajo"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {...labelsFijos})
).map(([g, v]) => ({ g, v}));

let datos_taxi_hogarT =  Object.entries(
  datos.features.reduce((acc, d) => {
    const clave = d.properties["De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [Taxi]_Hogar_Trabajo"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {...labelsFijos})
).map(([g, v]) => ({ g, v}));

let datos_bicicleta_hogarT =  Object.entries(
  datos.features.reduce((acc, d) => {
    const clave = d.properties["De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [Bicicleta]_Hogar_Trabajo"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {...labelsFijos})
).map(([g, v]) => ({ g, v}));

let datos_pie_hogarT =  Object.entries(
  datos.features.reduce((acc, d) => {
    const clave = d.properties["De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [A pie]_Hogar_Trabajo"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {...labelsFijos})
).map(([g, v]) => ({ g, v}));

let datos_auto_compartido_hogarT =  Object.entries(
  datos.features.reduce((acc, d) => {
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


const ctx9 = document.getElementById("transporte_elegir_hogarT_grafica").getContext("2d");


actualizador_transporte_elegir_hogarT_grafica = new Chart(ctx9, {
  type: "bar",
  data: {
    labels: [
      "Vehículo particular",
      "Transporte público",
      "Tuzobús",
      "Taxi",
      "Bicicleta",
      "A pie",
      "Auto compartido",
    ],
    datasets: [
      {
        label: "Prioridad 1",
        backgroundColor: "rgba(232, 216, 195, 1)",
        data: matriz_hogarT[0],
      },
      {
        label: "Prioridad 2",
        backgroundColor: "rgba(98, 17, 50, 1)",
        data: matriz_hogarT[1],
      },
      {
        label: "Prioridad 3",
        backgroundColor: "rgba(179, 142, 93, 1)",
        data: matriz_hogarT[2],
      },
      {
        label: "Prioridad 4",
        backgroundColor: "#c4c4c4",
        data: matriz_hogarT[3],
      },
      {
        label: "Prioridad 5",
        backgroundColor: "#ebc7d0",
        data: matriz_hogarT[4],
      },
      {
        label: "Prioridad 6",
        backgroundColor: "#a01f41",
        data: matriz_hogarT[5],
      },
      {
        label: "Prioridad 7",
        backgroundColor: "#254d50",
        data: matriz_hogarT[6],
      },
    ],
  },
  options: {
    indexAxis: "y",
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Alternativas de transporte para realizar el viaje al trabajo",
        font: {
          size: 24,
          weight: 'bold'
        }
      },
    },
  },
});
