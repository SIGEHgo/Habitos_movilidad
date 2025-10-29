let datos_dependencia_grafica =  Object.entries(
  datos.features.reduce((acc, d) => {
    const clave = d.properties.Dependencia;
    acc[clave] = (acc[clave] || 0) + 1;
    return acc;
  }, {})
).map(([g, v]) => ({ g, v}));


function color_dependencia_grafica(ctx) {
    if (ctx.type !== 'data') { return 'transparent'; }
    const nombres = ctx.raw.g;
    const colors = {
    'DIF Hidalgo': 'rgba(143, 142, 142, 1)',
    'Despacho del Gobernador': 'rgba(179, 142, 93, 1)',
    'Oficialía Mayor': '#3357FF',
    'Otra': '#a01f41',
    'Procuraduría General de Justicia del Estado de Hidalgo': '#c4c4c4',
    'Secretaría de Agricultura y Desarrollo Rural': '#E67E22',
    'Secretaría de Bienestar e Inclusión Social': 'rgba(232, 216, 195, 1)',
    'Secretaría de Contraloría': '#1ABC9C',
    'Secretaría de Cultura': '#3498DB',
    'Secretaría de Desarrollo Económico': '#E74C3C',
    'Secretaría de Educación Pública': '#8E44AD',
    'Secretaría de Gobierno': 'rgba(179, 142, 93, 1)',
    'Secretaría de Hacienda': 'rgba(98, 17, 50, 1)',
    'Secretaría de Infraestructura Pública y Desarrollo Urbano Sostenible': '#2980B9',
    'Secretaría de Medio Ambiente y Recursos Naturales de Hidalgo': '#ebc7d0',
    'Secretaría de Movilidad y Transporte': '#C0392B',
    'Secretaría de Salud': '#7F8C8D',
    'Secretaría de Seguridad Pública del Estado de Hidalgo': '#2C3E50',
    'Secretaría de Turismo': '#F39C12',
    'Secretaría del Trabajo y Previsión Social': '#254d50',
    'Unidad de Planeación y Prospectiva': '#34495E',
  };
    return colors[nombres] || '#CCCCCC';
}


const ctx2 = document.getElementById('dependencia_grafica').getContext('2d');

actualizador_dependencia_grafica = new Chart(ctx2, {
    type: 'treemap',
    data: {
        datasets: [
            {
            tree: datos_dependencia_grafica,
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
            backgroundColor: (ctx) => color_dependencia_grafica(ctx),
            }
        ],   
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Dependencias',
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
