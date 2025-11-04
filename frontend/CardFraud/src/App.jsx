// import Dashboard from "./pages/Dashboard";

import { Routes ,Route} from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
//import { Route } from "lucide-react";
import UserAuthorizationPage from "./components/pages/UserAuthorizationPage";
import CardManagementPage from "./components/pages/CardManagementPage";
import AnalyticsPage from "./components/pages/AnalyticsPage";
import LoginPage from "./components/pages/LoginPage";
import RegistrationPage from "./components/pages/RegistrationPage";
import AdminProtectedWrapper from './components/pages/AdminProtectedWrapper'
import AccountAuthorization from "./components/pages/AccountAuthorization";

function App() {
  return (
    <>
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/dashboard" 
        element={
          <AdminProtectedWrapper>
        <Dashboard />
        </AdminProtectedWrapper>
        } />
        <Route path="/user-authorisation" element={<UserAuthorizationPage />} />
        <Route path="/card-management" element={<CardManagementPage />} />
        <Route path='/analytics' element={<AnalyticsPage/>} />
        <Route path="/account" element={<AccountAuthorization />} />
      </Routes>
    </div>
    </>
  );
}

export default App;