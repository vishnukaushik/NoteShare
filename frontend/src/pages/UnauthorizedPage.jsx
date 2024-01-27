import { Navigate } from "react-router-dom";

const style = {
  color: "black",
};

const Unauthorized = () => {
  console.log("Inside unauthorized component");
  return (
    <>
      <h4 style={style}>User Unauthorized</h4>
      <Navigate to={"/login"} />
    </>
  );
};

export default Unauthorized;
