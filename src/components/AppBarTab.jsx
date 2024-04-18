import { Pressable, Text } from 'react-native';
import TabText from './Text';
import { useNavigate } from 'react-router-native';

const AppBarTab = ({ tabText, navigateTo }) => {
 const navigate = useNavigate();
 const handleNavigation = (navigateTo) => {
  navigate(navigateTo);
};

  return(
    <Pressable onPress={() => handleNavigation(navigateTo)}>
      <Text>
        <TabText color="textMenu" fontWeight="bold">
          {tabText}
        </TabText>
      </Text>
    </Pressable>
  ); 
};

export default AppBarTab;