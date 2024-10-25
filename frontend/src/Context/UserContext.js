import React, {createContext, useState} from "react";
import UserLinkedList from "../Structures/LinkedList";

//contexto
export const UserContext = createContext();

//proveedor de contexto
export const UserProvider = ({ children }) => {
    const [userList] = useState(new UserLinkedList());

    return (
        <UserContext.Provider value={userList}>
            {children}
        </UserContext.Provider>
    )
}