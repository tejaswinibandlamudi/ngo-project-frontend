import { Button, Container, ButtonGroup } from "react-bootstrap";
import CustomSpinner from "./CustomSpinner";
interface Props {
  handleLoginSubmit: Function;
  handleSignupSubmit: Function;
  handleLogin: Function;
  handleSignup: Function;
  toggleLogin: boolean;
  setToggleLogin: Function;
  error: string;
  setError: Function;
  disable: boolean;
}
export default function LoginSignupButtons(props: Props) {
  const toggle = () => {
    props.setError("");
    props.setToggleLogin(!props.toggleLogin);
  };

  const variant = (active: boolean) => (active ? "danger" : "outline-danger");

  return (
    <Container fluid className="d-grid">
      <p>{props.error}</p>
      <ButtonGroup>
        <Button
          variant={variant(!props.toggleLogin)}
          onClick={
            props.toggleLogin
              ? toggle
              : props.handleLoginSubmit(props.handleLogin)
          }
          disabled={props.disable}
        >
          {props.disable && !props.toggleLogin ? <CustomSpinner /> : "Login"}
        </Button>
        <Button
          variant={variant(props.toggleLogin)}
          onClick={
            props.toggleLogin
              ? props.handleSignupSubmit(props.handleSignup)
              : toggle
          }
          disabled={props.disable}
        >
          {props.disable && props.toggleLogin ? <CustomSpinner /> : "Signup"}
        </Button>
      </ButtonGroup>
    </Container>
  );
}
