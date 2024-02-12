import { Container } from 'react-bootstrap'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'


function App() {
  return (
    <div >
      <Router>
        <Header/>
      
        <main className='py-3'>

          <Container>
              <Routes>
                <Route path="/" element={<HomeScreen/>} exact />
                <Route path="/product/:id" element={<ProductScreen/>} />
              </Routes>
            
          </Container>
          
        </main>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;