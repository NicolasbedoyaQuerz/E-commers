import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Purchases from './pages/Purchases'

function App() {


  return (   
    <HashRouter>
    <div className="App">   
      <NavBar/>
      <Routes>
        <Route path='/' element= {<Home/>}/>
        <Route path='/ProductDetail' element= {<ProductDetail/>} />
        <Route path='/login' element= {<Login/>} />
        <Route path='/purchases' element= {<Purchases/>} />
      </Routes>
    </div>
    </HashRouter>
     
  )
}

export default App