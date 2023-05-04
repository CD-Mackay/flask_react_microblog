import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Profile from "../Pages/Profile";
import "@testing-library/jest-dom";

const mockResponse = {
  username: "Charlie",
  id: 42,
  followed: true,
};

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockResponse),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/user/42",
  }),
}));

test("Display user Data", async () => {
  render(<Profile />);
  await waitFor(() => {
    expect(screen.getByTestId("username")).toHaveTextContent("Charlie");
  });
});
