import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { supabaseClient } from "./Providers/suparbaseClient";
import { dataProvider } from "@refinedev/supabase";
import authProvider from "./Providers/authProvider";

import { ConfigProvider, App as AntdApp } from "antd";
import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";

import { Employees } from "./Pages/employess/list";
import { ShowEmployee } from "./Pages/employess/show";

import { Login } from "./Pages/Login";

import "antd/dist/reset.css";
import { ProductList } from "./Pages/products/list";

export default function App() {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <AntdApp>
          <Refine
            dataProvider={dataProvider(supabaseClient)}
            authProvider={authProvider}
            routerProvider={routerProvider}
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
                meta: { label: "Мерч" },
              },
            ]}
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
