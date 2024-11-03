import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Producers from './pages/Producers';
import ProducerDetail from './pages/ProducerDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProducerForm from './components/ProducerForm';
import { AuthProvider } from './context/AuthContext';
import { ProducersProvider } from './context/ProducerContext';


export function App() {
  return (
    <AuthProvider>
      <ProducersProvider>
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
      <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/producers" element={<Producers />} />
            <Route path="/producer/:id" element={<ProducerDetail />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />
            <Route path="/admin/producer/new" element={<ProducerForm />} />
            <Route path="/admin/producer/edit/:id" element={<ProducerForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
    </ProducersProvider>
    </AuthProvider>
  );
}

export default App;