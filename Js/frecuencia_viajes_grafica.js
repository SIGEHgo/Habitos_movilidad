let datos_frecuencia_viajes_grafica =  Object.entries(
  datos.features.reduce((acc, d) => {
    const clave = d.properties["¿Con qué frecuencia realiza este viaje?_Hogar_Trabajo"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {})
).map(([g, v]) => ({ g, v}));


const ctx6 = document.getElementById('frecuencia_viajes_grafica').getContext('2d');

new Chart(ctx6, {
  type: 'pie',
  data: {
    labels: datos_frecuencia_viajes_grafica.map(d => d.g),
    datasets: [
      {
        label: 'Frecuencia',
        data: datos_frecuencia_viajes_grafica.map(d => d.v),
        backgroundColor: ['rgba(179, 142, 93, 1)', 'rgba(98, 17, 50, 1)', 'rgba(232, 216, 195, 1)'],
        // borderColor: ['rgba(179, 142, 93, 1)'],
        borderWidth: 1
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: "Frecuencia del viaje",
        padding: { top: 0, bottom: 0 },
        font: {
          size: 24,
          weight: 'bold'
        }
      },
    },

    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});