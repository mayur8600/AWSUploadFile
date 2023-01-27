import { createTheme, ThemeProvider } from '@mui/material/styles';
import UploadFile from './components/UploadFile';

function App() {
  const theme = createTheme({      
    typography: {
      button: {
        textTransform: 'none'
      }
    }
  });
  return (
    <>
    <ThemeProvider theme={theme}>
      <UploadFile/>
      </ThemeProvider>
    </>
  );
}

export default App;
