import  { useState } from 'react';
import ModalBasic from '../../components/ModalBasic';
import { ADD_USERS } from '../../api/apiUrl';
import { axiosClient } from '../../utils/axiosClient';
import { useDispatch } from 'react-redux';
import { getUsersAsync } from '../../store/features/users/userApi';
function AddUserModal() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'tutor',
    });
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosClient.post(ADD_USERS,formData);
            setFeedbackModalOpen(false);
            setFormData({ name: '', email: '', role: 'user' });
            dispatch(getUsersAsync());
        } catch (error) {
            console.error('Add user failed:', error);
            // You may want to show a toast or error message here
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
            aria-controls="feedback-modal"
            onClick={(e) => { e.stopPropagation(); setFeedbackModalOpen(true); }}
        >
            <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden xs:block ml-2">Add User</span>
        </button>
        <ModalBasic id="feedback-modal" modalOpen={feedbackModalOpen} setModalOpen={setFeedbackModalOpen} title="Add User">
            {/* Modal content */}
            <form onSubmit={handleSubmit}>
                <div className="px-5 py-4">
                    <div className="space-y-4">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1">
                                Name <span className="text-rose-500">*</span>
                            </label>
                            <input
                                name="name"
                                id="name"
                                type="text"
                                required
                                className="form-input w-full px-2 py-1"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                                Email <span className="text-rose-500">*</span>
                            </label>
                            <input
                                name="email"
                                id="email"
                                type="email"
                                required
                                className="form-input w-full px-2 py-1"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium mb-1">
                                Role <span className="text-rose-500">*</span>
                            </label>
                            <select
                                name="role"
                                id="role"
                                required
                                className="form-select w-full px-2 py-1"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="tutor">Tutor</option>
                                <option value="pathologist">Pathologist</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Modal footer */}
                <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            className="btn-sm text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                            onClick={() => setFeedbackModalOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
                            disabled={loading}
                        >
                            {loading ? 'Adding...' : 'Add User'}
                        </button>
                    </div>
                </div>
            </form>
        </ModalBasic>
        </>
    );
}

export default AddUserModal;
