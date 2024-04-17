import { Pressable, Text } from 'react-native';
import TabText from './Text';


const AppBarTab = ({ tabText }) => {
  return(
    <Pressable>
      <Text>
        <TabText color="textMenu" fontWeight="bold">
          {tabText}
        </TabText>
      </Text>
    </Pressable>
  ); 
};

export default AppBarTab;