import { useNavigate } from 'react-router-dom';

export const Splash = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center w-3/4 gap-5'>
      <img
        className='w-3/4 h-auto'
        src='/images/default-monochrome.svg'
        alt='main-logo'
      />
      <h1 className='text-4xl font-bold text-slate-100'>
        Welcom to Inventory Managment!
      </h1>
      <button
        className='bg-slate-200 rounded px-3 py-2 hover:text-amber-500 hover:bg-green-800  hover:shadow-inner'
        onClick={e => navigate('/items')}
      >
        <h1 className='text-4xl'>View Items</h1>
      </button>
      <button
        className='bg-slate-200 rounded px-3 py-2 hover:text-amber-500 hover:bg-green-800  hover:shadow-inner'
        onClick={e => navigate('/login')}
      >
        <h1 className='text-4xl'>login to manage</h1>
      </button>
    </div>
  );
};
