import React from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { openModal } from '../redux/slices/modalSlice';
const AddItem = () => {
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    dispatch(openModal({ modalType: 'create' })); // modalSlice에서 openModal 가져오기
  };
  return (
    <div className="add-card w-1/3 h-[25vh] p-[0.25rem]">
      <div className="w-full h-full border border-gray-500 rounded-md flex items-center justify-center   ">
        <button
          className="flex items-center gap-x-2 group "
          onClick={handleOpenModal}
        >
          <MdAddCircleOutline className="w-8 h-8 text-gray-400 font-light group-hover:text-gray-200 cursor-pointer" />
          <span className="font-customFonKR text-gray-400 group-hover:text-gray-200 cursor-pointer">
            할일 추가하기
          </span>
        </button>
      </div>
    </div>
  );
};

export default AddItem;
