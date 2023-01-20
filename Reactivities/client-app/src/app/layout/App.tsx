import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List, ListItem } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  // Ici, on def 2 variables: activities (responsable de garder dans le state les objets take du back)
  // et setActivities (responsable de l'update des objets Activity recupérer du back)
  // [] initialise le state comme un array vide afin d'eviter une erreur lors du activities.map
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  // const [editMode, setEditMode] = useState(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  // Ici, useEffect nous permet de faire des actions quand notre appli se lance.
  // En l'occurence, on appelle la methode getActivities du back
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data);
      })
  }, []); // [] permet d'executer la 'get' juste une fois. sinon, elle serait lancer n fois.

  function handleSelectActivity(id: string){
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectedActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity){
    activity.id ? 
      setActivities([...activities.filter(x => x.id !== activity.id), activity]) : 
      setActivities([...activities, activity]);
    setEditMode(false);
    setSelectedActivity(activity)
  }

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard activities={activities} 
          selectedActivity={selectedActivity} 
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectedActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
        />
      </Container>
    </>
  );
}

export default App;
