import * as React from 'react';
import { List } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  menuItem: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#f5f6f7',
  },
  menuTitle: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#f5f6f7',
    color: 'gray',
    textAlign: 'center'   
  },
});

const SortBar = ({ orderList, setOrderList }) => {
  
  const [expanded, setExpanded] = React.useState(false);

  const handlePress = () => setExpanded(!expanded);

  const handleSorting = (option) => {
    setExpanded(false);
    setOrderList([`${option.orderBy}`, `${option.orderDirection}`, `${option.title}`]);
  }

  return (
    <List.Section>
      <List.Accordion
        expanded={expanded}
        onPress={() => handlePress()}
        title={orderList[2]}
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