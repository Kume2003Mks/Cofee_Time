import { StyleSheet, StatusBar } from 'react-native';

export const GlobalStyles = StyleSheet.create({
    SafeAreaViewstyle: {
        paddingTop: StatusBar.currentHeight,
        flex: 1,
        paddingHorizontal: 4,
        marginBottom: 90,
    },
    H1: {
        fontSize: 24,
    },
     container: {
    flex: 1,
    paddingTop: 1,
  },
});