import { useRef, useState, useEffect } from 'react';
import { Searchbar  } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useDebouncedCallback } from "use-debounce";


const styles = StyleSheet.create({
  filterBar: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: 'white',
    margin:20,
    borderRadius:5,
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOpacity: 0.3
  }
});

const FilterBar = ({ orderList, setOrderList, usedSearch, setUsedSearch }) => {
  
  const defaultValue = orderList ? orderList[3] : "";
  const searchInput = useRef(null);
  
  const [value, setValue] = useState(defaultValue);
  const [startedSearch, setstartedSearch] = useState('');

  const [searchQuery, setSearchQuery] = useState(false);
  const debounced = useDebouncedCallback((query) => {
    setSearchQuery(query);
  }, 500);


  useEffect(() => {
    if(searchQuery || !searchQuery && startedSearch){
      handleSearchQuery();
    }
  }, [searchQuery]);

  useEffect(() => {
    if(usedSearch){
      searchInput.current.focus();
    }
  }, [usedSearch]);

  const handleSearchInput = (e) => {
    setstartedSearch(true);
    setValue(e);
    debounced(e);
  }

  const handleSearchQuery = () => {
    const newSearch = orderList.map((o, i) => {
      if(i === 3) {
        return searchQuery;
        } else {
          return o;
        }
      }
    );
    setUsedSearch(true);
    setOrderList(newSearch);
  }

  return (
    <Searchbar
      ref={searchInput}
      style={styles.filterBar}
      placeholder="Search"
      value={value}
      onChangeText={handleSearchInput}
    />
  );
};

export default FilterBar;