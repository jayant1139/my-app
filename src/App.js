import logo from './logo.svg';
import './App.css';
import Form from './Components/Form';
import { HashRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HashRouter>
      
      {/* <Form/> */}
      <Routes>
        <Route path='/' element={<Form/>}/>
      {/* <Route path='/' element={<getForm/>}/> */}
      <Route path='*' element={<Form/>} />

    </Routes>
     
      </HashRouter>
     
    </div>
  );
}

export default App;
