import { StyleSheet, View } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  headerTextContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingLeft: 10,
    marginTop: 10,
    rowGap:5,
    flexGrow: 1,
    flex: 1
  },
  languageTagContainer: {
    flexDirection: 'row',
    columnGap: 10,
    alignSelf: 'flex-start'
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5
  },
});

const RepositoryItemText = ({ item }) => {
  return (
    <View style={styles.headerTextContainer}>
      <Text fontWeight="bold">{item.fullName}</Text>
      <Text color="textSecondary">{item.description}</Text> 
        <View style={styles.languageTagContainer}>
          <Text color="textMenu" style={styles.languageTag}>{item.language}</Text>
        </View>   
    </View>
  );
};

export default RepositoryItemText;