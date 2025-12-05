import { FiTrash2 } from "react-icons/fi";

export default function DeleteUserModal({ open, onClose, user, onDelete, isRequesting }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg py-6 px-7 max-w-lg shadow-xl">

        <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-red-600">
          <FiTrash2 /> Delete Participant
        </h2>

        <div className="mb-6 text-gray-700 leading-relaxed">
          <p>
            You're about to delete participant <strong>{user?.name}</strong>.  
            This action cannot be undone.
            <br />
            Are you sure you want to continue?
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isRequesting}
            className="px-4 py-1.5 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium"
          >
            Cancel
          </button>

          <button
            onClick={() => onDelete(user)}
            disabled={isRequesting}
            className="px-4 py-1.5 rounded font-medium text-white bg-red-500 hover:bg-red-600 disabled:bg-red-300"
          >
            {isRequesting ? "Deleting..." : "Delete User"}
          </button>
        </div>

      </div>
    </div>
  );
}
