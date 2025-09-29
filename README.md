# Product Catalog React App

A simple React application to manage a product catalog with features to add, edit, delete, filter, and sort products by category and price.

---

## How to Run This Project

### Prerequisites

- Node.js and npm installed on your machine
<<<<<<< HEAD
- MongoDB runs properly on your system
=======
>>>>>>> 5404a098784ca0ebfbc5d84569aa6b62bee5615a
- Backend API running at `http://localhost:5000/products` with standard REST endpoints (`GET`, `POST`, `PUT`, `DELETE`)

### Steps to Run

1. Clone or download the project repository.

2. Open a terminal in the project directory(backend).
    cd backend
    npm install
    npm run start

3. Open a terminal in the project directory(frontend).
    cd e-commerce
    npm install
    npm run dev

---

## Features

- Display list of products fetched from a backend API
- Add new products with name, price, and category
- Edit existing products with inline form population. When clicked on edit the form will be filled automatically of current values so you will have to update from that form only.
- Delete products with confirmation prompt
- Filter products by category (Books, Clothes, Electronics, Groceries, Other)
- Sort products by price (Low to High, High to Low)
- Responsive and clean user interface with CSS styling

---

## Categories

- Books
- Clothes
- Electronics
- Groceries
- Other

---

## Usage Overview

- Use the filter dropdown to display products from a specific category or all products.
- Use the sort dropdown to order products by price ascending or descending.
- Add products using the form at the top by entering name, price, and selecting a category.
- Edit products by clicking the "Edit" button; form fields will fill with product details for modification.
- Update or cancel the edit using the respective buttons.
- Delete products by clicking the "Delete" button with a confirmation prompt.

---
