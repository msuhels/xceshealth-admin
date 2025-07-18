import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import { useDispatch } from 'react-redux';
import { axiosClient } from '../../utils/axiosClient';
import { getProductsAsync } from '../../store/features/product/productApi';
import { useNavigate } from 'react-router-dom';
import { ADD_PRODUCT } from '../../api/apiUrl';

function AddProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: null,
    preview: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    if (formData.image instanceof File) {
      data.append('images', formData.image); // your backend must match this field name
    }

    try {
      await axiosClient.post(ADD_PRODUCT, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      dispatch(getProductsAsync());
    //   navigate('/products'); // redirect to product listing
    } catch (error) {
      console.error('Error adding product:', error?.response?.data || error.message);
    }
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">Add Product</h1>
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                aria-controls="feedback-modal"
                onClick={()=>navigate('/products')}
            >
                <span className="hidden xs:block ml-2">Back</span>
            </button>
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800  shadow-lg rounded-md p-6 space-y-6">
              {/* Image Upload */}
              <div className="flex items-center space-x-4">
                {formData.preview && (
                  <img src={formData.preview} alt="Preview" className="w-20 h-20 object-cover rounded" />
                )}
                <label className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer">
                  Upload Image
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              </div>

              {/* Product Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input w-full"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <input
                    type="number"
                    name="price"
                    className="form-input w-full"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    className="form-input w-full"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  className="form-textarea w-full"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddProducts;
