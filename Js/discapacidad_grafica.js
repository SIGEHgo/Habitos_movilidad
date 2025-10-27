let datos_discapacidad_grafica =  Object.entries(
  datos.reduce((acc, d) => {
    const clave = d["¿Usted presenta alguna discapacidad?"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {})
).map(([g, v]) => ({g, v}));


const ctx4 = document.getElementById('discapacidad_grafica').getContext('2d');

new Chart(ctx4, {
  type: 'doughnut',
  data: {
    labels: datos_discapacidad_grafica.map(d => d.g),
    datasets: [
      {
        label: 'Frecuencia',
        data: datos_discapacidad_grafica.map(d => d.v),
        backgroundColor: ['rgba(179, 142, 93, 1)', 'rgba(98, 17, 50, 1)'],
        borderColor: ['rgba(179, 142, 93, 1)'],
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
        text: "Presenta alguna discapacidad",
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