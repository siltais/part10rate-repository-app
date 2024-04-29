import * as React from 'react';
import { List } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  head: {
    backgroundColor: theme.colors.seperatorColor,
    padding: 20,
  },
  menuItem: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#f5f6f7',
    marginLeft: 20,
    marginRight: 20,
  },
  menuTitle: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#f5f6f7',
    color: 'gray',
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20
  },
});

const SortBar = ({ orderList, setOrderList, setUsedSearch }) => {
  
  const [expanded, setExpanded] = React.useState(false);
  const handlePress = () => setExpanded(!expanded);

  const sortTtile = orderList ? orderList[2] : "";

  const handleSorting = (option) => {
    setExpanded(false);
    const newSort = [
      `${option.orderBy}`, 
      `${option.orderDirection}`, 
      `${option.title}`, 
      orderList[3]
    ];
    setUsedSearch(false);
    setOrderList(newSort);
  }

  return (
    <List.Section>
      <List.Accordion
        style = {styles.head}
        expanded={expanded}
        onPress={() => handlePress()}
        title={sortTtile}
        left={props => <List.Icon {...props} icon="sort" />}>
        <List.Item 
          titleStyle={styles.menuTitle} 
          style={styles.menuTitle} 
          title="Select an item..." />
        <List.Item 
          style={styles.menuItem} 
          title="Latest repositories" 
          onPress={
            () => handleSorting({
              "title": "Latest repositories", 
              "orderBy": "CREATED_AT",
              "orderDirection": "DESC"
            })} 
        />
        <List.Item 
          style={styles.menuItem} 
          title="Highest rated repositories"
          onPress={
            () => handleSorting({
              "title": "Highest rated repositories",
              "orderBy": "RATING_AVERAGE",
              "orderDirection": "DESC"
            })} 
        />
        <List.Item 
          style={styles.menuItem} 
          title="Lowest rated repositories"
          onPress={
            () => handleSorting({
              "title": "Lowest rated repositories", 
              "orderBy": "RATING_AVERAGE",
              "orderDirection": "ASC"
            })} 
        />
      </List.Accordion>
    </List.Section>
  );
};

export default SortBar;