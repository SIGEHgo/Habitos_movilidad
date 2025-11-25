// let datos_edad_grafica =  Object.entries(
//   datos.features.reduce((acc, d) => {
//     const clave = d.properties.Edad_Clasificacion;
//     acc[clave] = (acc[clave] || 0) + 1;
//     return acc;
//   }, {})
// ).map(([g, v]) => ({ g, v}));


let datos_edad_grafica = Object.entries(
  datos.features.reduce((acc, d) => {
    const clave = d.properties.Edad_Clasificacion;
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {})
)
.map(([g, v]) => ({ g, v }))
.sort((a, b) => {
  const ordenDeseado = ["20-30 años", "31-59 años", "60 y más"];
  return ordenDeseado.indexOf(a.g) - ordenDeseado.indexOf(b.g);
});


const ctx = document.getElementById('edad_grafica').getContext('2d');

let actualizador_edad_grafica = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: datos_edad_grafica.map(d => d.g),
    datasets: [
      {
        label: 'Frecuencia',
        data: datos_edad_grafica.map(d => d.v),
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
        text: "Edad",
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