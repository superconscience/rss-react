import { ChangeEvent, forwardRef } from 'react';
import { getRandomId, readImage } from '../../utils/functions';
import { DefaultFileInputProps, Validatable } from '../ui/common';
import classNames from 'classnames';

export type UploadImageProps = {
  name?: string;
  setImage: (src: string | null) => void;
  inputProps?: DefaultFileInputProps;
};

export const UploadImage = forwardRef<HTMLInputElement, UploadImageProps & Validatable>(
  ({ name, setImage, validClassName, inputProps }, ref) => {
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
          data-testid="upload-image"
          ref={ref}
          accept="image/*"
          className={classNames('form-control', validClassName)}
          type="file"
          id={id}
          name={name}
          {...inputProps}
          onChange={onImageChange}
        />
      </>
    );
  }
);
