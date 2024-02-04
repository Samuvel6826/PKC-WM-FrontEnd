import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import CreateUser from './components/CreateUser'
import Dashboard from './components/Dashboard'
import Edit from './components/EditUser'
import Bins from './components/Bins'
import CreateBin from './components/CreateBin'
import EditBin from './components/EditBin'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/create-user' element={<CreateUser/>}></Route>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/edit-user/:id' element={<Edit/>}></Route>
            <Route path='/users/bins' element={<Bins/>}></Route>
            <Route path='/users/edit-bin/:id' element={<EditBin/>}></Route>
            <Route path='/users/create-bin' element={<CreateBin/>}></Route>
            <Route path='*' element={<Navigate to='/login'/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
