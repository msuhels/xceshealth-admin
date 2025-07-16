import  { useState } from 'react';
import ModalBasic from '../../components/ModalBasic';
import { ADD_USERS } from '../../api/apiUrl';
import { axiosClient } from '../../utils/axiosClient';
import { useDispatch } from 'react-redux';
import { getTutorsAsync , getPathologistAsync } from '../../store/features/users/userApi';
import { FcInvite } from "react-icons/fc";
import { useToast } from '../../contexts/ToastContext'; // adjust path

function AddUserModal({buttonText,role}) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: role,
    });
    const { showToast } = useToast();

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
            setFormData({ name: '', email: '', role: role });
            showToast('success', 'Invitation sent successfully!');
            if(role === 'tutor'){
                dispatch(getTutorsAsync());
            }else{
                dispatch(getPathologistAsync());
            }
        } catch (error) {
            console.error('Add user failed:', error);
            showToast('error', error.response.data?.message || "errpr ");
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
            <FcInvite className="w-4 h-4 fill-current shrink-0" />
            <span className="hidden xs:block ml-2">{buttonText}</span>
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
                            {loading ? 'Inviting...' : buttonText }
                        </button>
                    </div>
                </div>
            </form>
        </ModalBasic>
        </>
    );
}

export default AddUserModal;
