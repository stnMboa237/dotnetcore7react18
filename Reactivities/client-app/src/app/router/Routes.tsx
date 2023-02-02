import { createBrowserRouter, RouteObject } from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/activityForm";
import TestErrors from "../../features/errors/TestError";
import App from "../layout/App";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: 'activities', element: <ActivityDashboard />},
            {path: 'activities/:id', element: <ActivityDetails />},
            {path: 'createActivity', element: <ActivityForm key='create'/>}, /*unsing Key inside the same component allows react to reset the state when the component Key changed*/
            {path: 'manage/:id', element: <ActivityForm key='manage'/>},
            {path: 'errors', element: <TestErrors />},
        ]
    }
]

export const router = createBrowserRouter(routes);