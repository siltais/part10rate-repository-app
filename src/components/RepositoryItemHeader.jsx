import { StyleSheet, View, Image } from 'react-native';
import theme from '../theme';
import RepositoryItemText from './RepositoryItemText';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: theme.colors.textMenu,
    flexDirection: 'row',
    rowGap: 10,
    columnGap: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5
  },
});

const RepositoryItemHeader = ({ item }) => {
  return (
    <View style={styles.headerContainer}>
      <Image
        style={styles.avatar}
        source={{
        uri: item.ownerAvatarUrl,
        }}
      />
      <RepositoryItemText item={item}/>
    </View>
    );
  };

export default RepositoryItemHeader;