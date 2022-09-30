import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useMemo, useState } from 'react';
import { AppContext } from '../App';

export const ItemDetail = () => {
  const { items, cookies, userAccount, apiServer, setTriggerItemFetch } =
    useContext(AppContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentItem, setCurrentItem] = useState(null);
  const [updating, setUpdating] = useState(false);

  useMemo(() => {
    if (items !== undefined) {
      console.log('filtering items for current');
      let filterItem = items.filter(
        item => item.id.toString() === id.toString()
      );
      if (filterItem[0] === undefined) {
        setCurrentItem(null);
      } else {
        setCurrentItem(filterItem[0]);
      }
    }
  }, [id, items]);

  const putItem = () => {
    console.log('puting item', currentItem);
    const { item_name, description, quantity } = currentItem;
    let newItem = {
      item_name: item_name,
      description: description,
      quantity: quantity,
    };
    fetch(`${apiServer}/items/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify(newItem),
    })
      .then(res => {
        console.log(res.status);
        return res.json();
      })
      .then(data => {
        console.log(data);
        setUpdating(false);
        setTriggerItemFetch(prev => !prev);
      })
      .catch(err => {
        console.log('error: ', err);
      });
  };

  const deleteItem = () => {
    console.log('deleting item');
    fetch(`${apiServer}/items/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify(),
    })
      .then(res => {
        console.log(res.status);
        return res.json();
      })
      .then(data => {
        console.log(data);
        setTriggerItemFetch(prev => !prev);
        navigate('/items');
      })
      .catch(err => {
        console.log('error: ', err);
      });
  };

  return (
    <>
      {currentItem !== null ? (
        <div className='bg-slate-200  rounded shadow-lg md:w-3/5 md:h-2/5 flex flex-col justify-around p-10'>
          <div className='flex'>
            <span className='text-5xl font-bold '>Item: </span>
            {!updating && (
              <span className='text-amber-500 font-extrabold text-5xl'>
                {currentItem.item_name}
              </span>
            )}
            {updating && (
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
            )}
          </div>
          <div>
            <p className='font-bold'>Description:</p>
            {!updating && <p>{currentItem.description}</p>}
            {updating && (
              <textarea
                className='w-full h-60'
                defaultValue={currentItem.description}
                onChange={e => {
                  setCurrentItem(prev => {
                    return { ...prev, description: e.target.value };
                  });
                }}
              />
            )}
          </div>
          <div>
            <p className='font-bold'>Quantity: </p>
            {!updating && <p>{currentItem.quantity}</p>}
            {updating && (
              <>
                <input
                  type='text'
                  defaultValue={currentItem.quantity}
                  onChange={e => {
                    setCurrentItem(prev => {
                      return { ...prev, quantity: e.target.value };
                    });
                  }}
                />
              </>
            )}
          </div>
          <div>
            <p className='font-bold'>Created By: </p>
            <p>{`${currentItem.user_info.first_name}, ${currentItem.user_info.last_name}`}</p>
          </div>
          <div className='flex items-center justify-center gap-5'>
            {userAccount !== null ? (
              <>
                {!updating && (
                  <button
                    className='bg-[#48b68d] rounded px-2 py-1 hover:text-amber-500 hover:bg-green-800'
                    onClick={e => setUpdating(true)}
                  >
                    Update
                  </button>
                )}
                {updating && (
                  <button
                    className='bg-[#48b68d] rounded px-2 py-1 hover:text-amber-500 hover:bg-green-800'
                    onClick={e => {
                      putItem();
                    }}
                  >
                    Submit Changes
                  </button>
                )}
                <button
                  className='bg-[#b66448] rounded px-2 py-1 hover:text-slate-200 hover:bg-red-800'
                  onClick={e => {
                    deleteItem();
                  }}
                >
                  Delete All
                </button>
              </>
            ) : null}
            <button
              className='bg-[#48b68d] rounded px-2 py-1 hover:text-amber-500 hover:bg-green-800'
              onClick={e => navigate('/items')}
            >
              Back to Items
            </button>
          </div>
        </div>
      ) : (
        <>Loading</>
      )}
    </>
  );
};
