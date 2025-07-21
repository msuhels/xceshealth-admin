
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { useState } from 'react';
import { InlineWidget, useCalendlyEventListener } from 'react-calendly';

function Appointment() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
    const calendlyUrl  = 'https://calendly.com/ibr-ronik'
  useCalendlyEventListener({
    onProfilePageViewed: () => console.log("onProfilePageViewed"),
    onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
    onEventTypeViewed: () => console.log("onEventTypeViewed"),
    onEventScheduled: (e) => console.log(e.data.payload),
    onPageHeightResize: (e) => console.log(e.data.payload.height),
  });

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
                <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Tutors</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                    aria-controls="feedback-modal"
                >
                    <span className="hidden xs:block ml-2">connects</span>
                    <a href="http://localhost:5000/api/calendly/oauth">
                        Connect Calendly
                    </a>
                </button>
                {/* Add customer button */}
                {/* <AddUserModal buttonText={'Invite Tutor'} role={'tutor'}/> */}
                {/* <div
                    className="calendly-inline-widget"
                    data-url="https://calendly.com/doctor-username"
                    style={{ minWidth: 320, height: 630 }}
                    ></div>
                <script src="https://assets.calendly.com/assets/external/widget.js"></script> */}
              </div>
            </div>
            <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Book Appointment</h2>
            <InlineWidget
                url={calendlyUrl}
                styles={{ height: '700px' }}
                pageSettings={{
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                }}
            />
            </div>

          </div>
        </main>
      </div>

    </div>
  );
}


export default Appointment;