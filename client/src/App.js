import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './pages/Header';
import Footer from './pages/Footer';
import Home from './pages/Home';
import Budget from './pages/Budget';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  
  // setstate
  // const [events, setEvents] = useState([]);

  useEffect(() => {
    document.title = 'Ultimate Pocket Pal';
  }, []);

  return (
    <Router>
      <>
        <Header />

        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/budget'
            element={<Budget />}
          />
          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            path='/signup'
            element={<Signup />}
          />
          <Route
            path='/logout'
            element={<Login />}
          />
          

        </Routes>
        
        <Footer />
    </>
    </Router>
  );
};

export default App;






// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
