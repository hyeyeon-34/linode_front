import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import modalReducer from './slices/modalSlice';
import apiReducer from './slices/apiSlice';
import detailReducer from './slices/detailSlice';
const store = configureStore({
  // 5. store에 slice 등록
  reducer: {
    auth: authReducer,
    modal: modalReducer, // ModalSlice 만든 이후 그 다음 여기에 등록
    api: apiReducer,
    detail: detailReducer,
  },
});

export default store;
