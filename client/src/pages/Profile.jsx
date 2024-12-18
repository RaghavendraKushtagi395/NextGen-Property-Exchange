import {
  getDownloadURL, getStorage, ref, uploadBytesResumable,
} from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { app } from '../firebase';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice';
import ConfirmationModal from './ConfirmationModal';
import footerImage from '../assets/footer.png';
import Footer from './Footer.jsx';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [listingsVisible, setListingsVisible] = useState(false);

  // State for modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);


  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  }

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  }

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  // Modal controls
  const openModal = (listingId) => {
    setListingToDelete(listingId);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setListingToDelete(null);
  };

  const confirmDelete = async () => {
    if (listingToDelete) {
      await handleListingDelete(listingToDelete);
    }
    closeModal();
  };

  const toggleListingsVisibility = () => {
    setListingsVisible(!listingsVisible);
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center flex-col mt-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        {/* Header Section */}
        <h1 className="text-2xl font-bold text-gray-800 mb-8 px-80">Edit Profile</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center lg:w-1/3">
            <img
              onClick={() => fileRef.current.click()}
              src={formData.avatar || currentUser.avatar}
              alt="profile"
              className="rounded-full h-32 w-32 object-cover cursor-pointer border-4 border-blue-600 shadow-lg hover:scale-105 transition"
            />
            <input
              type="file"
              ref={fileRef}
              onChange={(e) => setFile(e.target.files[0])}
              hidden
              accept="image/*"
            />
            <p className="text-sm text-gray-500 mt-3">
              Click the image to upload a new one.
            </p>
            {/* Error handling for file upload */}
            {fileUploadError && (
              <p className="text-red-600 mt-1 text-sm">Error: Image must be less than 2 MB</p>
            )}
            {filePerc > 0 && filePerc < 100 && (
              <p className="text-blue-600 mt-1 text-sm">{`Uploading ${filePerc}%`}</p>
            )}
            {filePerc === 100 && (
              <p className="text-green-600 mt-1 text-sm">Image uploaded successfully!</p>
            )}
            {/* Success/Error Messages */}
            {updateSuccess && (
              <p className="text-green-600 text-center mt-4">User updated successfully!</p>
            )}

          </div>

          {/* Form Section */}
          <div className="flex-1 space-y-4">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  defaultValue={currentUser.username}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  defaultValue={currentUser.email}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="New Password"
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <button
                disabled={loading}
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 mt-4"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </form>

            {/* Error handling for form submission */}
            {error && <p className="text-red-600 text-center mt-4">{error}</p>}

            {/* Actions Section */}
            <div className="flex justify-between">
              <button
                onClick={handleDeleteUser}
                className=" text-red-600 font-semibold hover:scale-105 transition"
              >
                Delete Account
              </button>
              <button
                onClick={handleSignOut}
                className=" text-gray-800 font-semibold hover:scale-105 hover:text-red-500 transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Buttons Below */}
        <div className="mt-8 flex flex-col lg:flex-row gap-4">
          <button
            className="flex-1 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            <Link to={"/create-listing"}>Create Listing</Link>
          </button>


          <button
            onClick={() => {
              handleShowListings();
              toggleListingsVisibility();
            }}
            className="flex-1 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            {listingsVisible ? 'Hide Listings' : 'Show Listings'}
          </button>
        </div>

        {/* Error handling for show listings */}
        {showListingsError && (
          <p className="text-red-600 text-center mt-4">{'Error showing listings'}</p>
        )}

        {/* Listings Section */}
        {listingsVisible && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Listings</h2>
            {userListings && userListings.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {userListings.map((listing) => (
                  <div
                    key={listing._id}
                    className="p-4 border rounded-lg shadow-sm flex items-center justify-between"
                  >
                    <Link to={`/listing/${listing._id}`}>
                      <img
                        src={listing.imageUrls[0]}
                        alt="listing cover"
                        className="h-16 w-16 object-cover rounded-lg"
                      />
                    </Link>
                    <Link
                      to={`/listing/${listing._id}`}
                      className="flex-1 text-gray-700 ml-4 font-medium hover:underline"
                    >
                      {listing.name}
                    </Link>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal(listing._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/update-listing/${listing._id}`}
                        className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center mt-4">No listings found.</p>
            )}
          </div>
        )}
        {/* Error Section */}
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        {showListingsError && (
          <p className="text-red-600 text-center mt-4">Error showing listings!</p>
        )}


      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this listing?"
      />
      <div>
        {/* Footer */}
        <footer className='w-full mt-10'>
          <img src={footerImage} className='w-full object-cover' alt='Footer' />
        </footer>

        <Footer />
      </div>
    </div>

  );
}