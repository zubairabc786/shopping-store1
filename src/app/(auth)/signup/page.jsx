import React from "react";
import SignUpComponent from "../../../components/SignUpComponent";
const SignUp = () => {
  return (
    <div>
      <SignUpComponent />
    </div>
  );
};

export default SignUp;

export function generateMetadata() {
  return {
    title: "Sign Up page for user",
    description: "",
  };
}
