import { useAppDispatch, useAppSelector } from "../../Store/Hook";
import { setLogoutModalOpen } from "../../Store/Slices/ModalSlice";
import { clearUser } from "../../Store/Slices/UserSlice";
import { STORAGE_KEYS } from "../../Constants/StorageKeys";
import { useNavigate } from "react-router-dom";

const LogoutModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLogoutModalOpen } = useAppSelector((state) => state.Modal);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    // Clear Redux user state
    dispatch(clearUser());
    // Close modal
    dispatch(setLogoutModalOpen(false));
    // Navigate to home
    navigate("/");
  };

  const handleCancel = () => {
    dispatch(setLogoutModalOpen(false));
  };

  if (!isLogoutModalOpen) return null;

  return (
    <div
      onClick={handleCancel}
      className="modal-overlay fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-9999!"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-content bg-white p-7! rounded-lg shadow-lg max-w-2xl w-full mx-4!"
      >
        <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
          Confirm Logout
        </h2>
        <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
        <div className="flex justify-end space-x-4!">
          <button
            onClick={handleCancel}
            className="main-header-btn edu-btn btn-medium"
            // className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="main-header-btn edu-btn btn-medium"
            // className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
