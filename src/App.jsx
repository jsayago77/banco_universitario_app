import './App.css';
import Routers from './providers';
import { BankApiProvider } from './providers/bankApiProvider';
import { UserProvider } from './providers/userContext';

function App() {

  return (
    <BankApiProvider>
      <UserProvider>
        <Routers />
      </UserProvider>
    </BankApiProvider>
  )
}

export default App
