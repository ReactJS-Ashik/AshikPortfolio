import { Box, ThemeProvider, createTheme } from '@mui/material';
import "./App.css"

// Constants
import { DarkTheme, LightTheme } from './Utils/ColorConstants';

// Redux Imports
import { useSelector } from 'react-redux';
import MyDrawer from './Components/Drawer/Drawer';

function App() {
  const AppTheme= useSelector((state) => state.system.themeStyle)

  // Define light and dark themes
  const createLightTheme = createTheme({
      palette: {
          mode: LightTheme,
      },
  });
  const createDarkTheme = createTheme({
      palette: {
          mode: DarkTheme,
      },
  });

  return (
    <ThemeProvider theme={AppTheme === LightTheme ? createLightTheme : createDarkTheme} >
      <Box>
        <MyDrawer className="flex-item-sideNav"/>
      </Box>
      <Box className="noiseBG" />
    </ThemeProvider>
  );
}

export default App;
