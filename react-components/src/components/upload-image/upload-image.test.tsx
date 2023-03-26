import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { UploadImage } from './upload-image';

const setImage = vi.fn();
const component = <UploadImage name="name" setImage={setImage} validClassName={'valid'} />;
const filename = 'chucknorris.png';
const createFile = () => new File(['(⌐□_□)'], filename, { type: 'image/png' });

describe('image input', () => {
  it('uploads images', async () => {
    const { unmount, getByTestId } = render(component);
    const imageInput = getByTestId('upload-image') as HTMLInputElement;
    const file = createFile();
    await waitFor(() =>
      fireEvent.change(imageInput, {
        target: { files: [file] },
      })
    );
    expect(imageInput.files?.[0].name).toBe(filename);
    expect(imageInput.files).toHaveLength(1);

    unmount();
  });
});
