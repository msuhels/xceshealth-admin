import React, { useEffect, useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import UsersTable from '../../partials/users/UserTable';
import PaginationClassic from '../../components/PaginationClassic';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersAsync } from '../../store/features/orders/orderApi';
import moment from 'moment';


function Users() {

  const dispatch = useDispatch();
  const { orders, error, status } = useSelector((state) => state.orders);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(getOrdersAsync());
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
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Orders</h1>
              </div>
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
              <header className="px-5 py-4">

                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  All Orders <span className="text-slate-400 dark:text-slate-500 font-medium">{orders?.length}</span>
                </h2>
              </header>
              <div className="overflow-x-auto">
                <table className="table-auto w-full dark:text-slate-300">
                  <thead className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="px-4 py-3 text-left">Order No.</th>
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-2 py-3 text-left">Status</th>
                      <th className="px-2 py-3 text-left">Amount</th>
                      <th className="px-2 py-3 text-left">Date</th>
                      <th className="px-2 py-3 text-left">items</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
                    {orders?.map((order) => (
                      <tr key={order._id}>
                        <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-800 dark:text-slate-100"> {order.orderNumber} </td>
                        <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-800 dark:text-slate-100"> {order.user.name} </td>

                        <td className="px-2 py-3 whitespace-nowrap">
                          <span className={`inline-block capitalize px-2 py-0.5 text-xs rounded-full font-medium ${order.status == 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-800 dark:text-slate-100"> ${order.totalAmount} </td>
                        <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-800 dark:text-slate-100"> {moment(order.createdAt).format('DD-MM-YYYY')} </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-8">
              <PaginationClassic />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Users;