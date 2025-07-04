# Product Manager Application

A simple and responsive web application for managing product inventory. Users can create, read, update, and delete (CRUD) product entries. The UI is clean and functional, built with HTML, CSS, and JavaScript, using a mock JSON server for the backend.

## 🧱 Tech Stack

- **HTML5** — markup structure
- **CSS3** — styled with modern responsive design
- **JavaScript (Vanilla)** — logic and DOM interaction
- **JSON Server** — local API for product data

## 📁 File Structure
```bash
├── Mananger_product.html # Main HTML structure
├── jr.css # Custom CSS styles
├── gestion_api.js # JavaScript logic for CRUD operations
└── db.json # JSON server mock database
```
## 🚀 How to Run the Project

### 1. Clone the project

```
git clone https://your-repo-url
```
For at you project.
```
cd your-project-folder
```
### 2. Install JSON Server (if not already installed)
```
npm install -g json-server
```
### 3. Start the JSON server
```
json-server --watch db.json --port 3000
```
### 4. Open the HTML file

Open Mananger_product.html directly in your browser.

⚠️ Make sure your browser allows requests to http://localhost:3000. You can also run a local web server (e.g., Live Server) for best results.

✨ Features
✅ Add new products with name, price, category, stock, image URL, and description.

🔄 Update existing products with the form.

❌ Delete products with confirmation.

🔍 Real-time search in the product list.

📦 Stock indicator shows if items are low or out of stock.

🔔 Notification system for success and error feedback.

🧠 Code Overview
HTML (Mananger_product.html)
Defines the page layout: header, product form, inventory list, and footer.

Links to the stylesheet and JavaScript file.

Uses font-awesome for icons.

## CSS (jr.css)
Variables for consistent theming.

Responsive grid layout and flexbox usage.

Styling for form controls, buttons, product cards, and notifications.

## JavaScript (gestion_api.js)
Loads product data from db.json using fetch().

Implements form handling (add/edit), product filtering, and notification display.

Connects actions (edit, delete) with the backend API.

## JSON (db.json)
```
  "products": []
}
```
The mock database used by json-server.

Automatically updates when adding/editing products.

