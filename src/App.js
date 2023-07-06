import {Landing, Error, Register} from "./pages";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AllJobs,Profile,SharedLayout,Stats,AddJob} from './pages/dashboard'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SharedLayout />}> 
            <Route index element={<Stats />} />
            <Route path='all-jobs' element={<AllJobs />} />
            <Route path='add-job' element={<AddJob />} />
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route path='landing' element={<Landing />} />
          <Route path='register' element={<Register />} />
          <Route path='*' element={<Error />} />
        </Routes>
        <ToastContainer position='top-center' />
      </BrowserRouter>

    </div>
  );
}

export default App;
