import { createContext, useReducer } from 'react';

export const BankApiContext = createContext(null);
export const BankApiDispatchContext = createContext(null);

export function BankApiProvider({ children }) {
    const [bankApiData, dispatch] = useReducer(
        bankApiReducer,
        BankApiConnectionData
    );

    return (
        <BankApiContext.Provider value={bankApiData}>
            <BankApiDispatchContext.Provider value={dispatch}>
                {children}
            </BankApiDispatchContext.Provider>
        </BankApiContext.Provider>
    );
}

async function bankApiReducer(bankApiConn, action) {
    const makeConsulta = (endpoint, bankApiConn, method, args) => {

        return fetch(bankApiConn.url + '/' + endpoint, { method: method, body: JSON.stringify(args) })
            .then(response => response.json())
            .catch(error => {
                console.error('Error:', error);
            });

    };

    const endpoints = {
        signIn: 'v1/public/client/user/login',
        signUp: 'v1/public/client/user/register',
        getUser: 'v1/client/user/whoami',
        getBalance: 'v1/client/user/balance',
        getClients: 'v1/client/contact',
        getMovements: 'v1/client/movement'
    }

    //return makeConsulta(endpoints[action.type], bankApiConn, action.method, action.args);
    return fetch(bankApiConn.url + '/' + endpoints[action.type], { method: action.method, body: JSON.stringify(action.args) })
}

const BankApiConnectionData = {
    url: 'http://localhost:3000'
};

export const getApiData = (action) => {
    const endpoints = {
        signIn: 'v1/public/client/user/login',
        signUp: 'v1/public/client/user/register',
        getUser: 'v1/client/user/whoami',
        getBalance: 'v1/client/user/balance',
        getClients: 'v1/client/contact',
        movements: 'v1/client/movement',
        searchUser: 'v1/client/user/account',
        searchClient: 'v1/client/contact'
    }

    const bankApiToken = sessionStorage.getItem('bankApiToken')
    let header = {}
    if(action.type != 'signUp' || action.type != 'signIn' ) {
        header = {
            Authorization: `Bearer ${bankApiToken}`,
            'Accept-Language': 'es'
        }
    } else if(action.type == 'signIn'){
        header = {
            'Accept-Language': 'es'
        }
    }
        
    
    let url = '';
    let option = {
        headers: header, 
        method: action.method
    }
    if(action.method == 'GET' && action.type != 'searchUser' && action.type != 'searchClient') {
        url = 'http://localhost:3000' + '/' + endpoints[action.type] + '?' + ( new URLSearchParams( action.args ) ).toString();
    }
    else if(action.method == 'PATCH' && action.type == 'searchClient') {
        url = 'http://localhost:3000' + '/' + endpoints[action.type] + '/' + action.args[0];
        option.body = JSON.stringify(action.args[1])
    }
    else if(action.type == 'searchUser' || action.type == 'searchClient') {
        url = 'http://localhost:3000' + '/' + endpoints[action.type] + '/' + action.args[0];
    } 
    else {
        url = 'http://localhost:3000' + '/' + endpoints[action.type]
        option.body = JSON.stringify(action.args)
    }
    //return makeConsulta(endpoints[action.type], bankApiConn, action.method, action.args);
    return fetch(url, option)
        .then(response => response)
        .catch(error => {
            console.error(error);
        });
}