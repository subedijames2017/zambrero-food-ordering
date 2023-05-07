import Spinner from "react-bootstrap/Spinner";

export function LoadingSpinner() {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "50px",
        height: "50px",
      }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
