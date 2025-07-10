 // Paso 2: Captura y almacenamiento de datos

        // Selección de elementos del DOM
        const userForm = document.getElementById('userForm');
        const nameInput = document.getElementById('name');
        const ageInput = document.getElementById('age');
        const saveBtn = document.getElementById('saveBtn');
        const clearBtn = document.getElementById('clearBtn');
        const storedData = document.getElementById('storedData');
        const counterDisplay = document.getElementById('counter');
        const nameError = document.getElementById('nameError');
        const ageError = document.getElementById('ageError');
        
        // Variables para el contador de interacciones
        let interactionCount = 0;
        
        // Función para incrementar y mostrar el contador de interacciones
        function updateInteractionCounter() {
            interactionCount++;
            sessionStorage.setItem('interactionCount', interactionCount);
            counterDisplay.textContent = interactionCount;
            console.log(`Interacción #${interactionCount} registrada en Session Storage`);
        }
        
        // Función para validar los datos del formulario
        function validateForm() {
            let isValid = true;
            nameError.textContent = '';
            ageError.textContent = '';
            
            // Validar nombre
            if (!nameInput.value.trim()) {
                nameError.textContent = 'Por favor ingrese su nombre';
                isValid = false;
            }
            
            // Validar edad
            if (!ageInput.value) {
                ageError.textContent = 'Por favor ingrese su edad';
                isValid = false;
            } else if (ageInput.value < 1 || ageInput.value > 120) {
                ageError.textContent = 'Por favor ingrese una edad válida (1-120)';
                isValid = false;
            }
            
            return isValid;
        }
        
        // Función para guardar datos en Local Storage
        function saveUserData() {
            if (!validateForm()) return;
            
            const userData = {
                name: nameInput.value.trim(),
                age: ageInput.value
            };
            
            // Guardar en Local Storage como cadena JSON
            localStorage.setItem('userData', JSON.stringify(userData));
            console.log('Datos guardados en Local Storage:', userData);
            
            // Mostrar los datos guardados
            displayStoredData();
            
            // Limpiar el formulario
            nameInput.value = '';
            ageInput.value = '';
            
            // Registrar interacción
            updateInteractionCounter();
        }
        
        // Función para mostrar los datos almacenados
        function displayStoredData() {
            const storedDataJSON = localStorage.getItem('userData');
            
            if (storedDataJSON) {
                const userData = JSON.parse(storedDataJSON);
                storedData.innerHTML = `
                    <strong>Nombre:</strong> ${userData.name}<br>
                    <strong>Edad:</strong> ${userData.age}
                `;
                console.log('Datos recuperados de Local Storage:', userData);
            } else {
                storedData.textContent = 'No hay información almacenada.';
                console.log('No se encontraron datos en Local Storage');
            }
        }
        
        // Función para limpiar los datos almacenados
        function clearStoredData() {
            localStorage.removeItem('userData');
            storedData.textContent = 'No hay información almacenada.';
            console.log('Datos eliminados de Local Storage');
            
            // Registrar interacción
            updateInteractionCounter();
        }
        
        // Paso 3: Recuperar y mostrar datos al cargar la página
        document.addEventListener('DOMContentLoaded', () => {
            // Mostrar datos almacenados al cargar
            displayStoredData();
            
            // Inicializar contador de interacciones desde Session Storage
            const storedCount = sessionStorage.getItem('interactionCount');
            if (storedCount) {
                interactionCount = parseInt(storedCount);
                counterDisplay.textContent = interactionCount;
            }
            console.log('Contador de interacciones inicializado:', interactionCount);
            
            // Registrar la carga de página como interacción
            updateInteractionCounter();
        });
        
        // Paso 4: Event listeners para los botones
        saveBtn.addEventListener('click', () => {
            saveUserData();
        });
        
        clearBtn.addEventListener('click', () => {
            clearStoredData();
        });
        
        // Registrar interacción cuando se modifica algún campo
        userForm.addEventListener('input', () => {
            updateInteractionCounter();
        });