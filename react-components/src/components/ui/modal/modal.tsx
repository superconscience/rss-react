import { Component } from 'react';
import { PropsWithClassNameAndChildren } from '../../../types/types';
import classNames from 'classnames';

export type ModalProps = PropsWithClassNameAndChildren & {
  isOpen: boolean;
};

export type ModalState = {
  isOpen: boolean;
};

export class Modal extends Component<PropsWithClassNameAndChildren & ModalProps, ModalState> {
  state: ModalState = {
    isOpen: false,
  };
  constructor(props: ModalProps) {
    super(props);
    this.state.isOpen = props.isOpen;
  }
  handleCloseClick = (): void => {
    this.setState({ isOpen: false });
  };
  render() {
    return (
      <div
        className={classNames('modal fade', { show: this.props.isOpen })}
        tabIndex={-1}
        aria-labelledby="modalLabel"
        aria-hidden={this.props.isOpen}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title bg-success" id="modalLabel">
                Success!
              </h5>
              <button type="button" className="btn-close" onClick={this.handleCloseClick}></button>
            </div>
            <div className="modal-body">{this.props.children}</div>
            <div className="modal-footer">
              <button type="button" onClick={this.handleCloseClick} className="btn btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
