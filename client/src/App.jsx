import { BrowserRouter,Routes,Route } from 'react-router-dom'

import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import About from './pages/About'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Header from './components/Header'
import Chatbot from './pages/Chatbot'







export default function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/sign-in" element={<SignIn />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path='/profile' element={<Profile />}></Route>
      <Route path='/chat' element={<Chatbot />}></Route>
    </Routes>
    </BrowserRouter>
  )
}
