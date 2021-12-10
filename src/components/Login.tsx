import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { initialUser, LoginModel } from "./Interfaces";
import axios from "axios";
import { useEffect } from "react";
import { Form, Badge } from "react-bootstrap";

interface Props {
  register: UseFormRegister<FieldValues>;
  setHandleLogin: Function;
  setUser: Function;
  setLoginError: Function;
  errors: FieldErrors<FieldValues>;
  setDisable: Function;
}

export default function Login(props: Props) {
  const onSubmit = (d: any) => {
    props.setDisable(true);
    console.log(d);
    const myLogin: LoginModel = d as LoginModel;
    const request = axios.create({
      baseURL: "https://volunteer-all-the-way.herokuapp.com/users/",
      // timeout: 1000,
      headers: {
        "Content-Type": "application/json"
        // or whatever you want, in key/value pair
      }
    });
    request
      .get(`login?email=${myLogin.email}&password=${myLogin.password}`)
      .then((res) => {
        if (!res.status) throw new Error(res.status.toString());
        return res.data;
      })
      .then((data) => {
        console.log(data);
        props.setLoginError("");
        props.setUser(data);
        props.setDisable(false);
      })
      .catch((status) => {
        console.log(status);
        props.setUser(initialUser);
        switch (status.toString().slice(-3)) {
          case "403":
            props.setLoginError("Incorrect Password");
            break;
          case "404":
            props.setLoginError("Email not found, Please register");
            break;
          default:
            props.setLoginError(`Something went wrong. Error code - ${status}`);
        }
        props.setDisable(false);
      });
  };

  useEffect(() => props.setHandleLogin(() => onSubmit), []);

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          {...props.register("email", {
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter a valid email" // JS only: <p>error message</p> TS only support string
            },
            required: {
              value: true,
              message: "Please enter an email address"
            }
          })}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
        {props.errors.email && (
          <Badge pill bg="danger">
            {props.errors.email.message}
          </Badge>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          {...props.register("password")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember me" />
      </Form.Group>
    </Form>
  );
}
