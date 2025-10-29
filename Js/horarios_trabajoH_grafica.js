let datos_horarios_trabajoH_grafica =  Object.entries(
  datos.features.reduce((acc, d) => {
    const clave = d.properties["Comúnmente, ¿En qué horario realiza el viaje de regreso a su domicilio particular?_Trabajo_Hogar"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {})
).map(([g, v]) => ({ g, v}));


const ctx16 = document.getElementById('horarios_trabajoH_grafica').getContext('2d');

actualizador_horarios_trabajoH_grafica = new Chart(ctx16, {
  type: 'bar',
  data: {
    labels: datos_horarios_trabajoH_grafica.map(d => d.g),
    datasets: [
      {
        label: 'Frecuencia',
        data: datos_horarios_trabajoH_grafica.map(d => d.v),
        backgroundColor: ['rgba(98, 17, 50, 1)'],
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
        text: "Horarios de salida del trabajo para ir al hogar",
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