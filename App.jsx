import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Hedaer } from './components/header/Hedaer'
import { Footer } from './components/footer/Footer'
import { Dashboard } from './components/dashboard/Dashboard'
import { About } from './components/about/About'
import { Contact } from './components/contact/Contact'
import { Addbook } from './components/addbook/Addbook'
import { Bookdetails } from './components/bookdetails/Bookdetails'
import { Edit } from './components/edit/Edit'
import Randombook from './components/randombook/Randombook';



function App() {
  return (
    <BrowserRouter>
      <Hedaer />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/add-book" element={<Addbook />} />
        <Route path="/book-details" element={<Bookdetails />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/random-book" element={<Randombook />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
