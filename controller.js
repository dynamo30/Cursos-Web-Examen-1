// controller.js - Conecta el Modelo con la Vista

// 1. Esperar a que todo el HTML de la Vista esté cargado
document.addEventListener("DOMContentLoaded", function() {
    
    // 2. Obtener el contenedor de la Vista donde mostraremos los cursos
    const contenedor = document.getElementById("catalogo-cursos");
    const buscarInput = document.getElementById("buscar-curso");
    const buscarBtn = document.getElementById("btn-buscar");
    
    // 3. Función para mostrar los cursos en la Vista
    function mostrarCursos(cursosAMostrar) {
        // Limpiar el contenedor
        contenedor.innerHTML = "";
        
        // Si no hay cursos que mostrar
        if (cursosAMostrar.length === 0) {
            contenedor.innerHTML = "<p class='no-resultados'>No se encontraron cursos</p>";
            return;
        }
        
        // Recorrer los datos del Modelo (el array 'cursos' de model.js)
        cursosAMostrar.forEach(curso => {
            
            // 4. Por cada curso, crear una tarjeta HTML
            const tarjeta = document.createElement("div");
            tarjeta.className = "curso-card"; // Asignar clase CSS
            tarjeta.dataset.id = curso.id; // Guardar el ID del curso

            // Llenar la tarjeta con la información del curso del Modelo
            tarjeta.innerHTML = `
                <img src="${curso.imagen}" alt="Imagen del curso">
                <h3>${curso.nombre}</h3>
                <p>Prof: ${curso.profesor}</p>
            `;

            // 5. Agregar la tarjeta recién creada a la Vista (dentro del contenedor)
            contenedor.appendChild(tarjeta);
        });
    }
    
    // Función para buscar cursos
    function buscarCursos(termino) {
        termino = termino.toLowerCase().trim();
        if (termino === "") {
            return cursos; // Devolver todos los cursos si no hay término de búsqueda
        }
        return cursos.filter(curso => 
            curso.nombre.toLowerCase().includes(termino) || 
            curso.profesor.toLowerCase().includes(termino)
        );
    }
    
    // Evento para el botón de búsqueda
    buscarBtn.addEventListener("click", function() {
        const resultados = buscarCursos(buscarInput.value);
        mostrarCursos(resultados);
    });
    
    // Evento para buscar al presionar Enter
    buscarInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            const resultados = buscarCursos(buscarInput.value);
            mostrarCursos(resultados);
        }
    });
    
    // Mostrar todos los cursos al cargar la página
    mostrarCursos(cursos);
});