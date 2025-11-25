let datos_gasto_mensual_grafica = Object.entries(
  datos.features.reduce((acc, d) => {
    const clave =
      d.properties["Normalmente, ¿Cuánto gasta mensualmente en transporte?"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {})
)
  .map(([g, v]) => ({ g, v }))
  .sort((a, b) => {
    const ordenDeseado = [
      "Menos de $500.00",
      "De $501.00 a $1,000.00",
      "De $1,001.00 a $1,500.00",
      "De $1,501.00 a $2,000.00",
      "De $2,001.00 a $2,500.00",
      "De $2,501.00 a $3,000.00",
      "Más de $3,000.00",
    ];
    return ordenDeseado.indexOf(a.g) - ordenDeseado.indexOf(b.g);
  });

const ctx8 = document.getElementById("gasto_mensual_grafica").getContext("2d");

let actualizador_gasto_mensual_grafica = new Chart(ctx8, {
  type: "bar",
  data: {
    labels: datos_gasto_mensual_grafica.map((d) => d.g),
    datasets: [
      {
        label: "Frecuencia",
        data: datos_gasto_mensual_grafica.map((d) => d.v),
        backgroundColor: [
          "rgba(179, 142, 93, 1)",
          "rgba(98, 17, 50, 1)",
          "rgba(232, 216, 195, 1)",
          "#c4c4c4",
          "#ebc7d0",
          "#a01f41",
          "#254d50",
        ],
        borderColor: ["rgba(179, 142, 93, 1)"],
        borderWidth: 1,
      },
    ],
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
          weight: "bold",
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
