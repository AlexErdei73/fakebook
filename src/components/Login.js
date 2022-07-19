import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { errorOccured } from "../features/user/userSlice";
import { signInUser } from "../backend/backend";

const Login = (props) => {
  const { onChange, user, onClickForgottenPswd } = props;

  // onChange function
  const handleChange = (e) => {
    onChange(e.target.name, e.target.value);
    dispatch(errorOccured(""));
  };

  const errorMsg = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(errorMsg);
  }, [errorMsg]);

  // Submit function (Create account)
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (user.email === "") {
      dispatch(errorOccured("Email is required."));
      return;
    } else if (user.password === "") {
      dispatch(errorOccured("Password is required."));
      return;
    }
    signInUser(user);
  };

  return (
    <>
      <Form noValidate onSubmit={handleSubmit} className="w-100">
        <Form.Control
          type="email"
          placeholder="Email"
          name="email"
          size="lg"
          className="mb-2 w-100"
          onChange={handleChange}
          isInvalid={
            errorMsg.indexOf("mail") !== -1 ||
            errorMsg.indexOf("identifier") !== -1
          }
        />
        <Form.Control
          type="text"
          placeholder="Password"
          name="password"
          size="lg"
          className="mb-2 w-100"
          onChange={handleChange}
          isInvalid={errorMsg !== ""}
        />
        <Form.Control.Feedback type="invalid">{errorMsg}</Form.Control.Feedback>
        <Button variant="primary" type="submit" size="lg" className="w-100">
          <b>Log In</b>
        </Button>
      </Form>
      <Button
        variant="link"
        type="link"
        className="w-100"
        id="link-button"
        onClick={onClickForgottenPswd}
      >
        Forgotten password?
      </Button>
    </>
  );
};

export default Login;
