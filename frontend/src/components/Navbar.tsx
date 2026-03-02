import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../hooks/useDarkMode';
import './WantedPoster.css';

interface NavbarProps {
  wantedUser: string | null;
}

const Navbar = ({ wantedUser }: NavbarProps): React.JSX.Element => {
  const navigate = useNavigate();
  const [isDark, toggleDark] = useDarkMode();

  function handleLogout(): void {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <nav
      aria-label='Main navigation'
      className='flex items-center relative dark:bg-gray-900/40'
    >
      <img
        src='/chorepal-logo-optimized.png'
        width='150'
        height='150'
        alt='ChorePal Logo'
      />
      <div>
        <h1 className='text-6xl text-black dark:text-white font-extrabold drop-shadow-sm'>
          ChorePal
        </h1>
        <h3 className='text-2xl font-semibold text-orange-800 dark:text-orange-300 mt-2'>
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

      <div className='ml-auto mr-5 flex items-center gap-3'>
        {/* Dark mode toggle — WCAG: role=switch, aria-checked, dynamic aria-label */}
        <button
          role='switch'
          aria-checked={isDark}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={toggleDark}
          className='w-10 h-10 rounded-full flex items-center justify-center
                     bg-gray-200 hover:bg-gray-300
                     dark:bg-gray-700 dark:hover:bg-gray-600
                     text-gray-800 dark:text-yellow-300
                     transition-colors duration-200'
        >
          {isDark ? (
            /* Sun — shown in dark mode to switch to light */
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-5 h-5'
              aria-hidden='true'
            >
              <path d='M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z' />
            </svg>
          ) : (
            /* Moon — shown in light mode to switch to dark */
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-5 h-5'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z'
                clipRule='evenodd'
              />
            </svg>
          )}
        </button>

        <button
          onClick={handleLogout}
          className='dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
