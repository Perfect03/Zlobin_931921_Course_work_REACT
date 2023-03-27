import React from 'react';
import Main from '../components/Main/Main';
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import Carno from '../components/Carno/Carno';
import Table from '../components/Table/Table';
import Select from '../components/Select/Select';

function App() {
  return (
    <>
        <Routes>
            <Route index element={<Main />} />
            <Route path="/carno/random" element={<Carno />} />
            <Route path="/carno/fromTeacher" element={<Carno />} />
            <Route path="/carno" element={<Select what={"карты Карно"} />} />
            <Route path="/table/random" element={<Table />} />
            <Route path="/table/fromTeacher" element={<Table />} />
            <Route path="/table" element={<Select what={"таблицы"} />} />
        </Routes>
    </>
  );
}

export default App;
