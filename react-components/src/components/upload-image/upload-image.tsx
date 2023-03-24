import { ChangeEvent, Component } from 'react';
import { readImage } from '../../utils/functions';

export type UploadImageProps = {
  name: string;
  setImage: (src: string | null) => void;
};

export class UploadImage extends Component<UploadImageProps> {
  onImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      if (file.size) {
        readImage(file, (src) => {
          this.props.setImage(src);
        });
      }
    } else {
      this.props.setImage(null);
    }
  };

  render() {
    return (
      <>
        <label htmlFor="formFile" className="form-label">
          Upload Image
        </label>
        <input
          accept="image/*"
          className="form-control"
          type="file"
          id="formFile"
          name={this.props.name}
          onChange={this.onImageChange}
        />
      </>
    );
  }
}
