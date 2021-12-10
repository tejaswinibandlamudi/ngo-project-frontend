import { Spinner } from "react-bootstrap";
export default function CustomSpinner() {
  return (
    <div>
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      <span>Loading...</span>
    </div>
  );
}
