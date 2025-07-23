import  { useEffect, useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import PaginationClassic from '../../components/PaginationClassic';
import { axiosClient } from '../../utils/axiosClient';
import { GET_ALL_APPOINTMENTS } from '../../api/apiUrl';
import AppointmentsTable from '../../partials/appointments/AppointmentsTable';
function Appointment() {

  const [ appointments , setAppointments ] = useState([]);
  console.log("appointments",appointments)
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getAllAppointments = async ( ) => {
    try {
        const  response = await axiosClient.get(GET_ALL_APPOINTMENTS);
        console.log(response)
        setAppointments(response.data);
    } catch (error) {
        console.error("Error while fetching appointments")
    }
  }

  useEffect(()=>{
    getAllAppointments()
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
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Appointments</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              </div>
            </div>
            {/* Table */}
            <AppointmentsTable appointments={appointments}/>

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

export default Appointment;