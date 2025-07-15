
function UsersTableItem({
  id,
  name,
  email,
  phone,
  address,
  role,
  isActive
}) {
  return (
    <tr key={id}>
      <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-800 dark:text-slate-100">
        {name}
      </td>
      <td className="px-2 py-3 whitespace-nowrap">{email}</td>
      <td className="px-2 py-3 whitespace-nowrap">{phone}</td>
      <td className="px-2 py-3 whitespace-nowrap">{address}</td>
      <td className="px-2 py-3 whitespace-nowrap capitalize">{role}</td>

      {/* Active status */}
      <td className="px-2 py-3 whitespace-nowrap">
        <span
          className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${
            isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}
        >
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </td>

      <td className="px-2 py-3 whitespace-nowrap">
        <button className="text-slate-400 hover:text-slate-600">
          <span className="sr-only">Actions</span>
          <svg className="w-6 h-6" viewBox="0 0 32 32" fill="currentColor">
            <circle cx="16" cy="16" r="2" />
            <circle cx="10" cy="16" r="2" />
            <circle cx="22" cy="16" r="2" />
          </svg>
        </button>
      </td>
    </tr>
  );
}

export default UsersTableItem;
