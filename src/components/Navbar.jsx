import React, { useCallback, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/slices/authSlice';
import { navMenus } from '../utills/data';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const Navbar = ({ menuIdx }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);
  const { name } = user || {};
  const googleClientId = process.env.REACT_APP_AUTH_CLIENT_ID;
  const [isAuthentication, setIsAuthentication] = useState(false);

  const handleLoginSuccess = useCallback(
    (response) => {
      const decoded = jwtDecode(response.credential);

      dispatch(login({ authData: decoded }));

      setIsAuthentication(true);
    },
    [dispatch]
  ); // callback 안에 넣기

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('authData'));

    if (storedData) {
      dispatch(login({ authData: storedData }));
      setIsAuthentication(true);
    }
  }, [dispatch]);
  // 이상한 json을 정리한게 parse
  useEffect(() => {
    console.log('Google Client ID:', googleClientId);
    if (!googleClientId) {
      console.warn('Google Client ID is not set');
      return; // googleClientId가 설정되지 않은 경우 종료
    }
  
    if (window.google) {
      // 구글 아이디가 가져와졌을때
      window.google.accounts.id.initialize({
        // 구글 값 초기화
        client_id: googleClientId,
        callback: handleLoginSuccess,
        use_fedcm_for_prompt: false,
      });
    }
  }, [googleClientId, handleLoginSuccess]);
  if (window.google) {
    // 구글 아이디가 가져와졌을때
    window.google.accounts.id.initialize({
      // 구글 값 초기화
      client_id: googleClientId,
      callback: handleLoginSuccess,
    });
  }
  const handleLoginClick = () => {
    window.google.accounts.id.prompt(); // 로그인 팝업 띄우기
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    setIsAuthentication(false);
  };

  return (
    <nav className="navi bg-[#212121] w-1/5 h-full rounded-sm border border-gray-500 py-10 px-4 flex flex-col justify-between items-center">
      <div className="logo-wrapper flex w-full items-center justify-center gap-8">
        <div className="logo"></div>
        <h2 className="font-semibold text-xl">
          <Link to="/" className="font-customFontEn">
            Axel
          </Link>
        </h2>
      </div>
      <ul className="menus">
        {navMenus.map((menu, idx) => (
          <li
            key={idx}
            className={`${
              idx === menuIdx ? 'bg-gray-950 border border-gray-700' : ''
            } rounded-sm mb-1 hover:bg-gray-950 transition-all duration-300`}
          >
            <Link
              to={menu.to}
              className="flex gap-x-4 items-center py-2 px-10 "
            >
              {menu.icon}
              {menu.label}
            </Link>
          </li>
        ))}
      </ul>
      {isAuthentication ? (
        <div className="w-4/5 ">
          <button
            onClick={handleLogoutClick}
            className="font-customFontEn flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-2 px-4 rounded-md w-full "
          >
            <FcGoogle className="h-5 w-5 " />
            <span className="text-sm">{name}님 Logout</span>
          </button>
        </div>
      ) : (
        <div className="w-4/5 flex justify-center items-center">
          <button
            onClick={handleLoginClick}
            className="font-customFontKr flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-2 px-4 rounded-md w-full"
          >
            <FcGoogle className="h-5 w-5 " />
            Login With Google
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
