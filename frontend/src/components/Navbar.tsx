import { useNavigate } from 'react-router-dom';
import './WantedPoster.css';

interface NavbarProps {
  wantedUser: string | null;
}

const Navbar = ({ wantedUser }: NavbarProps): React.JSX.Element => {
  const navigate = useNavigate();

  function handleLogout(): void {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <nav aria-label='Main navigation' className='flex items-center relative'>
      <img
        src='/chorepal-logo-optimized.png'
        width='150'
        height='150'
        alt='ChorePal Logo'
      />
      <div>
        <h1 className='text-6xl text-black font-extrabold drop-shadow-sm'>
          ChorePal
        </h1>
        <h3 className='text-2xl font-semibold text-orange-800 mt-2'>
          Plan it. Do it.
        </h3>
        <div className='poster-container' aria-label='Wanted poster'>
          <div className='poster-title' aria-hidden='true'>
            🔥 Wanted 🔥
          </div>
          <div className='poster-user'>
            {wantedUser ? wantedUser : 'No one... yet'}
          </div>
          <div className='poster-divider'>Dead or Alive</div>
        </div>
      </div>

      <div className='ml-auto mr-5'>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </nav>
  );
};

export default Navbar;
