  import React, { useEffect, useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import ProductTable from '../../partials/products/ProductTable';
import PaginationClassic from '../../components/PaginationClassic';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsAsync } from '../../store/features/product/productApi';
import { useNavigate } from 'react-router-dom';

function Products() {
  const dispatch = useDispatch();
  const { products, error, status } = useSelector(state => state.products);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProductsAsync());
  }, []);

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Products</h1>
              </div>
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                    aria-controls="feedback-modal"
                    onClick={()=>navigate('/products/add-product')}
                >
                    <span className="hidden xs:block ml-2">Add product</span>
                </button>
              </div>
            </div>

            <ProductTable products={products} />

            <div className="mt-8">
              <PaginationClassic />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Products;
