import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LogInPage } from "./Pages/LogInPage";
import { SignUpPage } from "./Pages/SignUpPage";
import { UserInfoPage } from "./Pages/UserInfoPage";
import { PrivateRoute } from "./util/PrivateRoute";
import { EmailVerificationCodePage } from "./Pages/EmailVerificationCodePage";
import { ForgotPasswordPage } from "./Pages/ForgotPasswordPage";
import { PasswordResetLandingPage } from "./Pages/PasswordResetLandingPage";

export const MyRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<UserInfoPage />} />
      </Route>
      <Route path="/login" element={<LogInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="/signupCodeConfirmation"
        element={<EmailVerificationCodePage />}
      />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<PasswordResetLandingPage />} />
    </Routes>
  </BrowserRouter>
);
