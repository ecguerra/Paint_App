import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'
import Home from './Home'
import Canvas from './Canvas'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Profile from './components/Profile'

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/canvas' element={<Canvas />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
