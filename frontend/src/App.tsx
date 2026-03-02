import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App(): React.JSX.Element {
  return (
    <>
      <a href='#main-content' className='skip-link'>
        Skip to main content
      </a>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
