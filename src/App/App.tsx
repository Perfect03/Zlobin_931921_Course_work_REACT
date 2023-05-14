import React from 'react';
import Main from '../components/Main/Main';
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import Carno from '../components/Carno/Carno';
import Table from '../components/Table/Table';
import SelectTrainerType from '../components/SelectTrainerType/SelectTrainerType';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Main />} />
        <Route path="/carno/random" element={<Carno type="auto" />} />
        <Route path="/carno/fromTeacher" element={<Carno type="static" />} />
        <Route path="/carno" element={<SelectTrainerType what={'карты Карно'} />} />
        <Route path="/table/random" element={<Table type="auto" />} />
        <Route path="/table/fromTeacher" element={<Table type="static" />} />
        <Route path="/table" element={<SelectTrainerType what={'таблицы'} />} />
      </Routes>
    </>
  );
}

export default App;
