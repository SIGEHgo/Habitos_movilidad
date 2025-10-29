let datos_medios_transporte_grafica =  Object.entries(
  datos.features.reduce((acc, d) => {
    const clave = d.properties["¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio"];
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {})
).map(([g, v]) => ({ g, v}));


function color_medios_transporte_grafica(ctx) {
    if (ctx.type !== 'data') { return 'transparent'; }
    const nombres = ctx.raw.g;
    const colors = {
    'Tuzobús': 'rgba(232, 216, 195, 1)',
    'Taxi': 'rgba(98, 17, 50, 1)',
    'Transporte público colectivo (micro, urvan, combi)': 'rgba(179, 142, 93, 1)',
    'Bicicleta': '#c4c4c4',
    'A pie': '#ebc7d0',
    'Vehículo particular': '#a01f41',
    'Auto compartido': '#254d50',
    'Otros': '#1ABC9C',
  };
    return colors[nombres] || '#CCCCCC';
}


const ctx5 = document.getElementById('medios_transporte_grafica').getContext('2d');

actualizador_medios_transporte_grafica = new Chart(ctx5, {
    type: 'treemap',
    data: {
        datasets: [
            {
            tree: datos_medios_transporte_grafica,
            key: 'v',          
            groups: ['g'],  
            borderColor: 'rgb(179, 142, 93)',
            borderWidth: 1,
            spacing: 1,
            labels: {
                display: true,
                formatter: (ctx) => ctx.raw.g.split(' '),
                color: 'white',
                font: { size: 10, weight: 'bold' },
            },
            backgroundColor: (ctx) => color_medios_transporte_grafica(ctx),
            }
        ],   
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Medios de transporte',
                padding: { top: 0, bottom: 0 },
                font: {
                    size: 24,
                    weight: 'bold'
                }
            },
            legend: {
                display: false
            },
        }
    }
});
