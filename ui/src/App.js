import { Routes, Route } from 'react-router-dom'
import About from './views/About'
import Home from './views/Home'
import NotFound from './views/NotFound'
import Layout from './layouts'
import ThemeContextProvider from './context/themeContext'
import Register from './views/Register'
import Login from './views/Login'
import Success from './views/Register/success'
import ReportCrime from './views/ReportCrime'

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/register/success" element={<Success/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/report/new" element={<ReportCrime/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Route>
        </Routes>
      </ThemeContextProvider>
    </div>
  )
}

export default App
