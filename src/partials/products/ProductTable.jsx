import React from 'react';

function ProductTable({ products }) {
  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          All Products <span className="text-slate-400 dark:text-slate-500 font-medium">{products?.length}</span>
        </h2>
      </header>
      <div className="overflow-x-auto">
        <table className="table-auto w-full dark:text-slate-300">
          <thead className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-2 py-3 text-left">Name</th>
              <th className="px-2 py-3 text-left">Description</th>
              <th className="px-2 py-3 text-left">Price</th>
              <th className="px-2 py-3 text-left">Stock</th>
              <th className="px-2 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
            {products?.map((product) => (
              <tr key={product?._id}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <img
                    src={`http://localhost:5000${product?.images}`}
                    alt={product?.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-2 py-3 font-medium text-slate-800 dark:text-slate-100 whitespace-nowrap">
                  {product?.name}
                </td>
                <td className="px-2 py-3 text-slate-600 dark:text-slate-300 whitespace-nowrap max-w-xs truncate">
                  {product?.description}
                </td>
                <td className="px-2 py-3 whitespace-nowrap">${product?.price}</td>
                <td className="px-2 py-3 whitespace-nowrap">{product?.stock}</td>
                <td className="px-2 py-3 whitespace-nowrap">
                  <span className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${
                    product?.isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {product?.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;
