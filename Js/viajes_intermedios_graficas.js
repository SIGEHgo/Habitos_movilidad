let datos_viajes_intermedios_grafica =  Object.entries(
  datos.features.reduce((acc, d) => {
    const clave = d.properties["¿Cuántos viajes intermedios realiza antes de llegar a su destino final?_Hogar_Trabajo"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {})
).map(([g, v]) => ({ g, v}));


const ctx7 = document.getElementById('viajes_intermedios_grafica').getContext('2d');

new Chart(ctx7, {
  type: 'bar',
  data: {
    labels: datos_viajes_intermedios_grafica.map(d => d.g),
    datasets: [
      {
        label: 'Frecuencia',
        data: datos_viajes_intermedios_grafica.map(d => d.v),
        backgroundColor: ['rgba(179, 142, 93, 1)', 'rgba(98, 17, 50, 1)', 'rgba(232, 216, 195, 1)'],
        borderColor: ['rgba(179, 142, 93, 1)'],
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
        text: "Viajes Intermedios",
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