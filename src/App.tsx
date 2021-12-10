import React, { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { User, initialUser } from "./components/Interfaces";
import Login from "./components/Login";
import Signup from "./components/Signup";
import LoginSignupButtons from "./components/LoginSignupButtons";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import UserProfile from "./components/UserProfile";

export default function App() {
  const [user, setUser] = useState<User>(initialUser);
  const [toggleLogin, setToggleLogin] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const testFunc = (_: any) => {};
  const [handleLogin, setHandleLogin] = useState<() => void>(() => testFunc);
  const [handleSignup, setHandleSignup] = useState<() => void>(() => testFunc);
  const [disable, setDisable] = useState<boolean>(false);
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors }
  } = useForm<FieldValues>();
  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
    getValues
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: "",
      lastName: ""
    }
  });

  return (
    <Container style={{ width: "20rem" }} className="rand">
      {user.firstName !== "" ? (
        <UserProfile user={user} />
      ) : (
        <div>
          {toggleLogin ? (
            <Signup
              register={registerSignup}
              setHandleSignup={setHandleSignup}
              setUser={setUser}
              setSignupError={setError}
              errors={signupErrors}
              getValues={getValues}
              setDisable={setDisable}
            />
          ) : (
            <Login
              register={registerLogin}
              setHandleLogin={setHandleLogin}
              setUser={setUser}
              setLoginError={setError}
              errors={loginErrors}
              setDisable={setDisable}
            />
          )}
          <LoginSignupButtons
            handleLogin={handleLogin}
            handleLoginSubmit={handleLoginSubmit}
            handleSignup={handleSignup}
            handleSignupSubmit={handleSignupSubmit}
            toggleLogin={toggleLogin}
            setToggleLogin={setToggleLogin}
            error={error}
            setError={setError}
            disable={disable}
          />
        </div>
      )}
    </Container>
  );
}
