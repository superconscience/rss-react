import { Component } from 'react';
import { User } from '../../models/user';
import { capitalize } from '../../utils/functions';

export type UserCardProps = {
  user: User;
};

export class UserCard extends Component<UserCardProps> {
  render() {
    const { name, lastName, email, birthdate, state, city, gender, image, zip } = this.props.user;

    return (
      <div className="card">
        <img src={image} className="card-img-top" alt={name} style={{ maxHeight: 300 }} />
        <div className="card-body">
          <h3 className="card-title">
            <strong>
              {name} {lastName}
            </strong>
          </h3>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Email :</strong> {email}
          </li>
          <li className="list-group-item">
            <strong>Birth date :</strong> {birthdate.toLocaleDateString()}
          </li>
          <li className="list-group-item">
            <strong>Gender :</strong> {capitalize(gender)}
          </li>
          <li className="list-group-item">
            <strong>Location :</strong> {city}, {state}, {zip}
          </li>
        </ul>
      </div>
    );
  }
}
