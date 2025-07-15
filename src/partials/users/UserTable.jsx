import React, { useState, useEffect } from 'react';
import UserTableItem from './UserTableItems'; // ✅ Import properly

function UsersTable({ users }) {

  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          All users <span className="text-slate-400 dark:text-slate-500 font-medium">{users.length}</span>
        </h2>
      </header>
      <div className="overflow-x-auto">
        <table className="table-auto w-full dark:text-slate-300">
          <thead className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-2 py-3 text-left">Email</th>
              <th className="px-2 py-3 text-left">Phone</th>
              <th className="px-2 py-3 text-left">Address</th>
              <th className="px-2 py-3 text-left">Role</th>
              <th className="px-2 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
            {users.map((user) => (
              <UserTableItem
                key={user._id}
                id={user._id}
                name={user.name}
                email={user.email}
                phone={user.phone}
                address={user.address}
                role={user.role}
                isActive={user.isActive}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersTable;
