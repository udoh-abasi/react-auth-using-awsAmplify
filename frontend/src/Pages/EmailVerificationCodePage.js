import { useState } from "react";
import { EmailVerificationSuccess } from "./EmailVerificationSuccess";
import { EmailVerificationFail } from "./EmailVerificationFail";
import { useQueryParams } from "../util/useQueryParams";
import {
  confirmSignUpCode,
  resendSignUpConfirmationCode,
} from "../util/awsFunctions";

export const EmailVerificationCodePage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);

  const [verificationString, setVerificationString] = useState("");
  const { email } = useQueryParams();

  const onSubmitVerificationString = async () => {
    confirmSignUpCode(email, verificationString, setIsSuccess, setIsFailure);
  };

  if (isSuccess) return <EmailVerificationSuccess />;
  if (isFailure) return <EmailVerificationFail />;

  return (
    <div className="content-container">
      <h1>Please Verify Your Email</h1>
      <p>
        You should have received a verification code at the email address you
        provided. Please enter it here:
      </p>
      <input
        placeholder="e.g. 123456"
        value={verificationString}
        onChange={(e) => setVerificationString(e.target.value)}
      />

      <button onClick={onSubmitVerificationString}>Submit</button>
      <button
        onClick={() => {
          resendSignUpConfirmationCode(email);
        }}
      >
        Resend sign up code
      </button>
    </div>
  );
};
