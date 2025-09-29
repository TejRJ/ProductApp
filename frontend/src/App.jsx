import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/products';

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', category: '' });
  const [filter, setFilter] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [sort, setSort] = useState('');

  const fetchProducts = async () => {
    try {
      let url = API_URL;
      if (filter) url += `?category=${filter}`;
      const res = await axios.get(url);
      let data = res.data;

      if (sort === 'low') data.sort((a, b) => a.price - b.price);
      if (sort === 'high') data.sort((a, b) => b.price - a.price);

      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filter, sort]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category) return;
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ name: '', price: '', category: '' });
      fetchProducts();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = product => {
    setForm(product);
    setEditingId(product._id);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
  };

  const handleCancel = () => {
    setForm({ name: '', price: '', category: '' });
    setEditingId(null);
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="title">Product Catalog</h2>

      <div className="form-container">
        <p>Form</p>
        <form onSubmit={handleSubmit} className="form">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Books">Books</option>
            <option value="Clothes">Clothes</option>
            <option value="Electronics">Electronics</option>
            <option value="Groceries">Groceries</option>
            <option value="Other">Other</option>
          </select>
          <div className="form-buttons">
            <button
              type="submit"
              disabled={!form.name || !form.price || !form.category}
            >
              {editingId ? 'Update' : 'Add Product'}
            </button>
            {editingId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="filter-sort-container">
        <p>Filter and Sort</p>
        <div className="filters">
          <select onChange={e => setFilter(e.target.value)} value={filter}>
            <option value="">All Categories</option>
            <option value="Books">Books</option>
            <option value="Clothes">Clothes</option>
            <option value="Electronics">Electronics</option>
            <option value="Groceries">Groceries</option>
            <option value="Other">Other</option>
          </select>

          <select onChange={e => setSort(e.target.value)} value={sort}>
            <option value="">Sort by Price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>
      </div>

      <div className="product-container">
        <div className="product-list">
          {products.map(p => (
            <div key={p._id} className="product-card">
              <h4>{p.name}</h4>
              <p><strong>Price:</strong> ${p.price}</p>
              <p><strong>Category:</strong> {p.category}</p>
              <div className="actions">
                <button className="edit-btn" onClick={() => handleEdit(p)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(p._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
