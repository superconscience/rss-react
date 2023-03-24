import { ChangeEvent, forwardRef } from 'react';
import { getRandomId, readImage } from '../../utils/functions';

export type UploadImageProps = {
  name: string;
  setImage: (src: string | null) => void;
};

export const UploadImage = forwardRef<HTMLInputElement, UploadImageProps>(
  ({ name, setImage }, ref) => {
    const id = `uploadImage-${getRandomId()}`;
    const onImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) {
        const file = event.target.files[0];
        if (file.size) {
          readImage(file, (src) => {
            setImage(src);
          });
        }
      } else {
        setImage(null);
      }
    };

    return (
      <>
        <label htmlFor={id} className="form-label">
          Upload Image
        </label>
        <input
          ref={ref}
          accept="image/*"
          className="form-control"
          type="file"
          id={id}
          name={name}
          onChange={onImageChange}
        />
      </>
    );
  }
);
