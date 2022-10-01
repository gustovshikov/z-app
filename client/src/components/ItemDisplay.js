import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';

export const ItemDisplay = () => {
  const { items, cookies, userAccount, showFiltered, setShowFiltered } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [view, setView] = useState('All');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (cookies.auth) {
      setView(userAccount);
      setShowFiltered(true);
    }
    // console.log('cookies check', cookies);
    if (cookies.user_id !== undefined) {
      let viewableItems = items.filter(
        item => item.user_id.toString() === cookies.user_id.toString()
      );
      setFilteredItems(viewableItems);
      setShowFiltered(true);
    } else {
      setFilteredItems(null);
      setShowFiltered(false);
    }
  }, [userAccount, setFilteredItems, cookies, items, setShowFiltered]);

  // console.log(filteredItems);
  return (
    <>
      <div className='flex flex-col items-center md:w-1/5 bg-slate-200 rounded-md p-3 shadow-2xl border-4 border-amber-300'>
        {userAccount !== null ? (
          <>
            <div className='text-center'>
              <h3 className='font-bold'>Filter</h3>
              {showFiltered && `Showing ${userAccount}'s Items`}
              {!showFiltered && `Showing All Items`}
            </div>
            <div className='flex gap-5 mt-4'>
              <button
                className='bg-[#48b68d] rounded px-2 py-1 hover:text-amber-500 hover:bg-green-800'
                onClick={e => {
                  setShowFiltered(prev => !prev);
                }}
              >
                Change View
              </button>
              <button
                className='bg-[#48b68d] rounded px-2 py-1 hover:text-amber-500 hover:bg-green-800'
                onClick={e => {
                  navigate('/items/add');
                }}
              >
                Create Item
              </button>
            </div>
          </>
        ) : (
          <div className='text-center'>
            <h3>Filter</h3>
            <h3>Showing All Items</h3>
          </div>
        )}
      </div>

      <div className='flex flex-row flex-wrap justify-center gap-4 md:w-4/5 mt-10'>
        {showFiltered && (
          <>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => {
                let description = item.description;
                if (item.description.length > 100) {
                  description = item.description.slice(0, 100) + '...';
                }
                return (
                  <div
                    key={index}
                    className='bg-slate-200 rounded shadow-lg border-4 border-amber-300'
                  >
                    <div className='flex flex-col justify-between w-full md:w-60 h-full p-3'>
                      <div>
                        <div className='flex items-center justify-between'>
                          <div className=' w-11/12 text-center'>
                            <h2 className='text-2xl font-bold text-amber-500'>
                              {item.item_name}
                            </h2>
                          </div>
                          <div className='text-right'>
                            <button
                              className='bg-transparent hover:bg-amber-600 rounded-full'
                              onClick={e => {
                                // console.log(item.id);
                                navigate(`/items/${item.id}`);
                              }}
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-6 h-6'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z'
                                />
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <p className='text-lg text-left'>{description}</p>
                      </div>
                      <div>
                        <h3 className='text-lg text-amber-800 text-right'>
                          Quantity: {item.quantity}
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className='flex flex-col items-center md:my-10 bg-slate-200 rounded-md p-10 shadow-2xl border-4 border-amber-300'>
                <h1 className='text-4xl '>No items owned by your account.</h1>
                <p className='text-2xl '>Create some or change view above.</p>
              </div>
            )}
          </>
        )}
        {!showFiltered && (
          <>
            {items.length > 0 ? (
              items.map((item, index) => {
                let description = item.description;
                if (item.description.length > 100) {
                  description = item.description.slice(0, 100) + '...';
                }
                return (
                  <div
                    key={index}
                    className='bg-slate-200 rounded shadow-lg border-4 border-amber-300'
                  >
                    <div className='flex flex-col justify-between w-full md:w-60 h-full p-3 '>
                      <div>
                        <div className='flex items-center justify-between'>
                          <div className=' w-11/12 text-center'>
                            <h2 className='text-2xl font-bold text-amber-500'>
                              {item.item_name}
                            </h2>
                          </div>
                          <div className='text-right'>
                            <button
                              className='bg-transparent hover:bg-amber-600 rounded-full'
                              onClick={e => {
                                // console.log(item.id);
                                navigate(`/items/${item.id}`);
                              }}
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-6 h-6'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z'
                                />
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <p className='text-lg text-left'>{description}</p>
                      </div>
                      <div>
                        <h3 className='text-lg text-amber-800 text-right'>
                          Quantity: {item.quantity}
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <>Loading</>
            )}
          </>
        )}
      </div>
    </>
  );
};
