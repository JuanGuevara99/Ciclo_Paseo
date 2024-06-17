document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const registrationStatus = document.getElementById('registration-status');

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener valores del formulario
        const cedula = document.getElementById('cedula').value;
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const edad = document.getElementById('edad').value;
        const genero = document.getElementById('genero').value;
        const correo = document.getElementById('correo').value;
        const celular = document.getElementById('celular').value;
        const tipoRH = document.getElementById('tipoRH').value;

        // Construir objeto con los datos del usuario
        const userData = {
            cedula,
            nombre,
            apellido,
            edad,
            genero,
            correo,
            celular,
            tipoRH
        };

        // Enviar los datos al servidor
        fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.error && data.error.code === 'ER_DUP_ENTRY') {
                registrationStatus.innerHTML = '<p>El correo electrónico ya está registrado. Por favor, usa otro correo electrónico.</p>';
            } else {
                registrationStatus.innerHTML = '<p>Registro exitoso. Pronto recibirás más información sobre el evento.</p>';
                registrationForm.reset(); // Limpiar formulario después de enviar
            }
        })
        .catch(error => {
            registrationStatus.innerHTML = '<p>Error al registrar. Por favor, inténtalo nuevamente.</p>';
            console.error('Error:', error);
        });
    });
});
