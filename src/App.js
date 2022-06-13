// Use of mui materials
import { Box } from '@mui/material';

// ROUTER
import { Route, Routes } from "react-router-dom";

// Pages & components
import Layout from './components/Layout';
import Home from './pages/Home.js';
import Profile from './pages/Profile.js';
import LoginRedirect from './pages/LoginRedirect.js';


function App() {
  return (
    <>
      <Box>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route exact path="/connect/:providerName/redirect" element={<LoginRedirect />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Box>
    </>
  );
}

export default App;
