import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import HomePage from '../../features/activities/home/HomePage';
import NavBar from './NavBar';

function App() {
  const location = useLocation();
  return (
    <>
    {/* to use toast notifier inside our app, we must initialize it component firstly here */}
    <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
      {
        location.pathname === '/' ? <HomePage /> : (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Outlet />
            </Container>
          </>
        )
      }
    </>
  );
}

export default observer(App);
