import { Link, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";

const style = {
  color: "black",
};

const Unauthorized = () => {
  console.log("Inside unauthorized component");
  return (
    <>
      <h4 style={style}>User Unauthorized</h4>
      {/* <Link to={"./login"}>Login</Link> */}
      <Navigate to={"./login"} />
    </>
  );
};

export default Unauthorized;
