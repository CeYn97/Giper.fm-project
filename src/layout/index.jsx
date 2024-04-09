import React from "react";
import { Layout as AntdLayout } from "antd";
import {
  useIsAuthenticated,
  useLogout,
  useMenu,
  useNavigation,
  useParsed,
} from "@refinedev/core";
import { Link } from "react-router-dom";

import { LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import { Button, Image, Space } from "antd";
import logo2 from "../assets/logo2.svg";

export const Layout = ({ children }) => {
  // const { data } = useIsAuthenticated();
  const { mutate: mutateLogout } = useLogout();
  const { push } = useNavigation();
  const { selectedKey, menuItems, defaultOpenKeys } = useMenu();
  const { pathname } = useParsed();

  return (
    <AntdLayout
      style={{
        minHeight: "100vh",
      }}
    >
      <div
        className="container"
        style={{ background: "white", opacity: "0.9" }}
      >
        <div className="layout-header">
          <Space
            size="large"
            style={{
              display: "flex",
              gap: 32,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Link to="/" style={{ flexGrow: 1 }}>
              <Image width="48px" src={logo2} alt="logo" preview={false} />
            </Link>
            {menuItems.map(({ key, name, label, icon, route }) => {
              const isSelected = key === selectedKey;
              return (
                <li key={name}>
                  <Link
                    to={route}
                    className={`nav-button ${
                      selectedKey === "/" ? "active" : ""
                    }`}
                    style={{
                      fontWeight: isSelected ? "bold" : "normal",
                      color: "black",
                      textDecoration: isSelected ? "underline" : "none",
                      textDecorationColor: "#242436",
                      textUnderlineOffset: "5px",
                    }}
                  >
                    {icon}
                    <span>{label ?? name}</span>
                  </Link>
                </li>
              );
            })}
            <Button
              type="primary"
              danger
              onClick={() => {
                mutateLogout();
              }}
              icon={<LogoutOutlined />}
              title="Logout"
              style={{ marginLeft: "auto" }}
            />
          </Space>
        </div>
      </div>
      <AntdLayout.Content>{children}</AntdLayout.Content>
    </AntdLayout>
  );
};
