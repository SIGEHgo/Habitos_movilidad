let datos_accesibilidad_trabajoH_grafica =  Object.entries(
  datos.features.reduce((acc, d) => {
    const clave = d.properties["¿Cómo calificaría la accesibilidad al transporte público desde su lugar de trabajo?"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {})
).map(([g, v]) => ({g, v}));


const ctx15 = document.getElementById('accesibilidad_trabajoH_grafica').getContext('2d');

actualizador_accesibilidad_trabajoH_grafica = new Chart(ctx15, {
  type: 'doughnut',
  data: {
    labels: datos_accesibilidad_trabajoH_grafica.map(d => d.g),
    datasets: [
      {
        label: 'Frecuencia',
        data: datos_accesibilidad_trabajoH_grafica.map(d => d.v),
        backgroundColor: ['rgba(179, 142, 93, 1)', 'rgba(98, 17, 50, 1)', 'rgba(232, 216, 195, 1)', 'rgba(150, 150, 150, 1)', '#a01f41', '#254d50'],
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
        text: "Accesibilidad del transporte para ir a su casa",
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