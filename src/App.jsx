// import PersonIcon from '@mui/icons-material/Person';
import { useDispatch } from 'react-redux';
import Home from './pages/home/Home';
import { useEffect, useState } from 'react';
import { getCurrentUser } from './store/slices/authSlice';
import Routing from './routing/Routing';
import Loader from './components/loader/Loader';
// import Profile from './components/profile/Profile';
// import Login from './pages/login/Login';
// import Register from './pages/register/Register'
function App() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(getCurrentUser(setLoading))
  }, []);

  return (
    <div>
    {loading ? <Loader />:  <Routing />}
    </div>
    
  );
}

export default App;
