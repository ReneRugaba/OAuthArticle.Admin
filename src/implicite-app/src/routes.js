import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import { useCurrentUser } from './auth/CurrentUserProvider';
import LoginButton from './shared/LoginButton';
import LogoutButton from './shared/LogoutButton';
import Callback from './Callback';
import ConnectedComponent from './connectedComponent';

const RoutesContext = () => {
    
    return (
        <div>
            <h1>Application React avec OAuth 2.0 / OpenID Connect</h1>
            <LoginButton />
            <LogoutButton />
            <Routes>
                <Route path="/callback" element={<Callback />} />
                <Route path="/home" element={<ConnectedComponent />} />
            </Routes>
        </div>
    );
}
export default RoutesContext;