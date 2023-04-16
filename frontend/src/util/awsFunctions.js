import { Amplify, Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);

// SIGN UP CODE

export const signUp = async (email, password, setErrorMessage, navigate) => {
  try {
    const dataObject = await Auth.signUp({
      username: email,
      password,
      attributes: { email },
      autoSignIn: { enabled: true },
    });
    navigate(`/signupCodeConfirmation?email=${encodeURIComponent(email)}`);

    console.log(dataObject);
  } catch (error) {
    console.log("Error signing up", error);
    switch (error.name) {
      case "UsernameExistsException": {
        setErrorMessage("Email already exist, sign in instead");
        return;
      }
      case "InvalidPasswordException": {
        setErrorMessage("Password does not match expectation");
        return;
      }
      default: {
        setErrorMessage("Uh..Oh, Something went wrong, try again");
      }
    }
  }
};

// CONFIRM SIGN-UP CODE

export const confirmSignUpCode = async (
  email,
  verificationString,
  setIsSuccess,
  setIsFailure
) => {
  try {
    console.log(email);
    console.log(verificationString);
    await Auth.confirmSignUp(email, verificationString);
    setIsSuccess(true);
  } catch (e) {
    console.log("Error confirming password");
    setIsFailure(true);
  }
};

// RESEND SIGN-UP CONFIRMATION CODE
export const resendSignUpConfirmationCode = async (email) => {
  try {
    await Auth.resendSignUp(email);
    console.log("code resent successfully");
  } catch (error) {
    console.log("Error Sending code", error);
  }
};

//LOGIN CODE

export const logIn = async (email, password, setErrorMessage, navigate) => {
  try {
    await Auth.signIn(email, password);
    navigate(`/`);
  } catch (e) {
    setErrorMessage("Incorrect username or password");
    console.log("Error Signing In", e);
  }
};

// SIGN OUT
export const signOut = async (navigate) => {
  try {
    await Auth.signOut();
    navigate("/login");
  } catch (e) {
    console.log("Error Signing out", e);
  }
};

// GLOBAL SIGN-OUT
export const globalSignOut = async (navigate) => {
  try {
    await Auth.signOut({ global: true });
    navigate("/login");
  } catch (error) {
    console.log("Error Signing Up Globally", error);
  }
};

// DELETING A USER.
// NOTE: IF YOU ARE USING A DATABASE, MAKE SURE YOU ALSO IMPLEMENT CODE IN THE 'try' BLOCK, TO DELETE THE USER FROM YOU DATABASE

export const deleteUser = async (navigate) => {
  try {
    const result = await Auth.deleteUser();
    console.log(result);
    navigate("/login");
  } catch (error) {
    console.log("Error deleting user", error);
  }
};

// FORGOT PASSWORD
export const forgotPassword = {
  //SEND FORGOT PASSWORD CODE
  sendForgotPasswordCode: async (
    email,
    navigate,
    setSuccess,
    setErrorMessage
  ) => {
    try {
      await Auth.forgotPassword(email).then((data) => console.log(data)); // NOTE: This line of code can also be used to resend the six digit code for 'forgot password'
      setSuccess(true);
      setTimeout(() => {
        navigate(`/reset-password?email=${encodeURIComponent(email)}`);
      }, 3000);
    } catch (error) {
      console.log(
        "Error sending forgot password confirmation code error",
        error
      );
      setErrorMessage(error.message);
    }
  },

  // CHANGE THE USER'S PASSWORD TO THE NEW PASSWORD IF CONFIRMATION CODE IS CORRECT
  forgotPasswordSubmit: async (
    email,
    code,
    newPassword,
    setIsSuccess,
    setIsFailure
  ) => {
    try {
      await Auth.forgotPasswordSubmit(email, code, newPassword).then((data) =>
        console.log(data)
      );
      setIsSuccess(true);
    } catch (error) {
      console.log("Error when submitting forgot password code", error);
      setIsFailure(true);
    }
  },
};
