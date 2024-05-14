import './App.css';
import Index from './main/Index';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import WriteForm from './user/WriteForm';
import List from './user/List';
import UpdateForm from './user/UpdateForm';
import UploadForm from './user/UploadForm';
import UploadList from './user/UploadList';



function App() {
  return (
    <div >
      <BrowserRouter>
        <>
          <Routes>
            <Route path='/' element={<Index/>}/>
            {/* <Route path='/user/writeForm' element={<WriteForm/>}/>
            <Route path='/user/list/:page' element={<List/>}/>
            <Route path='/user/updateForm/:userId' element={<UpdateForm/>}/> */}
            <Route path='/user'>
            <Route path='writeForm' element={<WriteForm/>}/>
            <Route path='list/:page' element={<List/>}/>
            <Route path='updateForm/:userId' element={<UpdateForm/>}/>
            <Route path='uploadForm' element={<UploadForm/>}/>
            <Route path='uploadList' element={<UploadList/>}/>
            {/* <Route path='uploadUpdateList/:seq' element={<UploadUpdateList/>}/> */}
            </Route>
          </Routes>
        </>
      </BrowserRouter>
    </div>
  );
}

export default App;
