document.querySelectorAll('.pill input[type="radio"]').forEach(r => {
    r.addEventListener('change', () => {
        console.log('Seleccionado:', r.value);
    });
});