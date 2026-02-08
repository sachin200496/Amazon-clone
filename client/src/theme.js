import {createTheme} from "@mui/material/styles";


const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#131921',
    },
    secondary: {
      main: '#f3a847',
    },
    background: {
      default: '#eaeded',
    },
  },
  typography: { 
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
}});

export default theme;