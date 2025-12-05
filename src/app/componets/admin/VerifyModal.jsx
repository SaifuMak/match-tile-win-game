import { FiCheck, FiX } from "react-icons/fi";

export default function VerifyModal({ open, onClose, participant, onVerify, onUnclaim, isRequesting }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg py-12 px-7 max-w-xl  shadow-xl">

        <h2 className="text-xl font-bold mb-5">Prize Verification</h2>


        <div className="flex items-center  gap-2 mb-4">
          {participant.is_prize_claimed ? (
            <p>
              This prize is already marked as claimed.
              Would you like to revoke the claim for <strong>{participant.name}</strong>?
            </p>
          ) : (
            <p>
              Please confirm that <strong>{participant.name}</strong> has received their prize.
              Do you want to verify this claim?
            </p>
          )}

        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isRequesting}
            className="px-3 py-1 rounded cursor-pointer bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onVerify(participant);
            }}
            disabled={isRequesting}
            className={`px-3 py-1 rounded cursor-pointer ${participant.is_prize_claimed ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} text-white`}
          >
           {isRequesting ? "Processing..." : "Confirm"}
          </button>

        </div>
      </div>
    </div>
  );
}
