import React, { useState, } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import footerImage from '../assets/footer.png';
import Footer from './Footer.jsx';

export default function CreateListing() {
  const { currentUser } = useSelector(state => state.user)
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({

    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,  // Default value
    bathrooms: 1,  // Default value
    regularPrice: 2000,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,

  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(formData);

  const handleImageSubmit = async (e) => {
    // Check if no files are selected
    if (files.length === 0) {
      setImageUploadError("Please select at least one image to upload");
      return; // Exit the function early
    }

    // Check if the number of files is valid
    if (files.length + formData.imageUrls.length <= 6) {
      setUploading(true);
      setImageUploadError(false); // Clear error if present
      const promises = [];

      // Create promises for each file upload
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      // Handle promise resolution and errors
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(null); // Clear any previous error
          setUploading(false);
        })
        .catch((err) => {
          console.error("Image upload failed:", err);
          setImageUploadError("Image upload failed (2 MB max per image)");
          setUploading(false);
        });
    } else {
      // Handle the case where file count exceeds the limit
      setImageUploadError("You can only upload a maximum of 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progrss = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progrss}% done`);

        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      )
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  }

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id
      })
    }

    if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked
      })
    }

    if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) return setError('You must upload at least one image before creating your listing')
      if (+formData.regularPrice < +formData.discountPrice) return setError('Discount price must be lower than the regular price') // sometimes the number is stored in the form of string and somethimes number, to prevent from getting converted to string use '+' it will convert it number always
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`)
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <div>
      <main className='p-6 max-w-5xl mx-auto bg-gray-100 shadow-lg rounded-lg mt-10'>
        <h1 className='text-4xl font-bold text-center text-gray-800 my-8'>Create a Listing</h1>

        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-8'>

          <div className='flex flex-col gap-6 flex-1'>

            <input type='text' placeholder='Name' className='border border-gray-300 p-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500' id='name' maxLength='62' minLength='10' required onChange={handleChange} value={formData.name} />

            <textarea type='text' placeholder='Description' className='border border-gray-300 p-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500' id='description' required onChange={handleChange} value={formData.description} />

            <input type='text' placeholder='Address' className='border border-gray-300 p-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500' id='address' required onChange={handleChange} value={formData.address} />

            <div className='flex flex-wrap gap-4'>
              <label className='flex items-center gap-2 text-gray-700 accent-indigo-600'>
                <input type='checkbox' id='sale' className='form-checkbox h-5 w-5 text-blue-500' onChange={handleChange} checked={formData.type === 'sale'} />
                Sell
              </label>
              <label className='flex items-center gap-2 text-gray-700 accent-indigo-600'>
                <input type='checkbox' id='rent' className='form-checkbox h-5 w-5 text-blue-500' onChange={handleChange} checked={formData.type === 'rent'} />
                Rent
              </label>
              <label className='flex items-center gap-2 text-gray-700 accent-indigo-600'>
                <input type='checkbox' id='parking' className='form-checkbox h-5 w-5 text-blue-500' onChange={handleChange} checked={formData.parking} />
                Parking spot
              </label>
              <label className='flex items-center gap-2 text-gray-700 accent-indigo-600'>
                <input type='checkbox' id='furnished' className='form-checkbox h-5 w-5 text-blue-500' onChange={handleChange} checked={formData.furnished} />
                Furnished
              </label>
              <label className='flex items-center gap-2 text-gray-700 accent-indigo-600'>
                <input type='checkbox' id='offer' className='form-checkbox h-5 w-5 text-blue-500' onChange={handleChange} checked={formData.offer} />
                Offer
              </label>
            </div>

            <div className="flex flex-wrap gap-6">
              {/* Bedrooms Input */}
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-indigo-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
                <p className="text-gray-600">Beds</p>
              </div>

              {/* Bathrooms Input */}
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-indigo-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
                <p className="text-gray-600">Baths</p>
              </div>

              {/* Regular Price and Discount Price */}
              <div className="flex items-center gap-6">
                {/* Regular Price */}
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    id="regularPrice"
                    min="2000"
                    max="100000000"
                    required
                    className="p-3 border border-indigo-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    onChange={handleChange}
                    value={formData.regularPrice}
                  />
                  <div>
                    <p className="text-gray-600">Regular price</p>
                    {formData.type === "rent" && <span className="text-xs text-gray-500">(₹ / month)</span>}
                  </div>
                </div>

                {/* Discounted Price */}
                {formData.offer && (
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      id="discountPrice"
                      min="0"
                      max="10000000"
                      required
                      className="p-3 border border-indigo-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      onChange={handleChange}
                      value={formData.discountPrice}
                    />
                    <div>
                      <p className="text-gray-600">Discounted price</p>
                      {formData.type === "rent" && <span className="text-xs text-gray-500">(₹ / month)</span>}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          <div className="flex flex-col flex-1 gap-6">
            <p className='font-semibold text-gray-800'>Images:
              <span className='font-normal text-gray-600 ml-2 text-sm'>The first image will be the cover (max 6)</span>
            </p>

            <div className="flex gap-4">
              <input onChange={(e) => setFiles(e.target.files)} className='p-3 border border-gray-300 rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500' type="file" id='images' accept='image/*' multiple />
              <button type='button' disabled={uploading} onClick={handleImageSubmit} className='px-4 py-2 bg-green-500 text-white font-medium rounded-lg shadow hover:bg-green-600 disabled:opacity-50'>
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>

            <p className='text-red-500 text-sm'>{imageUploadError && imageUploadError}</p>

            {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
              <div key={url} className='flex justify-between items-center border border-gray-300 rounded-lg p-2'>
                <img src={url} alt="Listing" className="w-16 h-16 object-cover rounded-lg" />
                <button type='button' onClick={() => { handleRemoveImage(index) }} className='px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600'>Delete</button>
              </div>
            ))}

            <button disabled={loading || uploading} className='w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 disabled:opacity-50 hover:scale-105 transition'>
              {loading ? 'Creating...' : 'Create Listing'}
            </button>
            {error && <p className='text-red-500 text-sm'>{error}</p>}
          </div>
        </form>
      </main>
      {/* Footer */}
      <footer className='w-full mt-10'>
        <img src={footerImage} className='w-full object-cover' alt='Footer' />
      </footer>
      <Footer />
    </div>
  );
}