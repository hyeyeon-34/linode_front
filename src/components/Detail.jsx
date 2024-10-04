import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { closeDetail, openDetail } from '../redux/slices/detailSlice';
import { toast } from 'react-toastify';
import {
  fetchGetItemsData,
  fetchPostItemData,
  fetchPutItemData,
} from '../redux/slices/apiSlice';
const Detail = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);
  // console.log(user?.sub);
  const { modalType, task } = useSelector((state) => state.detail);
  //   console.log(modalType);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    isCompleted: false,
    isImportant: false,
    userId: user?.sub,
  });
  useEffect(() => {
    if (modalType === 'detail') {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        date: task.date || '',
        isCompleted: task.iscompleted || false,
        isImportant: task.isimportant || false,
        id: task._id || '',
      });
    }
  }, [modalType]);

  // console.log(formData);

  const handleCloseDetail = () => {
    dispatch(closeDetail());
  };

  return (
    <div className="modal fixed bg-black bg-opacity-50 flex items-center justify-center w-full h-full left-0 top-0 z-50">
      <div className="form-wrapper bg-gray-700 rounded-md w-1/2 flex flex-col items-center relative p-4">
        <h2 className="text-2xl py-2 border-b border-gray-300 w-fit font-semibold">
          세부사항
        </h2>
        <form className="w-full">
          <div className="input-control">
            <label htmlFor="title">제목 : {formData.title}</label>
          </div>
          <div className="input-control">
            <label htmlFor="description">내용 : {formData.description}</label>
          </div>
          <div className="input-control">
            <label htmlFor="date"> 날짜 : {formData.date}</label>
          </div>
          <div className="input-control toggler">
            <label htmlFor="isCompleted">{formData.isCompleted}</label>
            <input
              type="checkbox"
              id="isCompleted"
              name="isCompleted"
              value={formData.isCompleted}
              checked={formData.isCompleted}
            />
          </div>
          <div className="input-control toggler">
            <label htmlFor="isImportant">{formData.isImportant}</label>
            <input
              type="checkbox"
              id="isImportant"
              name="isImportant"
              value={formData.isImportant}
              checked={formData.isImportant}
            />
          </div>
        </form>

        <MdClose
          onClick={handleCloseDetail}
          className="absolute right-10 top-10 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Detail;
