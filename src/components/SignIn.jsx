import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: theme.colors.textMenu,
    padding: 25
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: 'gray'
  },
  submit: {
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary
  }
});

const initialValues = {
  user: '',
  pass: '',
};

const LoginForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.itemContainer}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formik.values.user}
        onChangeText={formik.handleChange('user')}
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formik.values.pass}
        onChangeText={formik.handleChange('pass')}
        placeholderTextColor="gray"
        secureTextEntry={true}
      />
      <Pressable onPress={formik.handleSubmit} style={ () => styles.submit } >
        <Text textAlign="center" fontWeight="bold" color="textMenu">Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = values => {
    console.log(values)
  };

  return (
    <LoginForm onSubmit={onSubmit} />
  );  
};

export default SignIn;