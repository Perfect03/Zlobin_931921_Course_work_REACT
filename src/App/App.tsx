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
import Footer from '../components/Footer/Footer';

function App() {
  const [language, setLanguage] = useLocalStorage('language', 'ru');
  return (
    <Context.Provider value={{ language: language, setLanguage: setLanguage }}>
      <Header></Header>
      <Routes>
        <Route index element={<Main />} />
        <Route path="/karnaugh/random" element={<TruthTable trainer="Karnaugh" type="auto" />} />
        <Route
          path="/karnaugh/fromTeacher"
          element={<TruthTable trainer="Karnaugh" type="static" />}
        />
        <Route path="/karnaugh" element={<SelectTrainerType />} />
        <Route path="/table/random" element={<TruthTable trainer="Table" type="auto" />} />
        <Route path="/table/fromTeacher" element={<TruthTable trainer="Table" type="static" />} />
        <Route path="/table" element={<SelectTrainerType />} />
        <Route path="/zhegalkin" element={<SelectTrainerType />} />
        <Route path="/zhegalkin/random" element={<Zhegalkin type="auto" />} />
        <Route path="/zhegalkin/fromTeacher" element={<Zhegalkin type="static" />} />
      </Routes>
      <Footer></Footer>
    </Context.Provider>
  );
}

export default App;
