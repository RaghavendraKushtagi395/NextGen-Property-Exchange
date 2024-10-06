import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import About from './pages/About'
import Chatbot from './pages/Chatbot'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'







export default function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path='/profile' element={<Profile />}></Route>
      <Route path='/chat' element={<Chatbot />}></Route>
    </Routes>
    </BrowserRouter>
  )
}
