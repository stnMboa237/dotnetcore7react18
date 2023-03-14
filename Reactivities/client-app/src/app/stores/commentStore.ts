import { HubConnection } from "@microsoft/signalr";
import { HubConnectionBuilder } from "@microsoft/signalr/dist/esm/HubConnectionBuilder";
import { LogLevel } from "@microsoft/signalr/dist/esm/ILogger";
import { makeAutoObservable, runInAction } from "mobx";
import { ChatComment } from "../models/comment";
import { store } from "./store";

export default class CommentStore {
    comments: ChatComment[] = [];
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = (activityId: string) => {
        if (store.activityStore.selectedActivity) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl('http://localhost:5000/chat?activityId=' + activityId, {
                    accessTokenFactory: () => store.userStore.user?.token!
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            // active la connection á l'HUB pour l'activité ayant Id activityId. Donc tous les commentaires liées á cette activités vont se charger
            this.hubConnection.start().catch(error => console.log('Error establishing the connection to the HUB: ' + error));

            // et pour charger les commentaires, on use la méthode defini dans le HUB coté back onConnectedAsync. 
            // le nom de la methode á take se call "LoadComments" dans ce cas. LES NOMS DOIVENT MATCHER!!!
            this.hubConnection.on('LoadComments', (commentsFromBack: ChatComment[]) => {
                runInAction(() => this.comments = commentsFromBack)
            });

            this.hubConnection.on('ReceiveComment', (commentToSend: ChatComment) => {
                runInAction(() => this.comments.push(commentToSend));
            });
        }
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log('Error stopping connection the the HUB: ' + error));
    }

    clearComments = () => {
        this.comments = [];
        this.stopHubConnection();
    }
}