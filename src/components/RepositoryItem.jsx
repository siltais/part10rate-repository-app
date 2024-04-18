import { StyleSheet, View } from 'react-native';
import theme from '../theme';
import RepositoryItemStats from './RepositoryItemStats';
import RepositoryItemHeader from './RepositoryItemHeader';

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: theme.colors.textMenu,
    padding: 25
  }
});

const RepositoryItem = (props) => {
  return (
    <View style={styles.itemContainer}>
      <RepositoryItemHeader item={props.item}/>
      <RepositoryItemStats item={props.item}/>
    </View>
  );
};

export default RepositoryItem;

