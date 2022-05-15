import { HashRouter, Routes, Route } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import HomePage from './pages/HomePage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './components/Header';
import Footer from './components/Footer';
import { getWeb3Provider } from './helpers/Wallet';
import SplitPage from './pages/SplitPage';
import MergePage from './pages/MergePage';
import BottomNavigate from './components/BottomNavigate';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
      contrastText: '#533535',
    },
    secondary: {
      main: '#E6CCA9',
      contrastText: '#FFFFFF',
    }
  },
  typography: {
    fontFamily: [
      'Open Sans',
      'sans-serif'
    ].join(','),
  }
});

function App() {

  return (
    <Web3ReactProvider getLibrary={getWeb3Provider}>
      <ThemeProvider theme={theme}>
        <div className="AppWrapper">
          <HashRouter>
            <Routes>
              <Route path="/" element={
                <>
                  <Header />
                  <div className="AppContainer">
                    <HomePage />
                  </div>
                </>
              } />
              <Route path="/split" element={
                <>
                  <Header />
                  <div className="AppContainer">
                    <SplitPage />
                  </div>
                  <BottomNavigate />
                </>
              } />
              <Route path="/merge" element={
                <>
                  <Header />
                  <div className="AppContainer">
                    <MergePage />
                  </div>
                  <BottomNavigate />
                </>
              } />
            </Routes>
          </HashRouter>
          <Footer />
        </div>
      </ThemeProvider>
    </Web3ReactProvider>
  );
}

export default App;

(window as any).ethereum?.on('chainChanged', () => {
  window.location.reload();
});

(window as any).ethereum?.on('accountsChanged', (accounts: any) => {
  window.location.reload();
});
