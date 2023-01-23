import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

interface Store{
    activityStore: ActivityStore
}

/*tous les stores que nous allons creer serons instantier ici afin que nous ayons accès á eux dans le 
storeContext de react
*/
export const store: Store = {
    activityStore: new ActivityStore(),
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}