import { render, screen } from "@testing-library/react";
import UserCard from "../Components/UserCard/UserCard";

const dummyData = {
  username: "Charlie",
  id: 42,
  followed: true,
};
test("Show User Profile", async () => {
  render(<UserCard profile={dummyData} />);

  expect(screen.getByTestId("username")).toHaveTextContent("Charlie");
});
