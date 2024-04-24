import { FlatList, View, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  listContainer: {
    flex: 1
  }
});

export const RepositoryListContainer = ({ repositories, singleRepository }) => {
 

  const repositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : [];


  return (
    <SafeAreaView style={styles.listContainer}>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) =>
          <Pressable onPress={ () => singleRepository(item) }>
            <RepositoryItem item={item} />
          </Pressable>
        }
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;
const RepositoryList = () => {
  const { repositories } = useRepositories();

  const navigate = useNavigate();
  const singleRepository = (item) => {
    navigate(`/repository/${item.id}`);
  }

  return <RepositoryListContainer singleRepository={singleRepository} repositories={repositories} />;
};

export default RepositoryList;