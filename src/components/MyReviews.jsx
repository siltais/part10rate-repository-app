import { 
  View, 
  Text, 
  FlatList, 
  SafeAreaView, 
  StyleSheet, 
  Pressable,
  Alert 
} from 'react-native';
import { useNavigate } from 'react-router-native';

import theme from '../theme';
import ThemeText from './Text';
import { format } from "date-fns";

import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

import useDeleteReview from '../hooks/useDeleteReview';

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
  },
  viewButton: {
    height: 40,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    flex: 1,
  },
  deleteButton: {
    height: 40,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#d6394c',
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: theme.colors.textMenu,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  }
});


const ReviewItem = ({ review, reviewDeletetion }) => {
  const navigate = useNavigate();
  const today = new Date(review.createdAt);
  const formattedDate = format(today, 'dd.MM.yyyy');

  const confirmDeletion = (deleteId) => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => reviewDeletetion(deleteId)},
    ]);
  }

  return (
    <>
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
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => {navigate(`/repository/${review.repository.id}`);}} style={ () => styles.viewButton } >
          <ThemeText textAlign="center" fontWeight="bold" color="textMenu">View repository</ThemeText>
        </Pressable>
        <Pressable onPress={ () => confirmDeletion(review.id) } style={ () => styles.deleteButton } >
          <ThemeText textAlign="center" fontWeight="bold" color="textMenu">Delete review</ThemeText>
        </Pressable>
      </View>
    </>
  );
}

const ReviewContainer = ({reviews, reviewDeletetion}) => {
  
  const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={styles.listContainer}>
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} reviewDeletetion={reviewDeletetion} />}
        keyExtractor={({ id }) => id}
      />
    </SafeAreaView>
  );
}

const MyReviews = () => {

  const [deleteReview] = useDeleteReview();
  const reviewDeletetion = async (id) =>{
    try{
      await deleteReview(id);
      meResult.refetch();
    }  catch (e) {
      console.log(e);
    }
  }

  const meResult = useQuery(ME, {
    variables: {includeReviews: true}
  })

  if(meResult.loading){
    return <Text>Loading...</Text>;
  }

  return <ReviewContainer reviews={meResult.data.me.reviews} reviewDeletetion={reviewDeletetion}/>
};

export default MyReviews;