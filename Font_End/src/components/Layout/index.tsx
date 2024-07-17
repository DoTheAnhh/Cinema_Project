import React, { useState } from "react";
import { Layout, Menu, Button } from 'antd';
import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ProductOutlined } from "@ant-design/icons";
import { Link, Route, Routes } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import Home from "../Home";
import Movie from "../Movie/components/Movie";

const Layouts: React.FC = () => {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<HomeOutlined />} >
            <Link to="/dotheanh/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ProductOutlined />}>
            <Link to="/dotheanh/movies">Movie Manage</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
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
            <Route path="/movies" element={<Movie />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Layouts;
