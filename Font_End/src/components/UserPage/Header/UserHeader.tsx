import { theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../Context/UserContext';

const UserHeader: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();

  const handleLogoClick = () => {
    navigate('/user');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const fontStyle: React.CSSProperties = {
    fontFamily: '"Noto Sans JP", sans-serif',
    fontSize: '13px',
    color: 'black',
  };

  return (
    <Header
      style={{
        height: 80,
        padding: 0,
        background: colorBgContainer,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <img
        src="/src/assets/Logo.jpg"
        alt="Logo"
        style={{ position: 'absolute', left: 80, height: 80 }}
        onClick={handleLogoClick}
      />
      <ul
        style={{
          width: 300,
          display: 'flex',
          justifyContent: 'space-between',
          listStyleType: 'none',
        }}
      >
        <li>
          <a style={fontStyle} href="#new-movie">
            Phim mới
          </a>
        </li>
        <li>
          <a style={fontStyle} href="#cinema-corner">
            Góc điện ảnh
          </a>
        </li>
      </ul>
      <ul
        style={{
          position: 'absolute',
          right: 80,
          display: 'flex',
          alignItems: 'center',
          listStyleType: 'none',
        }}
      >
        {user ? (
          <>
            <li>
              <a style={fontStyle} href="#">
                {user.name}
              </a>
            </li>
            <li style={{ margin: '0 10px' }}>|</li>
            <li>
              <a style={fontStyle} href="/" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </>
        ) : (
          <>
            <li>
              <a style={fontStyle} href="/">
                Đăng nhập
              </a>
            </li>
            <li style={{ margin: '0 10px' }}>|</li>
            <li>
              <a style={fontStyle} href="#">
                Đăng ký
              </a>
            </li>
          </>
        )}
      </ul>
    </Header>
  );
};

export default UserHeader;
