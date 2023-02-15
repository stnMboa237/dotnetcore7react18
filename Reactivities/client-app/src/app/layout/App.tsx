import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import HomePage from '../../features/activities/home/HomePage';
import { useStore } from '../stores/store';
import LoadingComponent from './loadingComponent';
import NavBar from './NavBar';

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  /*fonction executé au lancement de l'app */
  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <>
      {/* to use toast notifier inside our app, we must initialize it component firstly here */}
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
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
