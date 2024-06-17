document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/api/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(users => {
            console.log('Datos de usuarios recibidos:', users);
            const userTableBody = document.getElementById('userTable');
            userTableBody.innerHTML = '';

            users.forEach(user => {
                const row = document.createElement('tr');

                // Verificar que los datos del usuario estén disponibles
                if (user.cedula && user.nombre && user.apellido && user.edad && user.genero && user.correo && user.celular && user.tipoRH) {
                    row.innerHTML = `
                        <td>${user.cedula}</td>
                        <td>${user.nombre}</td>
                        <td>${user.apellido}</td>
                        <td>${user.edad}</td>
                        <td>${user.genero}</td>
                        <td>${user.correo}</td>
                        <td>${user.celular}</td>
                        <td>${user.tipoRH}</td>
                        <td>
                            <button onclick="validateUser(${user.id})">Validar</button>
                            <button onclick="editUser(${user.id})">Editar</button>
                            <button onclick="deleteUser(${user.id})">Eliminar</button>
                        </td>
                    `;
                } else {
                    // En caso de datos faltantes, mostrar un mensaje de error en la fila
                    row.innerHTML = `<td colspan="10">Error: Datos incompletos</td>`;
                }

                userTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            const userTableBody = document.getElementById('userTable');
            userTableBody.innerHTML = '<tr><td colspan="10">Error al cargar los usuarios</td></tr>';
        });
});
