import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import About from './pages/About'
import Chatbot from './pages/Chatbot'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import NotFound from './pages/notFound404'
import PrivateRoute from './components/PrivateRoute'
import PredictPrice from './pages/PredictPrice'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'






export default function App() {
  return (
    <BrowserRouter>
    <Header />
    <Chatbot/>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/listing/:listingId" element={<Listing />}></Route>

      <Route element={<PrivateRoute />}>
      <Route path='/profile' element={<Profile />}></Route>
      <Route path='/create-listing' element={<CreateListing/>}></Route>
      <Route path='/update-listing/:listingId' element={<UpdateListing/>}></Route>
      </Route>

      {/* <Route path='/chat' element={<Chatbot />}></Route> */}
      <Route path='/predict' element={<PredictPrice />}></Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
    </BrowserRouter>
  )
}
