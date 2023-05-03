import { render, screen } from '@testing-library/react';
import UserCard from '../Components/UserCard/UserCard';


test("Show User Profile", () => {
  render(<UserCard /> );
})