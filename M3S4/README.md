# Interactive Interface with Data Persistence
## Project Description
This project demonstrates a web interface that allows users to store and retrieve personal data using browser storage mechanisms. It implements Local Storage for persistent data storage and Session Storage for session-based interaction tracking.

## Features
- User Data Collection: Form to capture name and age with validation.
- Data Persistence: Stores user data in Local Storage (persists after browser close).
- Session Tracking: Counts user interactions using Session Storage (resets when tab closes).
- Data Management: Option to clear stored data.
- Responsive Design: Clean, modern interface with gradient backgrounds
- Real-time Feedback: Immediate validation and data display.
## Technologies Used

- HTML5

- CSS3 (with radial gradients)

- JavaScript (ES6)

- Web Storage API:

- Local Storage

- Session Storage

## File Structure
```
interactive-interface/
├── interfaz_interactiva_con_persistencia.html  # Main HTML file
├── style.css                                   # Styles with modern gradients
├── main.js                                     # Core functionality
```
## Installation & Usage
1. Clone or download the repository

2. Open `interfaz_interactiva_con_persistencia.html` in any modern browser

3. Fill in the form with:
- Name (text)

- Age (number between 1-120)

4. Click "Guardar Datos" (Save Data) to store information

5. View stored data in the output section

6. Track your interactions in the session counter

7. Use "Limpiar Datos" (Clear Data) to remove stored information

## Key Functionality
### Data Storage
```
// Save to Local Storage
localStorage.setItem('userData', JSON.stringify(userData));

// Retrieve from Local Storage
const userData = JSON.parse(localStorage.getItem('userData'));
```
### Session Tracking
```
// Update interaction counter
sessionStorage.setItem('interactionCount', interactionCount);
```
### Form Validation
```
function validateForm() {
    // Validates name presence and age range (1-120)
    // Provides real-time error messages
}
```
## Browser Compatibility
Tested and works on:

- Chrome (latest)

- Firefox (latest)

- Edge (latest)

- Safari (latest)

- Screenshots


