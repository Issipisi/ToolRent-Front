import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Home from './components/Home';
import ToolView from './components/ToolView';
import NotFound from './components/NotFound';
import CustomerView from "./components/CustomerView";
import { useKeycloak } from "@react-keycloak/web";

function App() {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) return <div>Cargando...</div>;

  const isLoggedIn = keycloak.authenticated;
  const roles = keycloak.tokenParsed?.realm_access?.roles || [];

  const PrivateRoute = ({ element, rolesAllowed }) => {
    if (!isLoggedIn) {
      keycloak.login();
      return null;
    }
    if (rolesAllowed && !rolesAllowed.some(r => roles.includes(r))) {
      return <h2>No tienes permiso para ver esta página</h2>;
    }
    return element;
  };

  if (!isLoggedIn) { 
    keycloak.login(); 
    return null; 
  }  

  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />

          {/* Solo ADMIN puede ver clientes */}
        <Route
          path="/customers/*"
          element={ <PrivateRoute element={<CustomerView />} rolesAllowed={["ADMIN"]}/>}
        />

        <Route
          path="/tools/*"
          element={ <PrivateRoute element={<ToolView />} rolesAllowed={["ADMIN"]}/>}
        />

          <Route path="*" element={<NotFound />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App
