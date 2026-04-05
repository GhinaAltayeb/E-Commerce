import './App.css'
import Navbar from './sections/Navbar'
import AllProducts from './sections/AllProducts'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className='content'>
      <Toaster
        position="top-right"
      />
      <Navbar/>
      <AllProducts/>
    </div>
  )
}

export default App
