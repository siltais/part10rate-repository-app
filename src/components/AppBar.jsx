import { View, StyleSheet, ScrollView, Pressable, Text } from 'react-native';
import TabText from './Text';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { useNavigate } from 'react-router-native';

import { useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'
import useSignOut from '../hooks/useSignOut';


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
  },
  tabScroll: {
    columnGap: 30
  }
});

const AppBar = () => {
  const navigate = useNavigate();
  const [signOut] = useSignOut();
  const meResult = useQuery(ME)
  if(meResult.loading){
    return '';
  }

  const handleSignOut = () => {
    signOut();
    navigate("/");
  }

  const chkLogin = () => {
    if( !meResult.data.me ){
      return (
        <>
          <AppBarTab tabText = "Sign in" navigateTo="/signin" />
          <AppBarTab tabText = "Sign up" navigateTo="/signup" />
        </>
      );
    } else {
      return(
        <>
          <AppBarTab tabText = "Create a review" navigateTo="/createReview"/>
          <Pressable onPress={() => handleSignOut()}>
            <Text>
              <TabText color="textMenu" fontWeight="bold">
                Sign Out
              </TabText>
            </Text>
          </Pressable>
        </>
      );
    }
  }


  return( 
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.tabScroll}>
        <AppBarTab tabText = "Repositories" navigateTo="/"/>
        {chkLogin()}
      </ScrollView>
    </View>
  );
};

export default AppBar;