import { useState } from "react";
import { PasswordResetSuccess } from "./PasswordResetSuccess";
import { PasswordResetFail } from "./PasswordResetFail";
import { useQueryParams } from "../util/useQueryParams";
import { forgotPassword } from "../util/awsFunctions";
import { Auth } from "aws-amplify";

export const PasswordResetLandingPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [passwordResetCode, setPasswordResetCode] = useState("");
  const { email } = useQueryParams();

  const onResetClicked = async () => {
    const { forgotPasswordSubmit } = forgotPassword;
    forgotPasswordSubmit(
      email,
      passwordResetCode,
      passwordValue,
      setIsSuccess,
      setIsFailure
    );
  };

  const resendLink = async () => {
    try {
      await Auth.forgotPassword(email);
      console.log("Resent forgot password Link");
    } catch (e) {
      console.log("Error resending forgot password Link", e);
    }
  };

  if (isFailure) return <PasswordResetFail />;
  if (isSuccess) return <PasswordResetSuccess />;

  return (
    <div className="content-container">
      <h1>Reset Password</h1>
      <p>Please enter a new password</p>
      <input
        value={passwordResetCode}
        onChange={(e) => setPasswordResetCode(e.target.value)}
        placeholder="Password Reset Code"
      />
      <input
        type="password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        placeholder="Password"
      />
      <input
        type="password"
        value={confirmPasswordValue}
        onChange={(e) => setConfirmPasswordValue(e.target.value)}
        placeholder="Confirm Password"
      />
      <button
        disabled={
          !passwordValue ||
          !confirmPasswordValue ||
          passwordValue !== confirmPasswordValue
        }
        onClick={onResetClicked}
      >
        Reset Password
      </button>
      <button onClick={resendLink}>Resend Link</button>
    </div>
  );
};
