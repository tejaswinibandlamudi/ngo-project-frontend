import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormGetValues
} from "react-hook-form";
import { initialUser, SignupModel } from "./Interfaces";
import axios from "axios";
import { useEffect } from "react";
import { Form, Row, Col, Badge } from "react-bootstrap";

interface Props {
  register: UseFormRegister<FieldValues>;
  setHandleSignup: Function;
  setUser: Function;
  setSignupError: Function;
  errors: FieldErrors<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  setDisable: Function;
}

export default function Login(props: Props) {
  const onSubmit = (d: any) => {
    props.setDisable(true);
    console.log(d);
    const mysignUp: SignupModel = d as SignupModel;
    const request = axios.create({
      baseURL: "https://volunteer-all-the-way.herokuapp.com/users/",
      // timeout: 1000,
      headers: {
        "Content-Type": "application/json"
        // or whatever you want, in key/value pair
      }
    });
    request
      .post(`register`, mysignUp)
      .then((res) => {
        if (!res.status) throw new Error(res.status.toString());
        return res.data;
      })
      .then((data) => {
        console.log(data);
        props.setSignupError("");
        props.setUser(data);
        props.setDisable(false);
      })
      .catch((status) => {
        console.log(status);
        props.setUser(initialUser);
        switch (status.toString().slice(-3)) {
          case "409":
            props.setSignupError("Email already exists, login instead");
            break;
          default:
            props.setSignupError(
              `Something went wrong. Error code - ${status}`
            );
        }
        props.setDisable(false);
      });
  };

  useEffect(() => props.setHandleSignup(() => onSubmit), []);

  return (
    <Form>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formGroupFirstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              placeholder="First name"
              {...props.register("firstName", {
                required: {
                  value: true,
                  message: "Please enter your first name"
                },
                minLength: {
                  value: 2,
                  message: "Please enter a valid name"
                }
              })}
            />
            {props.errors.firstName && (
              <Badge pill bg="danger">
                {props.errors.firstName.message}
              </Badge>
            )}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formGroupLastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              placeholder="Last name"
              {...props.register("lastName", {
                required: {
                  value: true,
                  message: "Please enter your last name"
                },
                minLength: {
                  value: 2,
                  message: "Please enter a valid last name" // JS only: <p>error message</p> TS only support string
                }
              })}
            />
            {props.errors.lastName && (
              <Badge pill bg="danger">
                {props.errors.lastName.message}
              </Badge>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          {...props.register("email", {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email"
            },
            required: {
              value: true,
              message: "Please enter an email"
            }
          })}
        />
        {props.errors.email && (
          <Badge pill bg="danger">
            {props.errors.email.message}
          </Badge>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          {...props.register("password", {
            minLength: {
              value: 8,
              message: "Password should've min 8 characters"
            },
            required: {
              value: true,
              message: "Password field can't be empty"
            }
          })}
        />
        {props.errors.password && (
          <Badge pill bg="danger">
            {props.errors.password.message}
          </Badge>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Re-enter Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          {...props.register("rePassword", {
            validate: {
              checkPasswords: (value) =>
                value === props.getValues("password") ||
                "Passwords do not match"
            }
          })}
        />
        {props.errors.rePassword && (
          <Badge pill bg="danger">
            {props.errors.rePassword.message}
          </Badge>
        )}
      </Form.Group>
    </Form>
  );
}
