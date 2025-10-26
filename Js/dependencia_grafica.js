
function color_dependencia_grafica(ctx) {
    if (ctx.type !== 'data') { return 'transparent'; }
    const nombres = ctx.raw.g;
    const colors = {
    'DIF Hidalgo': '#FF5733',
    'Despacho del Gobernador': '#33FF57',
    'Oficialía Mayor': '#3357FF',
    'Otra': '#F1C40F',
    'Procuraduría General de Justicia del Estado de Hidalgo': '#9B59B6',
    'Secretaría de Agricultura y Desarrollo Rural': '#E67E22',
    'Secretaría de Bienestar e Inclusión Social': '#2ECC71',
    'Secretaría de Contraloría': '#1ABC9C',
    'Secretaría de Cultura': '#3498DB',
    'Secretaría de Desarrollo Económico': '#E74C3C',
    'Secretaría de Educación Pública': '#8E44AD',
    'Secretaría de Gobierno': '#27AE60',
    'Secretaría de Hacienda': '#D35400',
    'Secretaría de Infraestructura Pública y Desarrollo Urbano Sostenible': '#2980B9',
    'Secretaría de Medio Ambiente y Recursos Naturales de Hidalgo': '#16A085',
    'Secretaría de Movilidad y Transporte': '#C0392B',
    'Secretaría de Salud': '#7F8C8D',
    'Secretaría de Seguridad Pública del Estado de Hidalgo': '#2C3E50',
    'Secretaría de Turismo': '#F39C12',
    'Secretaría del Trabajo y Previsión Social': '#BDC3C7',
    'Unidad de Planeación y Prospectiva': '#34495E',
  };
    return colors[nombres] || '#CCCCCC';
}


const ctx2 = document.getElementById('dependencia_grafica').getContext('2d');

new Chart(ctx2, {
    type: 'treemap',
    data: {
        datasets: [
            {
            tree: [
                {g: 'DIF Hidalgo', v: 48},
                {g: 'Despacho del Gobernador', v: 17},
                {g: 'Oficialía Mayor', v: 70},
                {g: 'Otra', v: 86},
                {g: 'Procuraduría General de Justicia del Estado de Hidalgo', v: 171},
                {g: 'Secretaría de Agricultura y Desarrollo Rural', v: 10},
                {g: 'Secretaría de Bienestar e Inclusión Social', v: 19},
                {g: 'Secretaría de Contraloría', v: 17},
                {g: 'Secretaría de Cultura', v: 11},
                {g: 'Secretaría de Desarrollo Económico', v: 74},
                {g: 'Secretaría de Educación Pública', v: 28},
                {g: 'Secretaría de Gobierno', v: 192},
                {g: 'Secretaría de Hacienda', v: 204},
                {g: 'Secretaría de Infraestructura Pública y Desarrollo Urbano Sostenible', v: 72},
                {g: 'Secretaría de Medio Ambiente y Recursos Naturales de Hidalgo', v: 127},
                {g: 'Secretaría de Movilidad y Transporte', v: 71},
                {g: 'Secretaría de Salud', v: 2},
                {g: 'Secretaría de Seguridad Pública del Estado de Hidalgo', v: 7},
                {g: 'Secretaría de Turismo', v: 10},
                {g: 'Secretaría del Trabajo y Previsión Social', v: 76},
                {g: 'Unidad de Planeación y Prospectiva', v: 77},
            ],
            key: 'v',          
            groups: ['g'],  
            borderColor: 'green',
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
