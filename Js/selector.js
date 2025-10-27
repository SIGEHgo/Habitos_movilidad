// Primera pestaña
contenedor_dependencia_grafica = document.getElementById('dependencia_grafica');
contenedor_edad_grafica = document.getElementById('edad_grafica');
contenedor_genero_grafica = document.getElementById('genero_grafica');
contenedor_discapacidad_grafica = document.getElementById('discapacidad_grafica');

// Segunda pestaña
contenedor_medios_transporte_grafica = document.getElementById('medios_transporte_grafica');
contenedor_frecuencia_viajes_grafica = document.getElementById('frecuencia_viajes_grafica');
contenedor_viajes_intermedios_grafica = document.getElementById('viajes_intermedios_grafica');
contenedor_gasto_mensual_grafica = document.getElementById('gasto_mensual_grafica');

// Tercera pestaña
contenedor_transporte_elegir_hogarT_grafica = document.getElementById('transporte_elegir_hogarT_grafica');
contenedor_tiempo_hogarT_grafica = document.getElementById('tiempo_hogarT_grafica');
contenedor_accesibilidad_hogarT_grafica = document.getElementById('accesibilidad_hogarT_grafica');
contenedor_horarios_hogarT_grafica = document.getElementById('horarios_hogarT_grafica');

// Cuarta pestaña
contenedor_transporte_elegir_trabajoH_grafica = document.getElementById('transporte_elegir_trabajoH_grafica');
contenedor_tiempo_trabajoH_grafica = document.getElementById('tiempo_trabajoH_grafica');
contenedor_accesibilidad_trabajoH_grafica = document.getElementById('accesibilidad_trabajoH_grafica');
contenedor_horarios_trabajoH_grafica = document.getElementById('horarios_trabajoH_grafica');




////////////////////////////
// Ocultamos inicialmente // 
////////////////////////////

// Segunda pestaña
contenedor_medios_transporte_grafica.style.display = 'none';
contenedor_frecuencia_viajes_grafica.style.display = 'none';
contenedor_viajes_intermedios_grafica.style.display = 'none';
contenedor_gasto_mensual_grafica.style.display = 'none';

// Tercera pestaña
contenedor_transporte_elegir_hogarT_grafica.style.display = 'none';
contenedor_tiempo_hogarT_grafica.style.display = 'none';
contenedor_accesibilidad_hogarT_grafica.style.display = 'none';
contenedor_horarios_hogarT_grafica.style.display = 'none';

// Cuarta pestaña
contenedor_transporte_elegir_trabajoH_grafica.style.display = 'none';
contenedor_tiempo_trabajoH_grafica.style.display = 'none';
contenedor_accesibilidad_trabajoH_grafica.style.display = 'none';
contenedor_horarios_trabajoH_grafica.style.display = 'none';

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


                // Ocultar las gráficas de la segunda pestaña
                contenedor_medios_transporte_grafica.style.display = 'none';
                contenedor_frecuencia_viajes_grafica.style.display = 'none';
                contenedor_viajes_intermedios_grafica.style.display = 'none';
                contenedor_gasto_mensual_grafica.style.display = 'none';

                // Ocultar la gráfica de la tercera pestaña
                contenedor_transporte_elegir_hogarT_grafica.style.display = 'none';
                contenedor_tiempo_hogarT_grafica.style.display = 'none';
                contenedor_accesibilidad_hogarT_grafica.style.display = 'none';
                contenedor_horarios_hogarT_grafica.style.display = 'none';

                // Ocultar la gráfica de la cuarta pestaña
                contenedor_transporte_elegir_trabajoH_grafica.style.display = 'none';
                contenedor_tiempo_trabajoH_grafica.style.display = 'none';
                contenedor_accesibilidad_trabajoH_grafica.style.display = 'none';
                contenedor_horarios_trabajoH_grafica.style.display = 'none';

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
                contenedor_frecuencia_viajes_grafica.style.display = 'block';
                contenedor_viajes_intermedios_grafica.style.display = 'block';
                contenedor_gasto_mensual_grafica.style.display = 'block';

                // Ocultar la gráfica de la tercera pestaña
                contenedor_transporte_elegir_hogarT_grafica.style.display = 'none';
                contenedor_tiempo_hogarT_grafica.style.display = 'none';
                contenedor_accesibilidad_hogarT_grafica.style.display = 'none';
                contenedor_horarios_hogarT_grafica.style.display = 'none';

                // Ocultar la gráfica de la cuarta pestaña
                contenedor_transporte_elegir_trabajoH_grafica.style.display = 'none';
                contenedor_tiempo_trabajoH_grafica.style.display = 'none';
                contenedor_accesibilidad_trabajoH_grafica.style.display = 'none';
                contenedor_horarios_trabajoH_grafica.style.display = 'none';


                break;
            case "3":
                //console.log('Seleccionado:', r.value);

                // Ocultar las gráficas de la primera pestaña
                contenedor_dependencia_grafica.style.display = 'none';
                contenedor_edad_grafica.style.display = 'none';
                contenedor_genero_grafica.style.display = 'none';
                contenedor_discapacidad_grafica.style.display = 'none';

                // Ocultar la gráfica de la segunda pestaña
                contenedor_medios_transporte_grafica.style.display = 'none';
                contenedor_frecuencia_viajes_grafica.style.display = 'none';
                contenedor_viajes_intermedios_grafica.style.display = 'none';
                contenedor_gasto_mensual_grafica.style.display = 'none';

                // Mostrar la gráfica de la tercera pestaña
                contenedor_transporte_elegir_hogarT_grafica.style.display = 'block';
                contenedor_tiempo_hogarT_grafica.style.display = 'block';
                contenedor_accesibilidad_hogarT_grafica.style.display = 'block';
                contenedor_horarios_hogarT_grafica.style.display = 'block';

                // Ocultar la gráfica de la cuarta pestaña
                contenedor_transporte_elegir_trabajoH_grafica.style.display = 'none';
                contenedor_tiempo_trabajoH_grafica.style.display = 'none';
                contenedor_accesibilidad_trabajoH_grafica.style.display = 'none';
                contenedor_horarios_trabajoH_grafica.style.display = 'none';



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
                contenedor_frecuencia_viajes_grafica.style.display = 'none';
                contenedor_viajes_intermedios_grafica.style.display = 'none';
                contenedor_gasto_mensual_grafica.style.display = 'none';

                // Ocultar la gráfica de la tercera pestaña
                contenedor_transporte_elegir_hogarT_grafica.style.display = 'none';
                contenedor_tiempo_hogarT_grafica.style.display = 'none';
                contenedor_accesibilidad_hogarT_grafica.style.display = 'none';
                contenedor_horarios_hogarT_grafica.style.display = 'none';

                // Mostrar la gráfica de la cuarta pestaña
                contenedor_transporte_elegir_trabajoH_grafica.style.display = 'block';
                contenedor_tiempo_trabajoH_grafica.style.display = 'block';
                contenedor_accesibilidad_trabajoH_grafica.style.display = 'block';
                contenedor_horarios_trabajoH_grafica.style.display = 'block';


                break;
            default:
                console.log('Valor no reconocido:', r.value);
                break;
        }
    });
});