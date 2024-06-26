import { Platform } from 'react-native';
const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
      appBarBackGround: '#24292e',
      textMenu: '#ffffff',
      seperatorColor: '#e1e4e8',
      errorColor: '#d73a4a'
    },
    fontSizes: {
      body: 14,
      subheading: 16,
    },
    fonts: {
      main: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'System',
      }),
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
    textAlign: {
      center: 'center',
      left: 'left',
      right: 'right'
    }
  };
  
  export default theme;