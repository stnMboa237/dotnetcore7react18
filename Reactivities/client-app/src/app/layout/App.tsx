import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './loadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  const {activityStore} = useStore()

  // Ici, on def 2 variables: activities (responsable de garder dans le state les objets take du back)
  // et setActivities (responsable de l'update des objets Activity recupérer du back)
  // [] initialise le state comme un array vide afin d'eviter une erreur lors du activities.map
  const [activities, setActivities] = useState<Activity[]>([]);

  const [submitting, setSubmitting] = useState(false);

  // Ici, useEffect nous permet de faire des actions quand notre appli se lance.
  // En l'occurence, on appelle la methode getActivities du back
  useEffect(() => {
    activityStore.loadActivities();
    
  }, [activityStore]); // [] permet d'executer la 'get' juste une fois. sinon, elle serait lancer n fois.

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Actvities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    });
  }

  if (activityStore.loadingInitial) return (<LoadingComponent content='Loading app' />)
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard 
          activities={activityStore.activities}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default observer(App);
