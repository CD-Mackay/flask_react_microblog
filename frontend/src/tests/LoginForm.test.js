import {
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import LoginForm from "../Components/LoginForm/LoginForm";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import React from "react";

test("Renders Login Form", async () => {
  render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );
  await waitFor(() => {
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  });
});

test("Shows Error Message if no input is provided", async () => {
  const setState = jest.fn();
  jest
    .spyOn(React, "useState")
    .mockImplementationOnce((initState) => [initState, setState]);

  render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  );

  const submitButton = screen.getByText("Login");
  fireEvent.click(submitButton);

  const error = screen.getByTestId("error")

  expect(error).toBeInTheDocument();
});
