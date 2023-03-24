import { Component } from 'react';
import { Container } from '../../components/ui/container/container';
import { RegisterForm } from '../../components/register-form/register-form';
import { UsersContext, UsersContextProvider } from './utils';
import { UserCard } from '../../components/user-card/user-card';

export class Users extends Component {
  render() {
    return (
      <UsersContextProvider>
        <Container>
          <UsersContext.Consumer>
            {({ users, addUser }) => (
              <div className="row">
                <div className="col-xl-2 col-lg-3 col-md-4 border-end">
                  <RegisterForm addUser={addUser} />
                </div>
                <div className="col-xl-10 col-lg-9 col-md-8">
                  {users.length > 0 && (
                    <div className="col-xl-10 col-lg-9 col-md-8">
                      <div className="row g-3">
                        {users.map((user) => (
                          <div key={user.id} className="col-xs-3 col-lg-4 col-md-6 col-sm-6 ">
                            <UserCard user={user} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {users.length === 0 && <h2>No Users registered yet</h2>}
                </div>
              </div>
            )}
          </UsersContext.Consumer>
        </Container>
      </UsersContextProvider>
    );
  }
}
