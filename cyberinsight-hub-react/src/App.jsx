// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Change this line
import Navigation from './components/Navigation';
import Home from './components/Home';
import Blog from './components/Blog';
import Profile from './components/Profile';
import LiveChat from './components/LiveChat';
import Login from './components/Login';
import Footer from './components/Footer';
import { UserProvider } from './contexts/UserContext'; // Add this
import { PrivateRoute } from './components/PrivateRoute'; // Add this

export default function App() {
  return (
    <BrowserRouter>      {/* Change Router to BrowserRouter */}
      <UserProvider>     {/* Add UserProvider */}
        <div className="d-flex flex-column min-vh-100">
          <Navigation />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />
              <Route path="/chat" element={
                <PrivateRoute>
                  <LiveChat />
                </PrivateRoute>
              } />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}