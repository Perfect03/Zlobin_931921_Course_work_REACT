import React from 'react';
import Main from '../components/Main/Main';
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import { Context } from '../languageContext';
import useLocalStorage from '../hooks/useLocalStorage';
import TruthTable from '../components/TruthTable/TruthTable';
import SelectTrainerType from '../components/SelectTrainerType/SelectTrainerType';
import Header from '../components/Header/Header';
import Zhegalkin from '../components/Zhegalkin/Zhegalkin';

function App() {
  const [language, setLanguage] = useLocalStorage('language', 'ru');
  return (
    <Context.Provider value={{ language: language, setLanguage: setLanguage }}>
      <Header></Header>
      <Routes>
        <Route index element={<Main />} />
        <Route path="/carno/random" element={<TruthTable trainer="Carno" type="auto" />} />
        <Route path="/carno/fromTeacher" element={<TruthTable trainer="Carno" type="static" />} />
        <Route path="/carno" element={<SelectTrainerType what={'карты Карно'} />} />
        <Route path="/table/random" element={<TruthTable trainer="Table" type="auto" />} />
        <Route path="/table/fromTeacher" element={<TruthTable trainer="Table" type="static" />} />
        <Route path="/table" element={<SelectTrainerType what={'таблицы'} />} />
        <Route path="/zhegalkin" element={<Zhegalkin />} />
      </Routes>
    </Context.Provider>
  );
}

export default App;
