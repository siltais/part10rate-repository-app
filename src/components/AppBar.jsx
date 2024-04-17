import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBatTab from './AppBarTab';


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackGround,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 70,
    rowGap: 10,
    columnGap: 10
  }
});

const AppBar = () => {
  return( 
    <View style={styles.container}>
      <AppBatTab tabText = "Repositories"/>
    </View>
  );
};

export default AppBar;