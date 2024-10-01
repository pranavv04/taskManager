import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'
import Home from './components/Home'
import Footer from './components/Footer'
import Header from './components/Header'
import Login from './components/Login'
import SignUp from './components/SignUp'
import {BrowserRouter as Router , Route , Routes} from 'react-router-dom'
import Tasks from './components/Tasks';
import CreateTask from './components/CreateTask';
import Details from './components/Details';
import Update from './components/Update';
import Report from './components/Report';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
    <Header />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/tasks' element={<Tasks />} />
      <Route path= '/login' element={<Login />} />
     <Route path='/signup' element={<SignUp />} />
     <Route path='/createtask' element={<CreateTask />}/>
     <Route path='/tasks/:id' element={<Details />}/>
     <Route path='/tasks/:id/update' element={<Update/>}/>
     <Route path='/tasks/:id/report' element={<Report />}/>

    </Routes>
    <Footer />
    <ToastContainer/>

    </Router>
   
    </>
  )
}

export default App
