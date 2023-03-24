import { Component } from 'react';
import { Container } from '../../components/ui/container/container';
import { RegisterForm } from '../../components/register-form/register-form';
import { UserCard } from '../../components/user-card/user-card';
import { AppContext } from '../../context/app-context';

export class Users extends Component {
  render() {
    return (
      <Container>
        <AppContext.Consumer>
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
        </AppContext.Consumer>
      </Container>
    );
  }
}
