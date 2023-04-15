import { FC, PropsWithChildren } from 'react';
import { RegisterForm } from '../../components/register-form/register-form';
import { UsersAlert } from '../../components/ui/alert/users-alert';
import { Container } from '../../components/ui/container/container';
import { UserCard } from '../../components/user-card/user-card';
import { useAppContext } from '../../context/app-context';
import { useUsers } from '../../hooks/use-users';

const AlertPadding = ({ children, padding }: PropsWithChildren & { padding: number }) => (
  <div style={{ paddingTop: `${padding}px` }}>{children}</div>
);

export const Users: FC = () => {
  const [users] = useUsers();
  const { usersAlert } = useAppContext();
  return (
    <Container>
      <div className="row">
        <div
          className="col-12 position-relative"
          style={{ display: usersAlert.isOpen ? undefined : 'none' }}
        >
          <UsersAlert className="position-absolute" onClose={() => usersAlert.close()} />
        </div>
        <div className="col-12" onClick={() => usersAlert.close()}>
          <div className="row">
            <div className="col-xl-2 col-lg-3 col-md-4">
              <AlertPadding padding={50}>
                <RegisterForm showAlert={() => usersAlert.open()} />
              </AlertPadding>
            </div>
            <div className="col-xl-10 col-lg-9 col-md-8">
              <AlertPadding padding={50}>
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
              </AlertPadding>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
