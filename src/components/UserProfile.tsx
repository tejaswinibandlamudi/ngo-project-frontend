import { User } from "./Interfaces";
interface Props {
  user: User;
}
export default function UserProfile(props: Props) {
  return (
    <div>
      <p> Email: {props.user.email}</p>
      <p> First Name: {props.user.firstName} </p>
      <p> Last Name: {props.user.lastName}</p>
    </div>
  );
}
