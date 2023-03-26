import { Component } from 'react';
import { PropsWithClassName } from '../../../types/types';
import classNames from 'classnames';

export type UsersAlertProps = PropsWithClassName & {
  onClose: () => void;
};

export class UsersAlert extends Component<UsersAlertProps> {
  render() {
    return (
      <div className={classNames('alert alert-success w-100', this.props.className)} role="alert">
        <span>
          <strong>Success!</strong> User has been added
        </span>
        <button onClick={this.props.onClose} type="button" className="btn-close" />
      </div>
    );
  }
}
