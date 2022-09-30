import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../App.js';

export const NavBar = () => {
  const navigate = useNavigate();
  const {
    cookies,
    removeCookie,
    userAccount,
    setUserAccount,
    setShowFiltered,
  } = useContext(AppContext);

  return (
    <div className='border-b-2 border-amber-500 rounded w-4/5  h-14 flex-row flex justify-between items-center text-stone-50 font-bold'>
      <div className='flex flex-row items-center'>
        <button onClick={e => navigate('/')}>
          <img
            className='h-12 p-1'
            alt='site-logo'
            src='/images/isolated-monochrome-white.svg'
          />
        </button>
      </div>
      {cookies.auth && (
        <div className='flex flex-row items-center w-fit'>
          Current Account:{' '}
          <span className='font-extrabold  text-2xl mx-3'>{userAccount}</span>
        </div>
      )}
      <div className='flex flex-row items-center justify-between gap-5'>
        <div className='w-12'>
          <button
            className=' hover:text-amber-500 hover:font-extrabold'
            onClick={e => navigate('/items')}
          >
            Items
          </button>
        </div>
        {cookies.auth ? (
          <div className='w-12'>
            <button
              className=' hover:text-amber-500 hover:font-extrabold'
              onClick={e => {
                removeCookie('auth');
                removeCookie('user');
                removeCookie('user_id');
                setUserAccount(prev => null);
                setShowFiltered(prev => false);
                navigate('/');
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className='w-12'>
            <button
              className=' hover:text-amber-500 hover:font-extrabold'
              onClick={e => navigate('/login')}
            >
              Login/Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
