import * as React from 'react';
import { useParams } from 'react-router-native';
import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';

import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import useReviews from '../hooks/useReviews';
import theme from '../theme';
import ThemeText from './Text';
import { format } from "date-fns";

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: theme.colors.textMenu,
    flexDirection: 'row',
    padding: 25,
    marginTop:10,
  },
  itemTextContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    flexGrow: 1,
    flex: 1
  },
  separator: {
    height: 5,
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

const RepositoryInfo = ({ repository }) => {
  if(repository){
    return( 
      <View >
        <RepositoryItem item={repository} />
      </View>
    );
  } else {
    return(
      <View>
        <Text>Loading...</Text>  
      </View>
    );
  }
};

const ReviewItem = ({ review }) => {
  const today = new Date(review.createdAt);
  const formattedDate = format(today, 'dd.MM.yyyy');
  return (
    <View style={styles.itemContainer}>
      <View style={styles.ratingContainer}>
        <ThemeText fontWeight="bold" color="primary">{ review.rating }</ThemeText>
      </View>
      <View style={styles.itemTextContainer}>
        <ThemeText fontWeight="bold" >{ review.user.username }</ThemeText>
        <ThemeText color="textSecondary" >{ formattedDate  }</ThemeText>
        <Text>{ review.text }</Text>
      </View>
    </View>
  );
}

const ReviewContainer = ({reviews, repository}) => {
  
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
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      />
    </SafeAreaView>
  );
}

const SingleRepository = () => {

  let { repositoryId } = useParams();

  const { reviews } = useReviews(repositoryId);
  const { repository } = useRepository(repositoryId);
 
  return <ReviewContainer repository={repository} reviews={reviews} />

};

export default SingleRepository;