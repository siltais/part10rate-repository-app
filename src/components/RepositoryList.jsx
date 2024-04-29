import { 
  FlatList, 
  View, 
  StyleSheet, 
  SafeAreaView, 
  Pressable 
} from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import SortBar from './SortBar';
import FilterBar from './FilterBar';
import { useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  listContainer: {
    flex: 1
  }
});

export const RepositoryListContainer = ({ 
  repositories, 
  singleRepository,
  orderList, 
  setOrderList,
  usedSearch,
  setUsedSearch 
}) => {
  

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
        ListHeaderComponent={
          () => (<>
            <FilterBar 
              orderList={orderList} 
              setOrderList={setOrderList}
              usedSearch={usedSearch}
              setUsedSearch={setUsedSearch}
            />
            <SortBar 
              orderList={orderList} 
              setOrderList={setOrderList}
              setUsedSearch={setUsedSearch}
            />
            </>
          )
        }
      />
    </SafeAreaView>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;
const RepositoryList = () => {
  const [usedSearch, setUsedSearch] = useState(false);
  const [orderList, setOrderList] = useState(
    ["CREATED_AT", "DESC", "Latest repositories", ""]
  );

  const { repositories } = useRepositories(
    [
      `${orderList[0]}`,
      `${orderList[1]}`,
      `${orderList[3]}`
    ]
  );

  const navigate = useNavigate();
  const singleRepository = (item) => {
    navigate(`/repository/${item.id}`);
  }

  return (
    <RepositoryListContainer
      usedSearch={usedSearch}
      setUsedSearch={setUsedSearch}
      orderList={orderList} 
      setOrderList={setOrderList} 
      singleRepository={singleRepository} 
      repositories={repositories} 
    />
  );
};

export default RepositoryList;