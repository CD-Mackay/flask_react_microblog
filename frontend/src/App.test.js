import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import App from './App';

test('renders post area', () => {
  render(<BrowserRouter>
    <Layout>
      <App />
    </Layout>
  </BrowserRouter>);
  const postElement = screen.getByText(/post!/i);
  expect(postElement).toBeInTheDocument();
});
