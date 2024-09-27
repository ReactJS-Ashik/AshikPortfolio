import { Box, ThemeProvider, createTheme } from '@mui/material';
import "./App.css"

// Constants
import { DarkTheme, LightTheme } from './Utils/ColorConstants';

// Redux Imports
import { useSelector } from 'react-redux';
import MyDrawer from './Components/Drawer/Drawer';
import { useEffect } from 'react';

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

  // To handle title change when browser tab is changed
  const handlePageOff= ()=>{
    if(document.hidden)
      document.title= "Come Back to explore! 👼"
    else
      document.title= "Ashik Rai"
  }
  useEffect(() => {
    handlePageOff()
    document.addEventListener("visibilitychange", handlePageOff);
    return()=>{
      document.removeEventListener("visibilitychange", handlePageOff);
    }
  }, [])

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
