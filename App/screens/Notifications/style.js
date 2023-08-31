import { color } from "../../utils/colors";

const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create( {
    notificationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: 80,
      backgroundColor: '#e6eaee',
      marginBottom: 5,
      borderRadius: 8,
      padding: 8,
    },
    icon: {
      flex: 0.2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconImage: {
      width: '80%',
      height: '80%',
      resizeMode: 'contain',
    },
    content: {
      flex: 0.7,
      paddingHorizontal: 10,
    },
    heading: {
      fontSize: 16,
      fontWeight: 'bold',
        marginBottom: 4,
      color:color.black
    },
    description: {
      fontSize: 14,
      color: '#666',
    },
    closeIcon: {
      flex: 0.1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeIconImage: {
      width: '60%',
      height: '60%',
      resizeMode: 'contain',
    },
  });
  