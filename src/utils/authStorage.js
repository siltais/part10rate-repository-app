import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  getAccessToken() {
    const accessToken = AsyncStorage.getItem(
      `${this.namespace}:auth`,
    );
    return accessToken ? accessToken : '';
  }

  setAccessToken(accessToken) {
    AsyncStorage.setItem(
      `${this.namespace}:auth`, accessToken 
    );
  }

  removeAccessToken() {
    AsyncStorage.removeItem(`${this.namespace}:auth`);
  }
}

export default AuthStorage;