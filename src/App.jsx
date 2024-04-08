import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { supabaseClient } from "./Providers/suparbaseClient";
import { dataProvider } from "@refinedev/supabase";
import authProvider from "./Providers/authProvider";
// import { liveProvider } from "@refinedev/supabase";
import { useNotificationProvider } from "@refinedev/antd";

import { ConfigProvider, App as AntdApp } from "antd";
import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";

import { Employees } from "./Pages/employess/list";
import { ShowEmployee } from "./Pages/employess/show";
import { ListOrders } from "./Pages/orders/list";
import { Login } from "./Pages/Login";
import { CalendarCreatePage } from "./Pages/calendar";
import { CalendarShowPage } from "./Pages/calendar";
import { CalendarEditPage } from "./Pages/calendar";
import { CalendarPageWrapper } from "./Pages/calendar";

import "antd/dist/reset.css";
import { ProductList } from "./Pages/products/list";

import React from "react";

import { blue } from "@ant-design/colors";

export default function App() {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <AntdApp>
          <Refine
            // liveProvider={liveProvider(supabaseClient)}
            dataProvider={dataProvider(supabaseClient)}
            authProvider={authProvider}
            routerProvider={routerProvider}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "Employees",
                list: "/Employess",
                show: "/Employess/:id",
                meta: { label: "Сотрудники" },
              },
              {
                name: "products",
                list: "/products",
                show: "/products/:id",
                meta: { label: "Продукты" },
              },
              {
                name: "orders",
                list: "/orders",
                meta: { label: "Заказы" },
              },
              {
                name: "events",
                list: "/calendar",
                show: "/calendar/show/:id",
                create: "calendar/create",
                edit: "/calendar/edit/:id",
                meta: { label: "События" },
              },
            ]}
            options={{ liveMode: "auto" }}
            onLiveEvent={(event) => {
              console.log(event);
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    redirectOnFail="/login"
                  >
                    <ThemedLayoutV2
                      Title={() => <ThemedTitleV2 text="Giper.fm" />}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="Employees" />}
                />
                <Route path="/Employess">
                  <Route index element={<Employees />} />
                  <Route path=":id" element={<ShowEmployee />} />
                </Route>
                <Route path="/products">
                  <Route index element={<ProductList />} />
                  {/* <Route path=":id" element={<ShowEmployee />} /> */}
                </Route>
                <Route path="/orders">
                  <Route index element={<ListOrders />} />
                </Route>
              </Route>
              <Route
                path="/calendar"
                element={
                  <CalendarPageWrapper>
                    <Outlet />
                  </CalendarPageWrapper>
                }
              >
                <Route index element={null} />
                <Route path="show/:id" element={<CalendarShowPage />} />
                <Route path="edit/:id" element={<CalendarEditPage />} />
                <Route path="create" element={<CalendarCreatePage />} />
              </Route>
              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="Employess" />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
              </Route>
            </Routes>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}
