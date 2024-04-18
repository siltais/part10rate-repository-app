import { StyleSheet, View } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    columnGap: 45,
    padding: 10
  }
});

const RepositoryItemStats = ({ item }) => {

  const formatNumber = (theNumber) => {
    if ( theNumber >= 1000 ) {
      theNumber /= 1000;
      return parseFloat(theNumber).toFixed(1) + "k";
    } 
    return theNumber;
  };

  return (
    <View style={styles.statsContainer}>
      <Text color="textSecondary" textAlign="center"><Text fontWeight="bold">{`${formatNumber(item.stargazersCount)}`}</Text>{`\nStars`}</Text>
      <Text color="textSecondary" textAlign="center"><Text fontWeight="bold">{`${formatNumber(item.forksCount)}`}</Text>{`\nForks`}</Text>
      <Text color="textSecondary" textAlign="center"><Text fontWeight="bold">{`${formatNumber(item.reviewCount)}`}</Text>{`\nReviews`}</Text>
      <Text color="textSecondary" textAlign="center"><Text fontWeight="bold">{`${formatNumber(item.ratingAverage)}`}</Text>{`\nRating`}</Text>
    </View>
  );
};

export default RepositoryItemStats;