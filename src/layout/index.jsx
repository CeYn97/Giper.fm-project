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
        backgroundImage: "url('/bg.png')",
        backgroundRepeat: "repeat-x",
      }}
    >
      <div className="container">
        <div className="layout-header">
          <Link to="/">
            <Image
              width="120px"
              src="/pixels-logo.svg"
              alt="Pixels Logo"
              preview={false}
            />
          </Link>
          <Space size="large">
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
                    }}
                  >
                    {icon}
                    <span>{label ?? name}</span>
                  </Link>
                </li>
              );
            })}
          </Space>
          <Space>
            <Button
              type="primary"
              danger
              onClick={() => {
                mutateLogout();
              }}
              icon={<LogoutOutlined />}
              title="Logout"
            />
          </Space>
        </div>
      </div>
      <AntdLayout.Content>{children}</AntdLayout.Content>
    </AntdLayout>
  );
};
