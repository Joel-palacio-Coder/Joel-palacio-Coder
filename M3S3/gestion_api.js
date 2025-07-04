document.addEventListener('DOMContentLoaded', function() {
  // API Configuration
  const apiUrl = 'http://localhost:3000/products';
  
  // DOM Elements
  const productForm = document.getElementById('productForm');
  const productList = document.getElementById('productList');
  const notification = document.getElementById('notification');
  const submitBtn = document.getElementById('submitBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const searchInput = document.getElementById('searchInput');
  
  // State Variables
  let isEditing = false;
  let currentProductId = null;
  let allProducts = [];
  
  // Initialize the app
  initApp();
  
  // Event Listeners
  productForm.addEventListener('submit', handleFormSubmit);
  cancelBtn.addEventListener('click', resetForm);
  searchInput.addEventListener('input', handleSearch);
  
  // Initialize the application
  function initApp() {
    fetchProducts();
  }
  
  // Fetch all products
  function fetchProducts() {
    showLoadingState();
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then(products => {
        allProducts = products;
        displayProducts(products);
      })
      .catch(error => {
        showNotification('Error fetching products: ' + error.message, 'error');
      });
  }
  
  // Display products in the grid
  function displayProducts(products) {
    if (products.length === 0) {
      productList.innerHTML = '<div class="noProducts">No products found. Add your first product!</div>';
      return;
    }
    
    productList.innerHTML = '';
    
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'productCard';
      
      // Determine stock status
      let stockStatus = 'inStock';
      let stockText = `${product.productStock} in stock`;
      
      if (product.productStock <= 0) {
        stockStatus = 'outOfStock';
        stockText = 'Out of stock';
      } else if (product.productStock <= 10) {
        stockStatus = 'lowStock';
        stockText = `Low stock (${product.productStock})`;
      }
      
      // Product image or placeholder
      const imageUrl = product.productImage || 'https://via.placeholder.com/300x180?text=No+Image';
      
      productCard.innerHTML = `
        <div class="productImage" style="background-image: url('${imageUrl}')"></div>
        <div class="productContent">
          <h3 class="productTitle">${product.productName}</h3>
          <span class="productCategory">${product.productCategory}</span>
          <div class="productPrice">$${product.productPrice.toFixed(2)}</div>
          <div class="productStock ${stockStatus}">
            <i class="fas fa-box"></i> ${stockText}
          </div>
          <p class="productDescription">${product.productDescription}</p>
          <div class="productActions">
            <button class="actionButton editButton" data-id="${product.id}">
              <i class="fas fa-edit"></i> Edit
            </button>
            <button class="actionButton deleteButton" data-id="${product.id}">
              <i class="fas fa-trash"></i> Delete
            </button>
          </div>
        </div>
      `;
      
      productList.appendChild(productCard);
    });
    
    // Add event listeners to action buttons
    document.querySelectorAll('.editButton').forEach(btn => {
      btn.addEventListener('click', () => editProduct(btn.dataset.id));
    });
    
    document.querySelectorAll('.deleteButton').forEach(btn => {
      btn.addEventListener('click', () => deleteProduct(btn.dataset.id));
    });
  }
  
  // Handle form submission
  function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const productData = {
      productName: document.getElementById('productName').value.trim(),
      productPrice: parseFloat(document.getElementById('productPrice').value),
      productCategory: document.getElementById('productCategory').value,
      productStock: parseInt(document.getElementById('productStock').value),
      productDescription: document.getElementById('productDescription').value.trim(),
      productImage: document.getElementById('productImage').value.trim() || null
    };
    
    // Validate form
    if (!validateProduct(productData)) {
      return;
    }
    
    if (isEditing) {
      updateProduct(currentProductId, productData);
    } else {
      createProduct(productData);
    }
  }
  
  // Validate product data
  function validateProduct(product) {
    if (!product.productName) {
      showNotification('Product name is required', 'error');
      return false;
    }
    
    if (isNaN(product.productPrice) || product.productPrice <= 0) {
      showNotification('Please enter a valid price', 'error');
      return false;
    }
    
    if (!product.productCategory) {
      showNotification('Please select a category', 'error');
      return false;
    }
    
    if (isNaN(product.productStock)) {
      showNotification('Please enter a valid stock quantity', 'error');
      return false;
    }
    
    if (!product.productDescription) {
      showNotification('Product description is required', 'error');
      return false;
    }
    
    return true;
  }
  
  // Create a new product
  function createProduct(productData) {
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to create product');
        }
        return response.json();
      })
      .then(() => {
        showNotification('Product created successfully!', 'success');
        resetForm();
        fetchProducts();
      })
      .catch(error => {
        showNotification('Error creating product: ' + error.message, 'error');
      });
  }
  
  // Edit product
  function editProduct(productId) {
    const product = allProducts.find(p => p.id == productId);
    
    if (!product) {
      showNotification('Product not found', 'error');
      return;
    }
    
    // Set form values
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.productName;
    document.getElementById('productPrice').value = product.productPrice;
    document.getElementById('productCategory').value = product.productCategory;
    document.getElementById('productStock').value = product.productStock;
    document.getElementById('productDescription').value = product.productDescription;
    document.getElementById('productImage').value = product.productImage || '';
    
    // Update UI for editing
    isEditing = true;
    currentProductId = productId;
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Product';
    
    // Scroll to form
    document.querySelector('.productFormSection').scrollIntoView({ behavior: 'smooth' });
  }
  
  // Update product
  function updateProduct(productId, productData) {
    fetch(`${apiUrl}/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update product');
        }
        return response.json();
      })
      .then(() => {
        showNotification('Product updated successfully!', 'success');
        resetForm();
        fetchProducts();
      })
      .catch(error => {
        showNotification('Error updating product: ' + error.message, 'error');
      });
  }
  
  // Delete product
  function deleteProduct(productId) {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }
    
    fetch(`${apiUrl}/${productId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete product');
        }
        return response.json();
      })
      .then(() => {
        showNotification('Product deleted successfully!', 'success');
        fetchProducts();
      })
      .catch(error => {
        showNotification('Error deleting product: ' + error.message, 'error');
      });
  }
  
  // Reset form
  function resetForm() {
    productForm.reset();
    isEditing = false;
    currentProductId = null;
    submitBtn.innerHTML = '<i class="fas fa-plus"></i> Add Product';
  }
  
  // Handle search
  function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (!searchTerm) {
      displayProducts(allProducts);
      return;
    }
    
    const filteredProducts = allProducts.filter(product => 
      product.productName.toLowerCase().includes(searchTerm) ||
      product.productDescription.toLowerCase().includes(searchTerm) ||
      product.productCategory.toLowerCase().includes(searchTerm)
    );
    
    displayProducts(filteredProducts);
  }
  
  // Show notification
  function showNotification(message, type) {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    
    setTimeout(() => {
      notification.className = 'notification';
      notification.textContent = '';
    }, 3000);
  }
  
  // Show loading state
  function showLoadingState() {
    productList.innerHTML = `
      <div class="loadingState">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Loading products...</p>
      </div>
    `;
  }
});