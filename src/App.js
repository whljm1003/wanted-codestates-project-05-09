import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import theme from './theme';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Detatil from './page/Detail';
import Register from './page/Register';
import Review from './page/Review';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Review />} />
          <Route path="/register" element={<Register />} />
          <Route path="/detail" element={<Detatil />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
