import React from 'react';
import Main from '../components/Main/Main';
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import Carno from '../components/Carno/Carno';
import Table from '../components/Table/Table';
import SelectTrainerType from '../components/SelectTrainerType/SelectTrainerType';
import SelectVarsCount from '../components/SelectVarsCount/SelectVarsCount';

function App() {
  return (
    <>
        <Routes>
            <Route index element={<Main />} />
            <Route path="/carno/random/:id" element={<Carno />} />
            <Route path="/carno/random" element={<SelectVarsCount />} />
            <Route path="/carno/fromTeacher/:id" element={<Carno />} />
            <Route path="/carno/fromTeacher" element={<SelectVarsCount />} />
            <Route path="/carno" element={<SelectTrainerType what={"карты Карно"} />} />
            <Route path="/table/random/:id" element={<Table />} />
            <Route path="/table/random" element={<SelectVarsCount />} />
            <Route path="/table/fromTeacher/:id" element={<Table />} />
            <Route path="/table/fromTeacher" element={<SelectVarsCount />} />
            <Route path="/table" element={<SelectTrainerType what={"таблицы"} />} />
        </Routes>
    </>
  );
}

export default App;
