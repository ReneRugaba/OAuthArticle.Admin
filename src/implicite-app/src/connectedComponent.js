
import React, { useEffect } from 'react';
import { useCurrentUser } from './auth/CurrentUserProvider';

const ConnectedComponent = () => {
    const { currentUser } = useCurrentUser();
    const [user, setUser] = React.useState(currentUser);
    const [data, setData] = React.useState("");
    useEffect(() => {
        console.log('Utilisateur connecté:', currentUser);
        setUser(currentUser.currentUser);
    }, [user,data]);

    const getData = async () => {
        try {
            console.log('Utilisateur connecté:', user.token);
    
            // Envoi de la requête avec le token
            const response = await fetch("https://localhost:7019/api/Rewards", {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${user.token}`,
                }
              });
    
            // Vérification de l'état de la réponse
            if (!response.ok) {
                console.error(`Erreur HTTP : ${response.status}`);
                console.error(response);
                return;
            }
    
            
            
            setData("tu as accès aux données API");
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
        }
    };
    

    return (<>
        <h1>Utilisateur {user?.name} connecté</h1>
        <h2>Token: {user?.token}</h2>
        <button onClick={getData} >Get Data</button>
        {data && (<div>{data}</div>)}
    </>)
}
export default ConnectedComponent;