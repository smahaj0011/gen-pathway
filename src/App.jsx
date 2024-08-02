import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import About from './pages/About'
import LandingPage from './pages/LandingPage'
import Search from './pages/Search'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './firebase'
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import Profile from './pages/Profile'

function App() {
  const [user, setUser] = useState(undefined)
  const [additionalUserData, setAdditionalUserData] = useState(undefined)
  const [isFetching, setIsFetching] = useState(true)
  
  useEffect(() => {

    

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)


        const q = query(collection(db, 'users'), where('email', '==', user.email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          setAdditionalUserData(userDoc.data());
        } 

        return setIsFetching(false)
      } 
      setUser(null)
      setAdditionalUserData(null)
      setIsFetching(false)
    })

    return () => unsubscribe()
  }, [])


  if (isFetching) return <div>Loading...</div>

  return (
    <BrowserRouter>
      {user ? <Navbar user={user}/> : <Navbar />}
      <Routes>
        <Route path="/" element={
          user ? <Navigate to="/dashboard" /> : <LandingPage />
        } />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path='/login' element={
          user ? <Navigate to="/dashboard" replace/> : <LoginPage />
        } />
        <Route path='/signup' element={
          user ? <Navigate to="/dashboard" replace/> : <SignupPage />
        } />
        <Route path='/dashboard' element={
          user ? <Dashboard user={user} additionalInfo={additionalUserData}/> : <Navigate to="/" replace/>
        } />
        <Route path='/profile' element={
          user ? <Profile user={user} additionalInfo={additionalUserData}/> : <Navigate to="/" replace/>
        } />
        <Route path='/search' element={
          user ? <Search /> : <Navigate to="/" replace/>
        } />

        <Route path="*" element={<div>404: Page Not Found</div>} />

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}



export default App
