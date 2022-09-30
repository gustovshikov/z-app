import { useState, useEffect, createContext, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { NavBar } from './components/NavBar';
import { ItemDisplay } from './components/ItemDisplay';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { ItemDetail } from './components/ItemDetail';
import { ItemNew } from './components/ItemNew';
import { Splash } from './components/Splash';

export const AppContext = createContext();

const App = () => {
  const apiServer = 'http://localhost:3001';
  // const apiServer = 'https://api.cyberhelm.com';
  const [items, setItems] = useState([]);

  const [userAccount, setUserAccount] = useState(null);

  const [cookies, setCookie, removeCookie] = useCookies([
    'auth',
    'user_id',
    'user',
  ]);
  const [triggerItemFetch, setTriggerItemFetch] = useState(true);
  const [showFiltered, setShowFiltered] = useState(true);

  useMemo(() => {
    if (cookies.user) {
      setUserAccount(cookies.user);
    }
  }, [cookies]);

  useEffect(() => {
    console.log('fetching all items');
    fetch(`${apiServer}/items`, {
      Method: 'GET',
      credentials: 'same-origin',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      // redirect: 'follow',
    })
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => {
        console.log('error: ', err);
      });
  }, [triggerItemFetch]);

  const setContext = {
    apiServer,
    items,
    setTriggerItemFetch,
    userAccount,
    setUserAccount,
    cookies,
    setCookie,
    removeCookie,
    showFiltered,
    setShowFiltered,
  };

  return (
    <AppContext.Provider value={setContext}>
      <div className='flex justify-center'>
        <NavBar />
      </div>
      <div className='flex flex-col items-center justify-between h-fill mt-8'>
        <Routes>
          <Route path='/' element={<Splash />} />
          <Route path='/items' element={<ItemDisplay />} />
          <Route path='/items/add' element={<ItemNew />} />
          <Route path='/items/:id' element={<ItemDetail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        <span className='text-slate-100 pt-4'>copyright InveDex 2022</span>
        <span className='text-slate-100 pb-4'>
          <button
            className=' underline hover:font-bold hover:text-amber-500'
            onClick={e =>
              window.open(
                'https://api.cyberhelm.com/',
                '_blank',
                'noopener,noreferrer'
              )
            }
          >
            https://api.cyberhelm.com/
          </button>
        </span>
      </div>
    </AppContext.Provider>
  );
};

export default App;
