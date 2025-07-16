import React, { useEffect, useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import UsersTable from '../../partials/users/UserTable';
import PaginationClassic from '../../components/PaginationClassic';
import { useDispatch , useSelector } from 'react-redux';
import { getPathologistAsync } from '../../store/features/users/userApi';
import AddUserModal from './AdduserModal';

function Pathologist() {

  const dispatch = useDispatch();
  const { pathologists , error , status } = useSelector((state)=>state.users);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(()=>{
    dispatch(getPathologistAsync());
  },[]);

  return (
    <div className="flex h-[100dvh] overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Users</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">


                {/* Add customer button */}
                <AddUserModal buttonText={'Invite Pathologist'} role={'pathologist'}/>
              </div>
            </div>
            {/* Table */}
            <UsersTable users={pathologists}/>

            {/* Pagination */}
            <div className="mt-8">
              <PaginationClassic />
            </div>

          </div>
        </main>
      </div>

    </div>
  );
}

export default  Pathologist;