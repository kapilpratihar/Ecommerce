import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Route } from "react-router-dom";

// export const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   return (
//     <Fragment>
//       {loading === false && (

//           {...rest}
//           render={(props) => {
//             if (isAuthenticated === false) {
//               //   return <Redirect to="/login" />;
//               return navigate("/login");
//             }

//             if (isAdmin === true && user.role !== "admin") {
//               //   return <Redirect to="/login" />;
//               return navigate("/login");
//             }

//             return <Component {...props} />;
//           }}

//       )}
//     </Fragment>
//   );
// };

function ProtectedRoute({ isAdmin, children }) {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (isAuthenticated === false) {
    //   return <Redirect to="/login" />;
    return navigate("/login");
  }

  if (isAdmin === true && user.role !== "admin") {
    //   return <Redirect to="/login" />;
    return navigate("/login");
  }

  return children;
}
export default ProtectedRoute;
