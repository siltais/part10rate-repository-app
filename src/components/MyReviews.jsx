import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import theme from '../theme';
import ThemeText from './Text';
import { format } from "date-fns";

import { useQuery } from '@apollo/client'
import { ME } from '../graphql/queries'

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: theme.colors.textMenu,
    flexDirection: 'row',
    padding: 25,
  },
  itemTextContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    flexGrow: 1,
    flex: 1
  },
  separator: {
    height: 10,
  },
  listContainer: {
    flex: 1,
  },
  ratingContainer: {
    width:50,
    height:50,
    borderColor: theme.colors.primary,
    borderWidth:2,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


const ReviewItem = ({ review }) => {
  const today = new Date(review.createdAt);
  const formattedDate = format(today, 'dd.MM.yyyy');
  return (
    <View style={styles.itemContainer}>
      <View style={styles.ratingContainer}>
        <ThemeText fontWeight="bold" color="primary">{ review.rating }</ThemeText>
      </View>
      <View style={styles.itemTextContainer}>
        <ThemeText fontWeight="bold" >{ review.repository.fullName }</ThemeText>
        <ThemeText color="textSecondary" >{ formattedDate  }</ThemeText>
        <Text>{ review.text }</Text>
      </View>
    </View>
  );
}

const ReviewContainer = ({reviews}) => {
  
  const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={styles.listContainer}>
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
      />
    </SafeAreaView>
  );
}

const MyReviews = () => {

  const meResult = useQuery(ME, {
    variables: {includeReviews: true}
  })

  if(meResult.loading){
    return <Text>Loading...</Text>;
  }

  return <ReviewContainer reviews={meResult.data.me.reviews} />
};

export default MyReviews;