import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AppContext } from '../App';

export const Login = () => {
  const {
    userAccount,
    setUserAccount,
    apiServer,
    cookies,
    setCookie,
    removeCookie,
    setShowFiltered,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({
    user_name: '',
    password: '',
  });
  const [failedLogin, setFailedLogin] = useState(false);

  const postLogin = () => {
    console.log('fetching login');
    setFailedLogin(false);
    fetch(`${apiServer}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify(loginCredentials),
    })
      .then(res => {
        console.log(res.status);
        if (res.status === 200) {
          return res.json();
        } else {
          setFailedLogin(true);
        }
      })
      .then(data => {
        console.log(data);
        if (data === undefined) return;
        if (data.cookie !== undefined) {
          let cookieInfo = data.cookie;
          let user_id = data.user;
          console.log('return data', data);
          setCookie('user_id', user_id.id, {
            maxAge: cookieInfo[2].maxAge,
            sameSite: 'None',
          });
          setCookie('user', user_id.user_name, {
            maxAge: cookieInfo[2].maxAge,
            sameSite: 'None',
          });
          setCookie(cookieInfo[0], cookieInfo[1], {
            maxAge: cookieInfo[2].maxAge,
            sameSite: 'None',
          });
          setShowFiltered(true);
          setUserAccount(user_id.user_name);
          navigate('/items');
        } else {
          setFailedLogin(true);
        }
      })
      .catch(err => {
        console.log('error: ', err);
      });
  };

  return (
    <div className='bg-slate-200 md:w-1/3 md:h-1/3 rounded-md shadow-lg p-5 flex flex-col items-center justify-evenly '>
      <h1 className='text-4xl font-bold'>Login</h1>
      <div className='my-5 flex flex-col items-center gap-6'>
        {failedLogin && (
          <div className='flex flex-col items-center'>
            <h2 className='text-xl text-rose-700 font-extrabold'>
              Login failed
            </h2>
            <h3 className='text-md text-rose-700 font-bold'>
              Please try again or click register below
            </h3>
          </div>
        )}
        <label>
          UserName:
          <br />
          <input
            type='text'
            id='user_name'
            className='rounded'
            onChange={e => {
              setLoginCredentials(prev => {
                return { ...prev, user_name: e.target.value };
              });
            }}
          ></input>
        </label>
        <label>
          Password:
          <br />
          <input
            type='text'
            className=''
            id='password'
            onChange={e => {
              setLoginCredentials(prev => {
                return { ...prev, password: e.target.value };
              });
            }}
          ></input>
        </label>
      </div>
      <div className='flex gap-4'>
        <button
          className='bg-[#48b68d] rounded px-2 py-1 hover:text-amber-500 hover:bg-green-800'
          onClick={e => postLogin()}
        >
          Login
        </button>
        <button
          className='bg-[#48b68d] rounded px-2 py-1 hover:text-amber-500 hover:bg-green-800'
          onClick={e => {
            navigate('/register');
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};
