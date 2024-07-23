import React, { useState } from "react";
import { Layout, Menu, Button, theme } from 'antd';
import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ShopOutlined, DesktopOutlined } from "@ant-design/icons";
import { Link, Route, Routes } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import Home from "../Home";
import './css/index.css'
import ListMovieDetail from "../MovieDetail/ListMovieDetail";
import ListMovie from "../Movie/ListMovie";
import Movie from "../Movie/Movie";
import MovieDetail from "../MovieDetail/MovieDetail";
import ListTheater from "../Theater/ListTheater";
import Theater from "../Theater/Theater";

const Layouts: React.FC = () => {

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
          <Menu.Item key="3" icon={<DesktopOutlined />}>
            <Link to="/dotheanh/movie-details">Movie details</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<ShopOutlined />}>
            <Link to="/dotheanh/theaters">Theaters</Link>
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
        </Header>
        <Content style={{ margin: "24px 16px", padding: 24, minHeight: 280 }}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/movies" element={<ListMovie />} />
            <Route path="/movies/movie" element={<Movie />} />
            <Route path="/movies/movie/:id" element={<Movie />} />
            <Route path="/movie-details" element={<ListMovieDetail />} />
            <Route path="/movie-details/movie-detail" element={<MovieDetail />} />
            <Route path="/movie-details/movie-detail/:id" element={<MovieDetail />} />
            <Route path="/theaters" element={<ListTheater />} />
            <Route path="/theaters/theater" element={<Theater />} />
            <Route path="/theaters/theater/:id" element={<Theater />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Layouts;
