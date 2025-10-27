let datos_gasto_mensual_grafica =  Object.entries(
  datos.reduce((acc, d) => {
    const clave = d["Normalmente, ¿Cuánto gasta mensualmente en transporte?"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {})
).map(([g, v]) => ({ g, v}));


const ctx8 = document.getElementById('gasto_mensual_grafica').getContext('2d');

new Chart(ctx8, {
  type: 'bar',
  data: {
    labels: datos_gasto_mensual_grafica.map(d => d.g),
    datasets: [
      {
        label: 'Frecuencia',
        data: datos_gasto_mensual_grafica.map(d => d.v),
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
        text: "Gasto Mensual",
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