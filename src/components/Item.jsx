import React, { useState } from 'react';
import { MdEditDocument } from 'react-icons/md';
import { FaChessKing, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { openModal } from '../redux/slices/modalSlice';
import {
  fetchDeleteItemData,
  fetchGetItemsData,
  fetchUpdateCompletedData,
} from '../redux/slices/apiSlice';
import { openDetail } from '../redux/slices/detailSlice';

const Item = ({ task }) => {
  const dispatch = useDispatch();

  const { _id, title, description, date, iscompleted, isimportant, userid } =
    task;
  const [isCompleted, setIsCompleted] = useState(iscompleted);
  const deleteItem = async () => {
    const confirm = window.confirm('아이템을 삭제하시겠습니까?');
    if (!confirm) return;
    if (!_id) {
      toast.error('잘못된 사용자 접근입니다.');
      return;
    }
    try {
      await dispatch(fetchDeleteItemData(_id)).unwrap();
      toast.success('아이템이 삭제되었습니다. ');
      await dispatch(fetchGetItemsData(userid)).unwrap();
    } catch (error) {
      toast.error('아이템 삭제에 실패했습니다.');
      console.error(error);
    }
  };

  const changeCompleted = async () => {
    // setIsCompleted(!isCompleted)을 호출하면 상태 업데이트가 비동기적으로 이루어지기 때문에, isCompleted의 값이 즉시 변경되지 않는다.
    // 따라서 updateCompletedData 객체를 생성할 때 isCompleted의 이전 값이 사용된다. 이로 인해 true/false가 한 단계씩 밀리게 된다.
    // 상태를 미리 업데이트하여 반영된 값을 전달
    const newIsCompleted = !isCompleted;
    setIsCompleted(newIsCompleted);
    const updateCompletedData = {
      itemId: _id,
      isCompleted: newIsCompleted,
    };
    // console.log(newIsCompleted);
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateCompletedData),
    };

    await dispatch(fetchUpdateCompletedData(options)).unwrap();
    newIsCompleted
      ? toast.success('할일을 완료했습니다..')
      : toast.success('할일을 완료하지 못했습니다.');
    await dispatch(fetchGetItemsData(userid)).unwrap();
  };

  const handleOpenModal = () => {
    dispatch(openModal({ modalType: 'update', task })); // modalSlice에서 openModal 가져오기
  };

  const detailModal = () => {
    dispatch(openDetail({ modalType: 'detail', task }));
  };

  return (
    <div className="item w-1/3 h-[25vh] p-[0.25rem]">
      <div className="w-full h-full border border-gray-500 rounded-md flex py-3 px-4 flex-col justify-between">
        <div className="upper">
          <h2 className="text-xl font-normal mb-3 relative pb-2 flex justify-between">
            <span className="w-full h-[1px] bg-gray-500 absolute bottom-0"></span>

            {title}
            <span
              className="text-sm py-1 px-3 border border-gray-500 rounded-md hover:bg-gray-700 cursor-pointer"
              onClick={detailModal}
            >
              자세히
            </span>
          </h2>
          <p style={{ whiteSpace: 'pre-wrap' }}>{description}</p>
        </div>
        <div className="lower">
          <p className="text-sm mb-1">{date}</p>
          <div className="item-footer flex justify-between">
            <div className="item-footer-left flex gap-x-2">
              {iscompleted ? (
                <button
                  className="block py-1 px-4 bg-green-400 text-sm text-white rounded-md"
                  onClick={changeCompleted}
                >
                  Completed
                </button>
              ) : (
                <button
                  className="block py-1 px-4 bg-cyan-700 text-sm text-white rounded-md"
                  onClick={changeCompleted}
                >
                  Incompleted
                </button>
              )}
              {isimportant && (
                <button className="block py-1 px-4 bg-red-400 text-sm text-white rounded-md">
                  Important
                </button>
              )}
            </div>
            <div className="item-footer-right flex gap-x-2 items-center">
              <button className="w-5 h-5" onClick={handleOpenModal}>
                <MdEditDocument />
              </button>
              <button className="delete" onClick={deleteItem}>
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;