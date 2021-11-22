import { Routes, Route } from 'react-router-dom'

import Home from './Home'
import Canvas from './Canvas'

import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Profile from './components/Profile'

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/canvas' element={<Canvas />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
    </div>
  );
}

export default App;
