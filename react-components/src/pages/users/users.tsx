import { Component } from 'react';
import { Container } from '../../components/ui/container/container';
import { RegisterForm } from '../../components/register-form/register-form';
import { UsersContext, UsersContextProvider } from './utils';

export class Users extends Component {
  render() {
    return (
      <UsersContextProvider>
        <Container>
          <UsersContext.Consumer>
            {({ users, addUser }) => (
              <div className="row">
                <div className="col-xl-2 col-lg-3 col-md-4">
                  <RegisterForm addUser={addUser} />
                </div>
                <div className="col-xl-10 col-lg-9 col-md-8">{JSON.stringify(users)}</div>
              </div>
            )}
          </UsersContext.Consumer>
        </Container>
      </UsersContextProvider>
    );
  }
}
