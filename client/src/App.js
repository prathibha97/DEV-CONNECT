import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Landing from "./components/layouts/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layouts/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/Routing/PrivateRoute";
import "./App.css";

// rudux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import { useEffect } from "react";
import CreateProfile from "./components/profile-form/CreateProfile";

function App() {
  useEffect(() => {
    // check for token in localStorage when app first runs
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route
            path="dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
           <Route
            path="create-profile"
            element={<PrivateRoute component={CreateProfile} />}
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
