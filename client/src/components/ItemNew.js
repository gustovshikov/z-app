import { useNavigate } from 'react-router-dom';
import { useContext, useMemo, useState } from 'react';
import { AppContext } from '../App';

export const ItemNew = () => {
  const { cookies, userAccount, apiServer, setTriggerItemFetch } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [currentItem, setCurrentItem] = useState({
    item_name: '',
    description: '',
    quantity: '',
    user_id: '',
  });

  useMemo(() => {
    if (cookies.user_id) {
      setCurrentItem(prev => {
        return { ...prev, user_id: cookies.user_id };
      });
    }
  }, [cookies]);

  const postItem = () => {
    console.log('puting item', currentItem);
    const { item_name, description, quantity, user_id } = currentItem;
    let newItem = {
      item_name: item_name,
      description: description,
      quantity: quantity,
      user_id: user_id,
    };
    fetch(`${apiServer}/items`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify(newItem),
    })
      .then(res => {
        // console.log(res.status);
        return res.json();
      })
      .then(data => {
        // console.log(data);
        setTriggerItemFetch(prev => !prev);
        navigate(`/items`);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  };

  return (
    <div className='bg-slate-200  rounded shadow-lg md:w-3/5 md:h-2/5 flex flex-col justify-around p-10'>
      <div className='flex'>
        <span className='text-5xl font-bold '>Item: </span>

        <input
          className='text-amber-500 font-extrabold text-5xl w-full'
          type='text'
          defaultValue={currentItem.item_name}
          onChange={e => {
            setCurrentItem(prev => {
              return { ...prev, item_name: e.target.value };
            });
          }}
        />
      </div>
      <div>
        <p className='font-bold'>Description:</p>

        <textarea
          className='w-full h-60'
          defaultValue={currentItem.description}
          onChange={e => {
            setCurrentItem(prev => {
              return { ...prev, description: e.target.value };
            });
          }}
        />
      </div>
      <div>
        <p className='font-bold'>Quantity: </p>

        <input
          type='text'
          defaultValue={currentItem.quantity}
          onChange={e => {
            setCurrentItem(prev => {
              return { ...prev, quantity: e.target.value };
            });
          }}
        />
      </div>
      <div>
        <p className='font-bold'>Created By: </p>
        <p>{`${userAccount}`}</p>
      </div>

      <div className='flex items-center justify-center gap-5'>
        <button
          className='bg-[#48b68d] rounded px-2 py-1 hover:text-amber-500 hover:bg-green-800'
          onClick={e => {
            postItem();
          }}
        >
          Submit Changes
        </button>

        <button
          className='bg-[#48b68d] rounded px-2 py-1 hover:text-amber-500 hover:bg-green-800'
          onClick={e => navigate('/items')}
        >
          Back to Items
        </button>
      </div>
    </div>
  );
};
