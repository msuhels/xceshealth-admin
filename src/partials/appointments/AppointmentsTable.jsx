import moment from 'moment';

function AppointmentsTable({ appointments }) {
  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          All Appointments{' '}
          <span className="text-slate-400 dark:text-slate-500 font-medium">
            {appointments?.length}
          </span>
        </h2>
      </header>
      <div className="overflow-x-auto">
        <table className="table-auto w-full dark:text-slate-300">
          <thead className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Tutor</th>
              <th className="px-4 py-3 text-left">Start Time</th>
              <th className="px-4 py-3 text-left">End Time</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Join</th>
              {/* <th className="px-4 py-3 text-left">Actions</th> */}
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
            {appointments?.length > 0 &&  appointments.map((appt) => (
              <tr key={appt._id}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="font-medium">{appt.userId?.name}</div>
                  <div className="text-xs text-slate-500">{appt.userId?.email}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="font-medium">{appt.tutorId?.name}</div>
                  <div className="text-xs text-slate-500">{appt.tutorId?.email}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {moment(appt.startTime).format('MMM DD, YYYY hh:mm A')}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {moment(appt.endTime).format('MMM DD, YYYY hh:mm A')}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${
                      appt.status === 'scheduled'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {appt.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <a
                    href={appt.location?.joinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Join Link
                  </a>
                </td>
                {/* <td className="px-4 py-3 whitespace-nowrap space-x-2">
                  <a
                    href={appt.calendly?.rescheduleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline text-sm"
                  >
                    Reschedule
                  </a>
                  <a
                    href={appt.calendly?.cancelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:underline text-sm"
                  >
                    Cancel
                  </a>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppointmentsTable;
