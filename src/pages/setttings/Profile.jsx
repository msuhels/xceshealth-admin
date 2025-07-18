import { useState, useEffect } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfoAsync } from '../../store/features/users/userApi';
import { UPDATE_USER } from '../../api/apiUrl';
import { axiosClient } from '../../utils/axiosClient';

function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    profilePicture: '',
    previewImage: ''
  });   
  console.log("user",user)

  useEffect(() => {
    dispatch(getUserInfoAsync());
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        email: user.email || '',
        profilePicture: user.profilePicture || '',
        previewImage: `${user.profilePicture}`
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePicture: file,
        previewImage: URL.createObjectURL(file),
      }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  data.append('name', formData.name);
  data.append('phone', formData.phone);
  data.append('address', formData.address);

  // Append image file as 'profile' (matches backend: `upload.single('profile')`)
  if (formData.profilePicture instanceof File) {
    data.append('profile', formData.profilePicture);
  }

  try {
    const response = await axiosClient.post(`${UPDATE_USER}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('✅ Profile updated:', response.data);
    // Optionally, dispatch again to refresh data
    dispatch(getUserInfoAsync());

  } catch (error) {
    console.log('❌ Error updating profile:', error?.response?.data || error.message);
  }
};

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Account Settings ✨</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 shadow-lg rounded-sm mb-8">
              <div className="p-6 space-y-6">
                <h2 className="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-5">My Account</h2>

                {/* Profile Picture Upload */}
                <section>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <img
                        className="w-20 h-20 rounded-full object-cover"
                        src={formData?.previewImage || '/default-avatar.png'}
                        alt="User"
                      />
                    </div>
                    <label className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer">
                      Change
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                  </div>
                </section>

                {/* Business Info */}
                <section>
                  <h2 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">Profile Info</h2>
                  <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                    <div className="sm:w-1/3">
                      <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                      <input
                        id="name"
                        name="name"
                        className="form-input w-full"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="sm:w-1/3">
                      <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone</label>
                      <input
                        id="phone"
                        name="phone"
                        className="form-input w-full"
                        type="text"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="sm:w-1/3">
                      <label className="block text-sm font-medium mb-1" htmlFor="address">Address</label>
                      <input
                        id="address"
                        name="address"
                        className="form-input w-full"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </section>

                {/* Email (Read Only) */}
                <section>
                  <h2 className="text-xl leading-snug text-slate-800 dark:text-slate-100 font-bold mb-1">Email</h2>
                  <div className="text-sm mb-2">You can't change your email address.</div>
                  <input
                    id="email"
                    name="email"
                    className="form-input w-full bg-gray-100 cursor-not-allowed"
                    type="email"
                    value={formData.email}
                    readOnly
                  />
                </section>
              </div>

              {/* Footer Buttons */}
              <footer>
                <div className="flex flex-col px-6 py-5 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex self-end">
                    <button
                      type="button"
                      className="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                      onClick={() => setFormData({
                        name: user.name,
                        phone: user.phone,
                        address: user.address,
                        email: user.email,
                        profilePicture: user.profilePicture,
                        previewImage: `${user.profilePicture}`
                      })}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </footer>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;
