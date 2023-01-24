import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import {v4 as uuid} from "uuid";
import { runInThisContext } from "vm";

export default class ActivityStore{

    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    /*exple d'arrow function asynchrone*/
    loadActivities = async () => {
        /*parlant de funct dt on wait la promise, c'est d'etre asynchrone
        le code non asynchrone DOIT se trouver hors du bloc try/catch*/
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Actvities.list();
                activities.forEach(activity => {
                    activity.date = activity.date.split('T')[0];
                    this.activities.push(activity);
                });
            this.setLoadingInitial(false);
            
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
        
    }

    setLoadingInitial = (state: boolean) =>{
        this.loadingInitial = state;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(x => x.id === id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id? : string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Actvities.create(activity);
            runInAction(() => {
                this.activities.push(activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Actvities.update(activity);
            runInAction(() => {
                /*on cree un nouvel array contenant les valeurs respectant le predicat et on y rajoute
                l'elt updaté*/
                this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}