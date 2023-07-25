import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Block from '../../components/Block';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {color} from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapBackBtn from '../../asset/svgIcons/mapBackBtn.svg';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import * as Progress from 'react-native-progress';
import SquarePrev from '../../asset/svgIcons/squarePrevious.svg';
import SquareNext from '../../asset/svgIcons/squareNext.svg';
import Location from '../../asset/svgIcons/Location.svg';
import MapEye from '../../asset/svgIcons/MapEye.svg';
import MapNavigate from '../../asset/svgIcons/mapNavigate.svg';
import FormText from '../../components/FormText';
import {route} from '../../Routes';
import Card from '../../components/Card';
import {useRoute} from '@react-navigation/native';
import {dimensions, dimensionsWidth} from '../../Dimensions';
import Navigate from '../../asset/svgIcons/navigation.svg';
import Clockreport from '../../asset/svgIcons/clockReport.svg';
import ClockConfirmArrival from '../../asset/svgIcons/clockConfirmArrival.svg';
import ClockConfirmArrivalwhite from '../../asset/svgIcons/clockConfirmArrivalwhite.svg';
import CustomAlert from '../../components/CustomAlert';
import CustomDropDown from '../../components/CustomDropDown';
import TrackingIcon from '../../asset/svgIcons/Tracking.svg';
import PackageDetail from '../../asset/svgIcons/PackageDetail.svg';
import ConfirmDeparture from '../../asset/svgIcons/ConfirmDeparture.svg';
// import MapEye from '../../asset/svgIcons/mapEye.svg'
// import MapNavigate from '../../asset/svgIcons/mapNavigate.svg'
// const arrDummy = [
//   {
//     id: '234',
//     item: 'Gloves Box',
//     description: 'cvdscdscdscds',
//   },
//   {
//     id: '23c4',
//     item: 'Grocery',
//     description: 'cdscdscdscdsgvfsrs',
//   },
//   {
//     id: '23cd4',
//     item: 'Leather Jackets',
//     description: 'fretdfg',
//   },
//   {
//     id: '233324',
//     item: 'Footballs',
//     description: 'cdscdscdscdscdscs',
//   },
//   {
//     id: '234324',
//     item: 'Leather Jackets box',
//     description: 'cccccccccccc',
//   },
// ];
const arrDummy = [
  {
    id: '234',
    item: 'Package 1',
    description: 'cvdscdscdscds',
  },
  {
    id: '23c4',
    item: 'Package 2',
    description: 'cdscdscdscdsgvfsrs',
  },
  {
    id: '23cd4',
    item: 'Package 3',
    description: 'fretdfg',
  },
  {
    id: '233324',
    item: 'Package 4',
    description: 'cdscdscdscdscdscs',
  },
  {
    id: '234324',
    item: 'Package 5',
    description: 'cccccccccccc',
  },
];
const itemWidth = dimensionsWidth * 0.88;
const itemSpacing = 20;
const magneticOffset = (itemWidth + itemSpacing) / 2;
const index = ({navigation}) => {
  //   const [successErrorAlert, setSuccessErrorAlert] = useState(false);
  //   const [showOrderDetail, setShowOrderDetail] = useState(false);
  //   const [currentIndex, setCurrentIndex] = useState(0);
  //   const [readyForPickup, setReadyForPickup] = useState(false);
  const [chooseDelayTime, setChooseDelayTime] = useState(false);
  const [delayHours, setDelayHours] = useState(null);
  const [delayMins, setDelayMins] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [closeBtn, setClosBtn] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState('');

  const parameter = useRoute();
  const param = parameter?.params;

  const checkDelayedTime =
    delayHours != null || delayMins != null ? true : false;

  // calculate the progress
  //   const progressValue = currentIndex / (arrDummy?.length - 1);
  // back for the map screen
  const handleBackPress = () => {
    navigation.goBack();
  };
  //   // card next button
  //   const handleNextPress = () => {
  //     setCurrentIndex(prevIndex => (prevIndex + 1) % arrDummy.length);
  //   };
  //   //   card Back Button
  //   const handlePreviousPress = () => {
  //     setCurrentIndex(
  //       prevIndex => (prevIndex - 1 + arrDummy.length) % arrDummy.length,
  //     );
  //   };
  const handleHourChange = value => {
    setDelayHours(value);
  };
  const handleMinsChange = value => {
    setDelayMins(value);
  };
  const confirmDeparture = () => {
    // navigation.navigate(route.MyRoutes);
    setDeliveryStatus('delivery');
  };
  const closeSuccessErrorAlert = () => {
    setShowAlert(false);
  };
  const closeButton = () => {
    setClosBtn(false);
    setChooseDelayTime(false);
  };

  return (
    <SafeAreaView flex={1}>
      <Block>
        {chooseDelayTime && (
          <View
            style={{
              position: 'absolute',
              zIndex: 999,
              backgroundColor: color.white,
              height: 300,
              width: '90%',
              alignSelf: 'center',
              marginTop: (dimensions / 2) * 0.3,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: color.appBlue,
            }}>
            {/* close icon */}
            <TouchableOpacity
              onPress={() => closeButton()}
              style={{
                position: 'absolute',
                top: 25,
                right: 25,
                height: 25,
                width: 25,
                borderRadius: 4,
                borderColor: color.appBlue,
                borderWidth: 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="close" color={'#1E3A52'} size={22} />
            </TouchableOpacity>

            {/* delay setclock logo */}
            <View
              style={{
                backgroundColor: color.appBlue,
                height: 100,
                width: 100,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                position: 'absolute',
                top: -25,
              }}>
              <View
                style={{
                  borderWidth: 1.3,
                  borderColor: color.white,
                  height: 95,
                  width: 95,
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Clockreport height={60} width={60} />
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 100,
              }}>
              {/* Dropdown pickers */}
              <CustomText
                size={18}
                style={{color: color.appBlue, fontWeight: '500'}}>
                Please Choose your current time
              </CustomText>
              <View
                style={{width: 120, position: 'absolute', left: 30, top: 40}}>
                <CustomDropDown
                  placeholder={'Hours'}
                  objects={[
                    {label: '1 hour', value: '1 hour'},
                    {label: '2 Hours', value: '2 hours'},
                    {label: '3 Hours', value: '3 hours'},
                  ]}
                  onChange={handleHourChange}
                />
              </View>
              <View
                style={{width: 120, position: 'absolute', right: 30, top: 40}}>
                <CustomDropDown
                  placeholder={'Mins'}
                  objects={[
                    {label: '10 mins', value: '10 mins'},
                    {label: '15 mins', value: '15 mins'},
                    {label: '30 mins', value: '30 mins'},
                  ]}
                  onChange={handleMinsChange}
                />
              </View>
            </View>
            <CustomButton
              onPress={() => closeButton()}
              title={'Continue'}
              buttonStyle={{
                zIndex: -2,
                position: 'absolute',
                bottom: 20,
                alignSelf: 'center',
                height: 40,
                width: '60%',
                backgroundColor: color.appBlue,
              }}
              textStyle={{color: color.white, fontWeight: '500'}}
            />
          </View>
        )}
        {/* Custom Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress}>
            <MapBackBtn height={45} width={45} />
          </TouchableOpacity>
          <View
            style={{
              marginLeft: 22,
              backgroundColor: color.white,
              height: 35,
              width: '60%',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: 32,
                width: '98%',
                borderRadius: 9,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: color.appBlue,
              }}>
              <CustomText
                size={18}
                style={{fontWeight: '500', color: color.appBlue}}>
                In-Transit
              </CustomText>
            </View>
          </View>
        </View>

        {/* Map */}
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          zoomEnabled={true}
          showsScale={true}
          showsBuildings={true}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        {/* new map Card */}
        {showAlert && (
          <CustomAlert
            closeSuccessErrorAlert={closeSuccessErrorAlert}
            buttonText="OK"
            alertType="error"
            Title={'ERROR'}
            description={
              'Please set delayed time first......under development/only for screen testing'
            }
          />
        )}
        {deliveryStatus != 'delivery' ? (
          <View
            style={{
              position: 'absolute',
              bottom: 20,
            }}>
            <ScrollView
              horizontal
              snapToInterval={
                dimensionsWidth / 1.15 + (dimensionsWidth / 2) * 0.25
              }
              decelerationRate="fast" // You can experiment with different rates
              showsHorizontalScrollIndicator={false}>
              {arrDummy.map((item, index) => (
                <View
                  key={index} // Make sure to set a unique key for each item
                  style={{
                    backgroundColor: color.white,
                    alignSelf: 'flex-end',
                    width: dimensionsWidth / 1.15,
                    marginLeft: (dimensionsWidth / 2) * 0.25,
                    borderRadius: 15,
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                  }}>
                  {/* Card Header */}
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      borderTopLeftRadius: 15,
                      borderTopRightRadius: 15,
                    }}>
                    <View
                      style={{
                        width: '20%',
                        height: 60,
                        borderTopLeftRadius: 15,
                      }}>
                      <TrackingIcon
                        height={110}
                        width={110}
                        style={{position: 'absolute', left: -50, top: -30}}
                      />
                    </View>
                    <View style={{width: '60%', height: 60}}>
                      <CustomText
                        size={15}
                        style={{color: color.appBlue, fontWeight: '600'}}>
                        Pick up point 1
                      </CustomText>
                      <CustomText
                        size={10}
                        style={{color: color.appBlue, fontWeight: '500'}}>
                        ID : 8837373828
                      </CustomText>
                      <CustomText
                        size={10}
                        style={{color: color.appBlue, fontWeight: '500'}}>
                        No75, Grand Lake,HDT45H, sydney, Australia.
                      </CustomText>
                    </View>
                    <View
                      style={{
                        width: '20%',
                        height: 60,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTopRightRadius: 15,
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: color.appBlue,
                          height: 30,
                          width: 30,
                          borderRadius: 4,
                        }}>
                        <Navigate />
                      </View>
                    </View>
                  </View>

                  {/* Card Description */}
                  <View
                    style={{
                      width: '100%',
                      height: 50,
                      alignSelf: 'center',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        width: '33%',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        paddingLeft: 10,
                      }}>
                      <CustomText
                        size={12}
                        style={{color: color.textGrey, fontWeight: '500'}}>
                        Time
                      </CustomText>
                      <CustomText
                        size={13}
                        style={{color: color.appBlue, fontWeight: '600'}}>
                        7am - 8:30am
                      </CustomText>
                    </View>
                    <View
                      style={{
                        width: '33%',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        paddingLeft: 10,
                      }}>
                      <CustomText
                        size={12}
                        style={{color: color.textGrey, fontWeight: '500'}}>
                        Total Packages
                      </CustomText>
                      <CustomText
                        size={13}
                        style={{color: color.appBlue, fontWeight: '600'}}>
                        4
                      </CustomText>
                    </View>
                    <View
                      style={{
                        width: '33%',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        paddingLeft: 10,
                      }}>
                      <CustomText
                        size={12}
                        style={{color: color.textGrey, fontWeight: '500'}}>
                        Package Volume
                      </CustomText>
                      <CustomText
                        size={13}
                        style={{color: color.appBlue, fontWeight: '600'}}>
                        200 Kg
                      </CustomText>
                    </View>
                  </View>

                  {/* footer Detail */}

                  <View
                    style={{
                      height: 50,
                      width: '95%',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      marginVertical: 10,
                    }}>
                    <CustomText
                      size={14}
                      style={{
                        color: color.textGrey,
                        fontWeight: '500',
                        marginVertical: 2,
                      }}>
                      Special Instructions :
                    </CustomText>
                    <CustomText
                      size={14}
                      style={{color: color.appBlue, fontWeight: '500'}}>
                      Handle with care
                    </CustomText>
                  </View>

                  {/* Buttons */}
                  {/* Extra buttons depending on screens requirement {arrival buttons} */}
                  {param.requireButtonType == 'arrival' && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        marginVertical: 10,
                      }}>
                      <CustomButton
                        onPress={() => setChooseDelayTime(true)}
                        buttonStyle={{
                          backgroundColor: color.errorRed,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 40,
                          width: '48%',
                        }}
                        textStyle={{
                          fontWeight: '600',
                          fontSize: 11,
                          color: color.white,
                          marginHorizontal: 10,
                        }}
                        icon={<Clockreport />}
                        title={'Report Delay'}
                      />
                      <CustomButton
                        onPress={() => {
                          if (checkDelayedTime) {
                            navigation.navigate(route.PackageDetails);
                          } else {
                            setShowAlert(true);
                          }
                        }}
                        buttonStyle={{
                          backgroundColor: checkDelayedTime
                            ? color.successGreen
                            : color.white,
                          borderWidth: 2.5,
                          borderColor: color.successGreen,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 40,
                          width: '48%',
                        }}
                        textStyle={{
                          fontWeight: '600',
                          fontSize: 11,
                          color: checkDelayedTime
                            ? color.white
                            : color.successGreen,
                          marginHorizontal: 10,
                        }}
                        icon={
                          checkDelayedTime ? (
                            <ClockConfirmArrivalwhite />
                          ) : (
                            <ClockConfirmArrival />
                          )
                        }
                        title={'Confirm Arrival'}
                      />
                    </View>
                  )}

                  {/* Confirm departure button*/}
                  {param.requireButtonType == 'departure' && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        marginVertical: 10,
                      }}>
                      <CustomButton
                        onPress={() =>
                          navigation.navigate(route.PackageDetails)
                        }
                        buttonStyle={{
                          backgroundColor: color.appLightBlue,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 40,
                          width: '48%',
                        }}
                        textStyle={{
                          fontWeight: '600',
                          fontSize: 11,
                          color: color.white,
                          marginHorizontal: 10,
                        }}
                        icon={<PackageDetail />}
                        title={'Packages Detail'}
                      />
                      <CustomButton
                        onPress={() => confirmDeparture()}
                        buttonStyle={{
                          backgroundColor: color.white,
                          borderWidth: 2.5,
                          borderColor: color.successGreen,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 40,
                          width: '48%',
                        }}
                        textStyle={{
                          fontWeight: '600',
                          fontSize: 11,
                          color: color.successGreen,
                          marginHorizontal: 10,
                        }}
                        icon={<ConfirmDeparture />}
                        title={'Confirm Departure'}
                      />
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        ) : (
          <View
            style={{
              position: 'absolute',
              bottom: 20,
            }}>
            <ScrollView
              horizontal
              snapToInterval={itemWidth + itemSpacing}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}>
              {arrDummy.map((item, index) => (
                <View
                  style={{
                    marginLeft: itemSpacing,
                    width: itemWidth,
                    flexDirection: 'row',
                    paddingVertical: 15,
                    backgroundColor: color.white,
                    borderRadius: 15,
                  }}>
                  <View style={{width: '20%'}}>
                    <TrackingIcon
                      style={{position: 'absolute', top: -25, left: -25}}
                      width={90}
                      height={90}
                    />
                  </View>
                  <View style={{width: '50%', paddingLeft: 7}}>
                    <CustomText
                      size={16}
                      style={{fontWeight: '600', color: color.appBlue}}>
                      {item.item}
                    </CustomText>
                    <CustomText
                      size={12}
                      style={{fontWeight: '500', color: color.appBlue}}>
                      No75, Grand Lake,HDT45H, sydney, Australia.
                    </CustomText>
                  </View>
                  <View
                    style={{
                      width: '30%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate(route.Receipt)}
                      style={{
                        paddingHorizontal: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 30,
                        borderBottomLeftRadius: 12,
                        borderTopRightRadius: 12,
                        borderBottomRightRadius: 12,
                        borderWidth: 1.2,
                        borderColor: color.appBlue,
                      }}>
                      <CustomText size={10} style={{fontWeight: '600'}}>
                        Confirm Delivery
                      </CustomText>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', marginVertical: 10}}>
                      <TouchableOpacity
                        // onPress={() => setShowOrderDetail(!showOrderDetail)}>
                        onPress={() =>
                          navigation.navigate(route.PackageDetails)
                        }>
                        <MapEye />
                      </TouchableOpacity>
                      {/* <TouchableOpacity
                        onPress={() => alert('navigation in progress')}>
                        <MapNavigate />
                      </TouchableOpacity> */}
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </Block>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 2,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  map: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopRightRadius: 20,
    borderTopStartRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
});
export default index;

// {/* Map Card at the Bottom  */}
// <View style={styles.card}>
// {/*card progress header */}
// <View style={{ alignSelf: 'center', width: '100%', }}>
//     {currentIndex != 0 && <TouchableOpacity style={{ position: 'absolute', left: 10 }}><SquarePrev onPress={handlePreviousPress} /></TouchableOpacity>}
//     <Progress.Bar progress={currentIndex == 0 ? 0.1 : progressValue} style={{ alignSelf: 'center', height: 10, borderRadius: 20 }} height={10} color={color.appLightBlue} width={200} />
//     {currentIndex != arrDummy.length - 1 && <TouchableOpacity style={{ position: 'absolute', right: 10 }}><SquareNext onPress={handleNextPress} /></TouchableOpacity>}
// </View>
// {/* card main header */}
// <View style={{ width: '100%', flexDirection: 'row', marginTop: 40 }}>
//     <View style={{ width: '15%', }}>
//         <View style={{ height: 45, width: 45, borderRadius: 25, backgroundColor: color.appLightBlue, alignItems: 'center', justifyContent: 'center' }}>
//             <Location />
//         </View>
//     </View>
//     <View style={{ width: '55%', paddingLeft: 7 }}>
//         <CustomText size={16} style={{ fontWeight: '600', color: color.appBlue }}>{arrDummy[currentIndex].item}</CustomText>
//         <CustomText size={12} style={{ fontWeight: '500', color: color.appBlue }}>No75, Grand Lake,HDT45H,  sydney, Australia.</CustomText>
//     </View>
//     <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
//         <TouchableOpacity onPress={() => navigation.navigate(route.Receipt)} style={{ paddingHorizontal: 4, alignItems: 'center', justifyContent: 'center', height: 30, borderBottomLeftRadius: 12, borderTopRightRadius: 12, borderBottomRightRadius: 12, borderWidth: 1.2, borderColor: color.appBlue }}>
//             <CustomText size={10} style={{ fontWeight: '600' }}>Confirm Delivery</CustomText>
//         </TouchableOpacity>
//         <View style={{ flexDirection: 'row', marginVertical: 10 }}>
//             <TouchableOpacity onPress={() => setShowOrderDetail(!showOrderDetail)}>
//                 <MapEye />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => alert("navigation in progress")}>
//                 <MapNavigate />
//             </TouchableOpacity>
//         </View>
//     </View>

// </View>
// {/* card description onClick eyeIcon*/}
// {showOrderDetail && <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-around' }}>
//     <FormText heading={'Article no. :'} description={'20'} />
//     <FormText heading={'Package Content :'} description={arrDummy[currentIndex].description} />
//     <FormText heading={'Package Dimensions :'} description={'14 L x 2 H x 20W'} />
//     <FormText heading={'Receiver Name :'} description={'Abc Name'} />
//     <FormText heading={'Delivery Navigate :'} description={'No75, Grand Lake,HDT45H,  sydney, Australia.'} />
// </View>}

// </View>
