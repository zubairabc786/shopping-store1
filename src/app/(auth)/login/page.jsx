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
import React from "react";
import LoginComponent from "../../../components/LoginComponent";

const LoginPage = ({ metadata }) => {
  return (
    <div>
      <h1>{metadata.title}</h1>
      <p>{metadata.description}</p>
      <LoginComponent />
    </div>
  );
};

export default LoginPage;

export async function getStaticProps() {
  return {
    props: {
      metadata: {
        title: "Login Page for User",
        description: "Description for login page",
      },
    },
  };
}
