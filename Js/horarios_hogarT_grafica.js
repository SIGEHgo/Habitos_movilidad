let datos_horarios_hogarT_grafica =  Object.entries(
  datos.features.reduce((acc, d) => {
    const clave = d.properties["¿Cuál es el horario típico de su primer viaje?_Homologado"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {})
).map(([g, v]) => ({ g, v}));


const ctx12 = document.getElementById('horarios_hogarT_grafica').getContext('2d');

actualizador_horarios_hogarT_grafica = new Chart(ctx12, {
  type: 'bar',
  data: {
    labels: datos_horarios_hogarT_grafica.map(d => d.g),
    datasets: [
      {
        label: 'Frecuencia',
        data: datos_horarios_hogarT_grafica.map(d => d.v),
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
        text: "Horarios de salida del hogar para ir al trabajo",
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