import React from "react";
import { AuthPage } from "@refinedev/antd";
import logo from "../assets/logo.svg";

import {
  useLink,
  useRouterType,
  useActiveAuthProvider,
  useLogin,
  useTranslate,
  useRouterContext,
} from "@refinedev/core";
import { ThemedTitleV2 } from "@refinedev/antd";
import {
  bodyStyles,
  containerStyles,
  headStyles,
  layoutStyles,
  titleStyles,
} from "./styles";
import {
  Row,
  Col,
  Layout,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
  Divider,
  theme,
} from "antd";

export const LoginPage = ({
  providers,
  registerLink,
  forgotPasswordLink,
  rememberMe,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  title,
  hideForm,
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const translate = useTranslate();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const authProvider = useActiveAuthProvider();
  const { mutate: login, isLoading } = useLogin({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const PageTitle =
    title === false ? null : (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "32px",
          fontSize: "20px",
        }}
      >
        <img src={logo} alt="logo" />
      </div>
    );

  const CardTitle = (
    <Typography.Title
      level={3}
      style={{
        color: token.colorPrimaryTextHover,
        ...titleStyles,
      }}
    >
      {translate("pages.login.title", "Войти в свой аккаунт")}
    </Typography.Title>
  );

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          {providers.map((provider) => {
            return (
              <Button
                key={provider.name}
                type="default"
                block
                icon={provider.icon}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: "8px",
                }}
                onClick={() =>
                  login({
                    providerName: provider.name,
                  })
                }
              >
                {provider.label}
              </Button>
            );
          })}
          {!hideForm && (
            <Divider>
              <Typography.Text
                style={{
                  color: token.colorTextLabel,
                }}
              >
                {translate("pages.login.divider", "or")}
              </Typography.Text>
            </Divider>
          )}
        </>
      );
    }
    return null;
  };

  const CardContent = (
    <Card
      title={CardTitle}
      headStyle={headStyles}
      bodyStyle={bodyStyles}
      style={{
        ...containerStyles,
        backgroundColor: token.colorBgElevated,
      }}
      {...(contentProps ?? {})}
    >
      {renderProviders()}
      {!hideForm && (
        <Form
          layout="vertical"
          form={form}
          onFinish={(values) => login(values)}
          requiredMark={false}
          initialValues={{
            remember: false,
          }}
          {...formProps}
        >
          <Form.Item
            name="email"
            label={translate("pages.login.fields.email", "Email")}
            rules={[
              { required: true },
              {
                type: "email",
                message: translate(
                  "pages.login.errors.validEmail",
                  "Invalid email address"
                ),
              },
            ]}
          >
            <Input
              size="large"
              placeholder={translate("pages.login.fields.email", "Email")}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={translate("pages.login.fields.password", "Пароль")}
            rules={[{ required: true }]}
          >
            <Input
              type="password"
              autoComplete="current-password"
              placeholder="●●●●●●●●"
              size="large"
            />
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          >
            {rememberMe ?? (
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox
                  style={{
                    fontSize: "12px",
                  }}
                >
                  {translate(
                    "pages.login.buttons.rememberMe",
                    "Запомнить меня"
                  )}
                </Checkbox>
              </Form.Item>
            )}
            {forgotPasswordLink ?? (
              <ActiveLink
                style={{
                  color: "#9f6ff2",
                  fontSize: "12px",
                  marginLeft: "auto",
                }}
                to="/forgot-password"
              >
                {translate(
                  "pages.login.buttons.forgotPassword",
                  "Забыли пароль?"
                )}
              </ActiveLink>
            )}
          </div>
          {!hideForm && (
            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={isLoading}
                block
              >
                {translate("pages.login.signin", "Войти")}
              </Button>
            </Form.Item>
          )}
        </Form>
      )}

      {registerLink ?? (
        <div
          style={{
            marginTop: hideForm ? 16 : 8,
          }}
        >
          <Typography.Text style={{ fontSize: 12 }}>
            {translate("pages.login.buttons.noAccount", "Нет аккаунта?")}{" "}
            <ActiveLink
              to="/register"
              style={{
                fontWeight: "bold",
                color: "#9f6ff2",
              }}
            >
              {translate("pages.login.signup", "Зарегестрироваться")}
            </ActiveLink>
          </Typography.Text>
        </div>
      )}
    </Card>
  );

  return (
    <Layout style={layoutStyles} {...(wrapperProps ?? {})}>
      <Row
        justify="center"
        align={hideForm ? "top" : "middle"}
        style={{
          padding: "16px 0",
          minHeight: "100dvh",
          paddingTop: hideForm ? "15dvh" : "16px",
        }}
      >
        <Col xs={22}>
          {renderContent ? (
            renderContent(CardContent, PageTitle)
          ) : (
            <>
              {PageTitle}
              {CardContent}
            </>
          )}
        </Col>
      </Row>
    </Layout>
  );
};
