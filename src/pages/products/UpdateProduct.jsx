import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BackendUrl } from '../../config';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import { axiosClient } from '../../utils/axiosClient';
import { getProductsAsync } from '../../store/features/product/productApi';
import { GET_PRODUCT_BY_ID, UPDATE_PRODUCT } from '../../api/apiUrl';

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: null,
    preview: '',
  });

  // Fetch product by ID on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosClient.get(`${GET_PRODUCT_BY_ID}/${id}`);
        const product = res.data;

        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          image: null,
          preview: `${BackendUrl}${product.images}` || '', // if backend returns full URL
        });
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch product:', err?.response?.data || err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
    data.append('product_id', id );
    if (formData.image instanceof File) {
      data.append('images', formData.image); // only send if a new image is uploaded
    }

    try {
      await axiosClient.post(`${UPDATE_PRODUCT}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

    //   dispatch(getProductsAsync());
      navigate('/products');
    } catch (error) {
      console.error('Error updating product:', error?.response?.data || error.message);
    }
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">
                Update Product
              </h1>
              <button
                className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                onClick={() => navigate('/products')}
              >
                <span className="hidden xs:block ml-2">Back</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 shadow-lg rounded-md p-6 space-y-6">
              {/* Image Upload */}
              <div className="flex items-center space-x-4">
                {formData.preview && (
                  <img src={formData.preview} alt="Preview" className="w-20 h-20 object-cover rounded" />
                )}
                <label className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer">
                  Upload New Image
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              </div>

              {/* Fields */}
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

              {/* Submit */}
              <div className="flex justify-end">
                <button type="submit" className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UpdateProduct;
