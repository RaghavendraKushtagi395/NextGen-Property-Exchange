import {useSelector} from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user)
  const fileRef = useRef(null);
  const [file,setFile]= useState(undefined);
  const [filePrec,setFilePerc] = useState(0);
  const [ fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  console.log(formData);
  
  // console.log(filePrec);
  // console.log(file);


  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file]) ;

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>

        <input onChange={(e)=>setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*' ></input>

        <img onClick={()=>fileRef.current.click()} className='rounded-full h-32 w-32 object-cover cursor-pointer self-center mt-2' src={formData.avatar ||currentUser.avatar} alt='profile' />
        
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>Error in Image upload (image must be less than 2 mb)</span>
          ): filePrec > 0 && filePrec < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePrec}%`}</span>
          ): filePrec === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>

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
