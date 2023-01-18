import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List, ListItem } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';

function App() {
  // Ici, on def 2 variables: activities (responsable de garder dans le state les objets take du back)
  // et setActivities (responsable de l'update des objets Activity recupérer du back)
  // [] initialise le state comme un array vide afin d'eviter une erreur lors du activities.map
  const [activities, setActivities] = useState<Activity[]>([]);

  // Ici, useEffect nous permet de faire des actions quand notre appli se lance.
  // En l'occurence, on appelle la methode getActivities du back
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data);
      })
  }, []); // [] permet d'executer la 'get' juste une fois. sinon, elle serait lancer n fois.
  return (
    <>
      <NavBar />
      <Container style={{marginTop:'7em'}}>
        <List>
          {activities.map((activity) => (
            <ListItem key={activity.id}>
              {activity.title}
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
}

export default App;
