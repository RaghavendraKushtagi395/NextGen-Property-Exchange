import React from "react";

const ConfirmationModal = ({ isVisible, onClose, onConfirm, message }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-xl shadow-lg w-80">
        <p className="text-center text-lg mb-4">{message}</p>
        <div className="flex justify-around">
          <button
            onClick={onConfirm}
            className=" text-red-700 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className=" text-black px-4 py-2 rounded-lg hover:bg-indigo-700 hover:text-white"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
