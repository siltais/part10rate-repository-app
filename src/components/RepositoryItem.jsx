import { StyleSheet, View, Pressable } from 'react-native';
import { useParams } from 'react-router-native';
import theme from '../theme';
import RepositoryItemStats from './RepositoryItemStats';
import RepositoryItemHeader from './RepositoryItemHeader';
import Text from './Text';
import * as Linking from 'expo-linking';



const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: theme.colors.textMenu,
    padding: 25
  },
  languageTagContainer: {
    flexDirection: 'column',
    alignItems: 'strech'
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
    textAlign: 'center'
  },
});

const RepositoryItem = (props) => {
  const isSingleRepository = () => {
    let { repositoryId } = useParams();
    if(repositoryId){
      return (
        <View style={styles.languageTagContainer}>
          <Pressable onPress={ () => { Linking.openURL(props.item.url); }}>
            <Text color="textMenu" style={styles.languageTag}>Open in Github</Text>
          </Pressable>
        </View>  
      );
    }
  }
  return (
    <View testID="repositoryItem" style={styles.itemContainer} >
      <RepositoryItemHeader item={props.item}/>
      <RepositoryItemStats item={props.item}/>
      {isSingleRepository()}
    </View>
  );
};

export default RepositoryItem;

