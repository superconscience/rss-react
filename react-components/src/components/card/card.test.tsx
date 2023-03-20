import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { Card, CardProps } from './card';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('Card', async () => {
  const card: CardProps['card'] = {
    title: 'Title',
    author: 'Author',
    link: '/',
    tags: 'Tags',
    likes: 1,
    views: 1,
    image: 'card-01.jpg',
  };
  it('renders card data and elements', async () => {
    const { container, getByText, getByRole, getAllByRole } = render(<Card card={card} />, {
      wrapper: BrowserRouter,
    });

    const titleRegexp = new RegExp(card.title, 'i');
    const authorRegexp = new RegExp(card.author, 'i');
    const tagsRegexp = new RegExp(card.tags, 'i');

    const title = getByText(titleRegexp);
    const author = getByText(authorRegexp);
    const tags = getByText(tagsRegexp);
    const image = getByRole('img');
    const links = getAllByRole('link');
    const icons = container.querySelectorAll('svg');

    [title, author, tags, image].forEach((elem) => {
      expect(elem).toBeInTheDocument();
    });

    expect(links).toHaveLength(2);
    expect(icons).toHaveLength(2);
  });
});
