// import React from "react";
// import LoginComponent from "../../../components/LoginComponent";

// const LoginPage = () => {
//   return (
//     <div>
//       <LoginComponent />
//     </div>
//   );
// };

// export default LoginPage;

// export function generateMetadata() {
//   return {
//     title: "Login Page for User",
//     description: "Description for login page",
//   };
// }
// app/login/page.js
import React from "react";
import LoginComponent from "../../../components/LoginComponent";

const LoginPage = () => {
  return (
    <div>
      <LoginComponent />
    </div>
  );
};

export default LoginPage;

export function generateMetadata() {
  return {
    title: "Login Page for User",
    description: "Description for login page",
  };
}
