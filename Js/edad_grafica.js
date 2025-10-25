const ctx = document.getElementById('edad_grafica_chart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['20-30 años', '31-59 años', '60 y más'],
    datasets: [
      {
        label: 'Frecuencia',
        data: [225, 1052, 112],
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