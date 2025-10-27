// Primera pestaña
contenedor_dependencia_grafica = document.getElementById('dependencia_grafica');
contenedor_edad_grafica = document.getElementById('edad_grafica');
contenedor_genero_grafica = document.getElementById('genero_grafica');
contenedor_discapacidad_grafica = document.getElementById('discapacidad_grafica');

// Segunda pestaña
contenedor_medios_transporte_grafica = document.getElementById('medios_transporte_grafica');








// Ocultamos inicialmente 
// Segunda pestaña
contenedor_medios_transporte_grafica.style.display = 'none';

document.querySelectorAll('.pill input[type="radio"]').forEach(r => {
    r.addEventListener('change', () => {
        switch (r.value) {
            case "1":
                // console.log('Seleccionado:', r.value);

                // Mostrar las gráficas de la primera pestaña
                contenedor_dependencia_grafica.style.display = 'block';
                contenedor_edad_grafica.style.display = 'block';
                contenedor_genero_grafica.style.display = 'block';
                contenedor_discapacidad_grafica.style.display = 'block';

                contenedor_medios_transporte_grafica.style.display = 'none';
                
                
                break;
            case "2":
                // console.log('Seleccionado:', r.value);

                // Ocultar las gráficas de la primera pestaña
                contenedor_dependencia_grafica.style.display = 'none';
                contenedor_edad_grafica.style.display = 'none';
                contenedor_genero_grafica.style.display = 'none';
                contenedor_discapacidad_grafica.style.display = 'none';

                // Mostrar la gráfica de la segunda pestaña
                contenedor_medios_transporte_grafica.style.display = 'block';
                break;
            case "3":
                //console.log('Seleccionado:', r.value);

                // Ocultar las gráficas de la primera pestaña
                contenedor_dependencia_grafica.style.display = 'none';
                contenedor_edad_grafica.style.display = 'none';
                contenedor_genero_grafica.style.display = 'none';
                contenedor_discapacidad_grafica.style.display = 'none';

                // Ocualtar la gráfica de la segunda pestaña
                contenedor_medios_transporte_grafica.style.display = 'none';
                break;
            case "4":
                //console.log('Seleccionado:', r.value);

                // Ocultar las gráficas de la primera pestaña
                contenedor_dependencia_grafica.style.display = 'none';
                contenedor_edad_grafica.style.display = 'none';
                contenedor_genero_grafica.style.display = 'none';
                contenedor_discapacidad_grafica.style.display = 'none';

                // Ocualtar la gráfica de la segunda pestaña
                contenedor_medios_transporte_grafica.style.display = 'none';
                break;
            default:
                console.log('Valor no reconocido:', r.value);
                break;
        }
    });
});