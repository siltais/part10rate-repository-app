import { FlatList, View, StyleSheet, SafeAreaView } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  listContainer: {
    flex: 1
  }
});

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : [];

  return (
    <SafeAreaView style={styles.listContainer}>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) =>
          <RepositoryItem item={item} />
        }
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;
const RepositoryList = () => {
  const { repositories } = useRepositories();
  
  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;