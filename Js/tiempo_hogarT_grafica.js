let datos_tiempo_hogarT_grafica =  Object.entries(
  datos.features.reduce((acc, d) => {
    const clave = d.properties["¿Cuál es el tiempo de traslado que realiza a su lugar de trabajo?_Hogar_Trabajo"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {})
).map(([g, v]) => ({g, v}));


const ctx10 = document.getElementById('tiempo_hogarT_grafica').getContext('2d');

new Chart(ctx10, {
  type: 'bar',
  data: {
    labels: datos_tiempo_hogarT_grafica.map(d => d.g),
    datasets: [
      {
        label: 'Frecuencia',
        data: datos_tiempo_hogarT_grafica.map(d => d.v),
        backgroundColor: ['rgba(179, 142, 93, 1)'],
        borderColor: ['rgba(98, 17, 50, 1)'],
        borderWidth: 1
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Tiempo de viaje al trabajo",
        padding: { top: 0, bottom: 0 },
        font: {
          size: 24,
          weight: 'bold'
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});