/**
 * Data Management with Objects, Sets and Maps in JavaScript
 * 
 * This program demonstrates the use of advanced data structures in JavaScript:
 * - Objects for storing product information
 * - Sets for ensuring unique products
 * - Maps for adding additional product categories
 */

// Step 1: Create a products object
const products = {
    1: { id: 1, name: "Laptop", price: 1500 },
    2: { id: 2, name: "Mouse", price: 25 },
    3: { id: 3, name: "Keyboard", price: 50 }
};

// Validate that all products have required properties
function validateProduct(product) {
    if (!product.id || !product.name || !product.price) {
        console.error(`Invalid product: Missing required properties for product ${product.id}`);
        return false;
    }
    if (typeof product.price !== 'number' || product.price <= 0) {
        console.error(`Invalid product: Price must be a positive number for product ${product.id}`);
        return false;
    }
    return true;
}

// Step 2: Convert object to Set to ensure uniqueness
// We'll create a Set of product names to demonstrate uniqueness
const uniqueProducts = new Set(
    Object.values(products)
        .filter(validateProduct)
        .map(product => product.name)
);

// Step 3: Create a Map for product categories
const productCategories = new Map();
productCategories.set("Electronics", "Laptop");
productCategories.set("Accessories", "Mouse");
productCategories.set("Accessories", "Keyboard"); // Note: This will overwrite the previous "Accessories" entry

// Alternative approach to store all products by category
const productsByCategory = new Map();
productsByCategory.set("Electronics", ["Laptop"]);
productsByCategory.set("Accessories", ["Mouse", "Keyboard"]);

// Step 4: Iterate through data structures

// 4.1: Using for...in to iterate through the products object
console.log("=== Products Object ===");
for (const productId in products) {
    if (products.hasOwnProperty(productId)) {
        const product = products[productId];
        console.log(`Product ID: ${productId}, Details:`, product);
    }
}

// 4.2: Using for...of to iterate through the Set
console.log("\n=== Unique Products Set ===");
for (const productName of uniqueProducts) {
    console.log("Unique product:", productName);
}

// 4.3: Using forEach to iterate through the Map
console.log("\n=== Product Categories Map ===");
productCategories.forEach((product, category) => {
    console.log(`Category: ${category}, Product: ${product}`);
});

// Additional demonstration of Object methods
console.log("\n=== Object Methods Demonstration ===");
console.log("Product IDs (Object.keys):", Object.keys(products));
console.log("Product Details (Object.values):", Object.values(products));
console.log("Product Entries (Object.entries):", Object.entries(products));

// Display all products by category
console.log("\n=== Products by Category ===");
productsByCategory.forEach((products, category) => {
    console.log(`Category: ${category}`);
    products.forEach(product => console.log(` - ${product}`));
});