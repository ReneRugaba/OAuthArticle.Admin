import { createContext, useMemo, useState,useContext } from "react"

const CurrentUser= {
    name: "",
    roles:"",
    culture:"",
    token:"",
}

const usePassedDownObject = () => {
    const [currentUser, setCurrentUser] = useState(CurrentUser);

    const currentUserObject = useMemo(() => {
        return { currentUser, setCurrentUser };
    }, [currentUser, setCurrentUser]);

    return currentUserObject;
}

const CurrentUserContext = createContext(usePassedDownObject);
CurrentUserContext.displayName = 'CurrentUserContext';

export const useCurrentUser = () => {
    const context = useContext(CurrentUserContext);
    if (context === undefined) {
        throw new Error('useCurrentUser must be used within a CurrentUserContext');
    }
    return context;
}



export const CurrentUserProvider= ({ children }) => {
    
    return (
        <CurrentUserContext.Provider value={usePassedDownObject()}>
            {children}
        </CurrentUserContext.Provider>
    );
}
