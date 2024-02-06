import { Navigate } from "react-router-dom";

const style = {
  color: "black",
};

const Unauthorized = ({ setSignIn }) => {
  console.log("Inside unauthorized component");
  setSignIn(true);
  return (
    <>
      <h4 style={style}>User Unauthorized</h4>
      <Navigate to={"/signin"} />
    </>
  );
};

export default Unauthorized;
