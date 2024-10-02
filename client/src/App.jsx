import { BrowserRouter,Routes,Route } from 'react-router-dom'

import SignUp from './assets/pages/SignUp'
import SignIn from './assets/pages/SignIn'
import About from './assets/pages/About'
import Profile from './assets/pages/Profile'
import Home from './assets/pages/Home'






export default function App() {
  return (
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/sign-in" element={<SignIn />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path='/profile' element={<Profile />}></Route>
    </Routes>
    </BrowserRouter>
  )
}
