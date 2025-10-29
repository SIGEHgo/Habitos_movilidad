let datos_genero_grafica =  Object.entries(
  datos.features.reduce((acc, d) => {
    const clave = d.properties.Genero;
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {})
).map(([g, v]) => ({ g, v}));


const ctx3 = document.getElementById('genero_grafica').getContext('2d');

let actualizador_genero_grafica = new Chart(ctx3, {
  type: 'pie',
  data: {
    labels: datos_genero_grafica.map(d => d.g),
    datasets: [
      {
        label: 'Frecuencia',
        data: datos_genero_grafica.map(d => d.v),
        backgroundColor: ['rgba(179, 142, 93, 1)', 'rgba(98, 17, 50, 1)', 'rgba(232, 216, 195, 1)', '#c4c4c4'],
        // borderColor: ['rgba(179, 142, 93, 1)'],
        borderWidth: 1,
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
        text: "Género",
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