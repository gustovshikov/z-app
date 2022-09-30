import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext } from '../App';

export const Register = () => {
  const { setUserAccount, apiServer, setCookie } = useContext(AppContext);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    user_name: '',
    password: '',
  });
  const [failedRegister, setFailedRegister] = useState(false);

  const postUser = () => {
    console.log('posting user');
    setFailedRegister(false);
    const { first_name, last_name, user_name, password } = userInfo;
    if (
      first_name === '' ||
      last_name === '' ||
      user_name === '' ||
      password === ''
    ) {
      setFailedRegister(true);
      return;
    }
    fetch(`${apiServer}/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify(userInfo),
    })
      .then(res => {
        // console.log(res.status);
        if (res.status === 201) {
          return res.json();
        } else if (res.status === 409) {
          setFailedRegister(true);
        }
        return res.json();
      })
      .then(data => {
        // console.log(data);
        if (data.cookie !== undefined) {
          let cookieInfo = data.cookie;
          let user_id = data.user;
          // console.log(user_id);
          setCookie(cookieInfo[0], cookieInfo[1], {
            maxAge: cookieInfo[2].maxAge,
            sameSite: 'None',
          });
          setCookie('user', userInfo.user_name, {
            maxAge: cookieInfo[2].maxAge,
            sameSite: 'None',
          });
          setCookie('user_id', user_id[0].id, {
            maxAge: cookieInfo[2].maxAge,
            sameSite: 'None',
          });
          setUserAccount(userInfo.user_name);
          navigate('/items');
        }
      });
  };

  return (
    <div className='bg-slate-200 md:w-2/4 md:h-3/5 rounded-md shadow-lg p-5 flex flex-col items-center justify-evenly '>
      <h1 className='text-4xl font-bold'>Create User</h1>
      <div className='my-5 flex flex-col items-center gap-6'>
        {failedRegister && (
          <div className='flex flex-col items-center'>
            <h2 className='text-xl text-rose-700 font-extrabold'>
              Login failed
            </h2>
            <h3 className='text-md text-rose-700 font-bold'>
              Please try again or click login below
            </h3>
          </div>
        )}
        <label>
          First Name:
          <br />
          <input
            type='text'
            id='first_name'
            className='rounded'
            onChange={e => {
              setUserInfo(prev => {
                return { ...prev, first_name: e.target.value };
              });
            }}
          ></input>
        </label>
        <label>
          Last Name:
          <br />
          <input
            type='text'
            id='last_name'
            className='rounded'
            onChange={e => {
              setUserInfo(prev => {
                return { ...prev, last_name: e.target.value };
              });
            }}
          ></input>
        </label>
        <label>
          UserName:
          <br />
          <input
            type='text'
            id='user_name'
            className='rounded'
            onChange={e => {
              setUserInfo(prev => {
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
              setUserInfo(prev => {
                return { ...prev, password: e.target.value };
              });
            }}
          ></input>
        </label>
      </div>
      <div className='flex gap-4'>
        <button
          className='bg-[#48b68d] rounded px-2 py-1 hover:text-amber-500 hover:bg-green-800'
          onClick={e => {
            navigate('/login');
          }}
        >
          Login
        </button>
        <button
          className='bg-[#48b68d] rounded px-2 py-1 hover:text-amber-500 hover:bg-green-800'
          onClick={e => postUser()}
        >
          Register
        </button>
      </div>
    </div>
  );
};
