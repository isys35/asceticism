import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import React, { useRef, useState } from "react";
import { isAuthenticated, login } from "../auth/auth.js";
import classNames from "classnames";
import { Toast } from "primereact/toast";
import { Navigate } from "react-router-dom";
import { Message } from "primereact/message";
import { GITHUB_AUTH_URL } from "../config.js";
import useMainRedirect from "../hooks/useMainRedirect.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const redirect = useMainRedirect();
  const toast = useRef(null);

  const errorClass = classNames({
    "p-invalid": error,
  });

  const handleSubmit = async () => {
    setError("");
    try {
      const data = await login(email, password);
      if (data) {
        redirect();
      }
    } catch (error) {
      if (error instanceof Error) {
        // handle errors thrown from frontend
        setError("Не указан Email или пароль");
      } else {
        // handle errors thrown from backend
        setError(String(error));
      }
    }
  };

  if (isAuthenticated()) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex align-items-center justify-content-center h-screen">
      <Toast ref={toast} />
      <div className="surface-card p-4 shadow-2 border-round w-full sm:w-12 md:w-8 lg:w-6 xl:w-5 xxl:w-3">
        <div className="text-center mb-5">
          <div className="text-900 text-3xl font-medium mb-3 logo">
            ASCETICISM
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-900 font-medium mb-2">
            Email
          </label>
          <InputText
            id="email"
            type="text"
            placeholder="Email"
            className={"w-full mb-3 " + errorClass}
            onChange={event => setEmail(event.currentTarget.value)}
          />

          <label
            htmlFor="password"
            className="block text-900 font-medium mb-2">
            Пароль
          </label>
          <InputText
            type="password"
            placeholder="Пароль"
            className={"w-full mb-3 " + errorClass}
            onChange={event => setPassword(event.currentTarget.value)}
          />
          {error && (
            <Message
              className="w-full flex mb-3 mt-3"
              severity="error"
              text={error}
            />
          )}
          <Button
            label="Войти"
            icon="pi pi-user"
            className="w-full mt-4"
            onClick={handleSubmit}
          />
          <p className="mt-5 font-semibold">
            Или войдите с помощью других сервисов
          </p>
          <div className="flex">
            <a href={GITHUB_AUTH_URL}>
              <Button
                className="mr-4"
                label="Github"
                icon="pi pi-github"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
