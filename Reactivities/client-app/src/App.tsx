import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Button, Header, List, ListItem } from 'semantic-ui-react';
import { LanguageServiceMode } from 'typescript';

function App() {
  // Ici, on def 2 variables: activities (responsable de garder dans le state les objets take du back)
  // et setActivities (responsable de l'update des objets Activity recupérer du back)
  const [activities, setActivities] = useState([]); // [] initialise le state comme un array vide afin d'eviter une erreur lors du activities.map

  // Ici, useEffect nous permet de faire des actions quand notre appli se lance.
  // En l'occurence, on appelle la methode getActivities du back
  useEffect(() =>{
    axios.get('http://localhost:5000/api/activities')
    .then(response => {
      console.log(response);
      setActivities(response.data);
    })
  }, []); // [] permet d'executer la 'get' juste une fois. sinon, elle serait lancer n fois.
  return (
    <div className="App">
      <Header as='h2' icon='users' content='Reactivities'/>
        <List>
          {activities.map((activity: any) => (
            <ListItem key={activity.id}>
              {activity.title}
            </ListItem>
          ))}
        </List>
    </div>
  );
}

export default App;
