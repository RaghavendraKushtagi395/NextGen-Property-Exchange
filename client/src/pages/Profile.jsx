import {useSelector} from 'react-redux';

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>

        <img className='rounded-full h-32 w-32 object-cover cursor-pointer self-center mt-2' src={currentUser.avatar} alt='avatar' />

        <input type='text' placeholder='Username' className='border p-3 rounded-lg' id='username'></input>

        <input type='email' placeholder='Email' className='border p-3 rounded-lg' id='email'></input>

        <input type='password' placeholder='Password' className='border p-3 rounded-lg' id='password'></input>

        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-95'>update</button>

      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-600 cursor-pointer'>Delete Account</span>
        <span className='text-red-600 cursor-pointer'>Sign Out</span>
      </div>
    
    </div>
  )
}
