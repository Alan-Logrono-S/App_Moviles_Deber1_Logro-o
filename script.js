document.getElementById('notaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const b1Input = document.getElementById('bimestre1');
    const b2Input = document.getElementById('bimestre2');
    const b1 = parseFloat(b1Input.value);
    const b2 = parseFloat(b2Input.value);
    const resultadoDiv = document.getElementById('resultado');

    resultadoDiv.className = '';

    // Validar campos vacíos
    if (b1Input.value === '' || b2Input.value === '') {
        alert('Por favor, complete ambos campos de nota antes de calcular.');
        return;
    }

    // Validar rango permitido
    if (isNaN(b1) || isNaN(b2) || b1 < 0 || b1 > 20 || b2 < 0 || b2 > 20) {
        resultadoDiv.textContent = 'Por favor, ingrese notas válidas entre 0 y 20.';
        resultadoDiv.classList.add('error');
        return;
    }
// Validación en tiempo real para los campos de nota
['bimestre1', 'bimestre2'].forEach(function(id) {
    const input = document.getElementById(id);
    input.addEventListener('input', function() {
        let val = parseFloat(input.value);
        if (input.value !== '' && (isNaN(val) || val < 0)) {
            input.value = 0;
        } else if (val > 20) {
            input.value = 20;
        }
    });
});

    const total = b1 + b2;
    let mensaje = `Nota Total: ${total.toFixed(2)} / 40\n`;
    if (total >= 28) {
        mensaje += 'Estado: APRUEBA ✅';
        resultadoDiv.classList.add('aprobado');
    } else {
        mensaje += 'Estado: SUPLETORIO ⚠️\n';
        const necesario = 28 - total;
        resultadoDiv.classList.add('supletorio');
        if (necesario > 24) {
            mensaje += `No es posible aprobar en supletorio (máximo 24 puntos).`;
        } else {
            mensaje += `Necesita ${necesario.toFixed(2)} / 24 en el supletorio para aprobar.`;
        }
    }
    resultadoDiv.textContent = mensaje;
});
