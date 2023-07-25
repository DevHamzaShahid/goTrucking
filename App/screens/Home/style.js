import {color} from '../../utils/colors';

const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  // Card
  ScrollView: {width: '100%', marginTop: -185},
  BlueBackCard: {
    backgroundColor: color.appBlue,
    height: 340,
    width: '85%',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 4,
    zIndex: -2,
  },
  MainCardContainer: {
    paddingVertical: 15,
    backgroundColor: color.white,
    height: 340,
    width: '85%',
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 20,
  },
  // CardHeader
  CardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  Icon: {
    borderRadius: 50,
    height: 70,
    width: 70,
    borderWidth: 7,
    borderColor: color.appBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  PriceView: {
    backgroundColor: color.appBlue,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12,
    height: 22,
    paddingHorizontal: 8,
  },
  price: {color: color.white, fontWeight: '600'},
  //View Button
  ViewDetailsBtn: {
    width: '45%',
    backgroundColor: color.appLightBlue,
    alignSelf: 'center',
    height: 30,
    position: 'absolute',
    bottom: -15,
    borderRadius: 7,
  },
  BtnText: {fontSize: 14, color: color.white, fontWeight: 'bold'},
  // profile
  profileContainer1: {
    height: 180,
    borderColor: color.white,
    borderWidth: 1,
    width: 180,
    borderRadius: 100,
    backgroundColor: color.blue,
  },
  profileContainer2: {
    height: 180,
    width: 180,
    borderRadius: 100,
    marginLeft: 7,
    backgroundColor: color.blue,
  },
  profilePhoto: {left: -2,top:-2, position: 'absolute', borderRadius: 120},
  //Hide LAyer
  HideLayer: {position: 'absolute', zIndex: 0, width: '100%'},
  //userDetail Container
  UserDetailContainer: {
    position: 'absolute',
    marginTop: 126,
    paddingHorizontal: 20,
  },
  email: {color: color.white},
  name: {fontWeight: 'bold', color: color.white},
  //rest of the stuff
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 60,
    backgroundColor: 'transparent',
    position: 'absolute',
    marginTop: 30,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconContainer: {
    marginRight: 10,
  },
  buttonContainer: {
    marginRight: 10,
    height: 30,
    backgroundColor: color.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    width: '40%',
    // paddingHorizontal:15
  },
  buttonText: {
    color: color.black,
    fontWeight: '700',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'absolute',
    right: -20,
    top: -35,
  },
  image: {
    width: 100,
    height: 100,
  },

  // card body
  containerCard: {
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
  },
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  separatorHorizontal: {
    width: '70%',
    alignSelf: 'center',
    height: 1,
    backgroundColor: '#64A9E1',
    borderRadius: 10,
  },
  separatorVertical: {
    width: 1,
    backgroundColor: '#64A9E1',
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  textSmall: {
    marginVertical: 5,
  },
});
export default styles;
