import { render, screen } from "@testing-library/react";
import PostList from "../Components/PostList/PostList";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

const mockPosts = [
  {
    author: "Charlie",
    user_id: 42,
    content: "A test post!",
    title: "What is this?",
  },
  {
    author: "Frank",
    user_id: 50,
    content: "In this trying time?",
    title: "Can I offer you a nice egg",
  },
  {
    author: "Glenn",
    user_id: 31,
    content: "About Blackberry",
    title: "I'm bald because of a movie",
  },
];

test("Renders Child components", async () => {
  render(
    <BrowserRouter>
      <PostList posts={mockPosts} />
    </BrowserRouter>
  );
  // expect(screen.getByText("About BlackBerry")).toBeInTheDocument();
  const posts = await screen.findAllByTestId("post-item");
  expect(posts).toHaveLength(3);
});
