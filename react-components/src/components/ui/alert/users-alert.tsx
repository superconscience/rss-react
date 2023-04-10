import classNames from 'classnames';
import { FC } from 'react';
import { PropsWithClassName } from '../../../types/types';

export type UsersAlertProps = PropsWithClassName & {
  onClose: () => void;
};

export const UsersAlert: FC<UsersAlertProps> = ({ className, onClose }) => (
  <div className={classNames('alert alert-success w-100', className)} role="alert">
    <span>
      <strong>Success!</strong> User has been added
    </span>
    <button onClick={onClose} type="button" className="btn-close" />
  </div>
);
