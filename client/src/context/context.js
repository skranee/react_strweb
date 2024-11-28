import { createContext } from "react";
import Store from "../store/store.ts";

const store = new Store();
export const Context = createContext({ store });

export default store;
