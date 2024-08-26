import React, { useState } from "react";
import { Layout, Menu, Button, theme } from 'antd';
import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ShopOutlined, DesktopOutlined } from "@ant-design/icons";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import Home from "../Home";
import './css/index.css'
import ListMovie from "../Movie/ListMovie";
import Movie from "../Movie/Movie";
import ListTheater from "../Theater/ListTheater";
import Theater from "../Theater/Theater";
import CinemaRoom from "../CinemaRoom/CinemaRoom";
import ListCinemaRoom from "../CinemaRoom/ListCinemaRoom";
import ListShowTime from "../ShowTime/ListShowTime";
import ShowTime from "../ShowTime/ShowTime";
import ListCustomer from "../Customer/ListCustomer";
import Customer from "../Customer/Customer";
import { useUserContext } from "../Context/UserContext";
import ListSeatCinemaRoom from "../SeatCinemaRoom/ListSeatCinemaRoom";
const Layouts: React.FC = () => {

  const [collapsed, setCollapsed] = useState(false);

  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const logoutStyle: React.CSSProperties = {
    fontFamily: '"Noto Sans JP", sans-serif',
    fontSize: '13px',
    color: 'black',
    marginLeft: 10
  };

  const userNameStyle: React.CSSProperties = {
    fontFamily: '"Noto Sans JP", sans-serif',
    fontSize: '13px',
    color: 'black',
    marginRight: 10
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<HomeOutlined />} >
            <Link to="/dotheanh/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to="/dotheanh/movies">Movies</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ShopOutlined />}>
            <Link to="/dotheanh/theaters">Theaters</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<ShopOutlined />}>
            <Link to="/dotheanh/cinema-rooms">Cinema room</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<ShopOutlined />}>
            <Link to="/dotheanh/show-times">Show time</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<ShopOutlined />}>
            <Link to="/dotheanh/customers">Customer</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<ShopOutlined />}>
            <Link to="/dotheanh/seat-cinema-rooms">Customer</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
          <div style={{ marginTop: -65, marginLeft: 1120 }}>
            <a style={userNameStyle}>
              {user?.name}
            </a>
            <a>|</a>
            <a style={logoutStyle} onClick={handleLogout}>
               Logout
            </a>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px", padding: 24, minHeight: 280 }}>
          <Routes>
            <Route path="/home" element={<Home />} />

            <Route path="/movies" element={<ListMovie />} />
            <Route path="/movies/movie" element={<Movie />} />
            <Route path="/movies/movie/:id" element={<Movie />} />

            <Route path="/theaters" element={<ListTheater />} />
            <Route path="/theaters/theater" element={<Theater />} />
            <Route path="/theaters/theater/:id" element={<Theater />} />

            <Route path="/cinema-rooms" element={<ListCinemaRoom />} />
            <Route path="/cinema-rooms/cinema-room" element={<CinemaRoom />} />
            <Route path="/cinema-rooms/cinema-room/:id" element={<CinemaRoom />} />

            <Route path="/show-times" element={<ListShowTime />} />
            <Route path="/show-times/show-time" element={<ShowTime />} />
            <Route path="/show-times/show-time/:id" element={<ShowTime />} />

            <Route path="/customers" element={<ListCustomer />} />
            <Route path="/customers/customer" element={<Customer />} />
            <Route path="/customers/customer/:id" element={<Customer />} />

            <Route path="/seat-cinema-rooms" element={<ListSeatCinemaRoom />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Layouts;
