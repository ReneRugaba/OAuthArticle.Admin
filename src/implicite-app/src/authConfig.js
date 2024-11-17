

import { UserManager } from 'oidc-client';

const config = {
    authority: 'https://localhost:44310',
    client_id: 'client_id_implicit',
    redirect_uri: 'http://localhost:3000/callback',
    response_type: 'id_token token',  
    scope: 'rewardsApi.read openid',
    post_logout_redirect_uri: 'http://localhost:3000',
    automaticSilentRenew: true,
    silent_redirect_uri: 'http://localhost:3000/silent-renew.html',
};

const userManager = new UserManager(config);

export default userManager;
