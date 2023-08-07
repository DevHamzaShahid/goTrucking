import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Block from '../../components/Block';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { color } from '../../utils/colors';
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
import { route } from '../../Routes';
import Card from '../../components/Card';
import { CommonActions, useIsFocused, useRoute } from '@react-navigation/native';
import { dimensions, dimensionsWidth } from '../../Dimensions';
import Navigate from '../../asset/svgIcons/navigation.svg';
import Clockreport from '../../asset/svgIcons/clockReport.svg';
import ClockConfirmArrival from '../../asset/svgIcons/clockConfirmArrival.svg';
import ClockConfirmArrivalwhite from '../../asset/svgIcons/clockConfirmArrivalwhite.svg';
import CustomAlert from '../../components/CustomAlert';
import CustomDropDown from '../../components/CustomDropDown';
import TrackingIcon from '../../asset/svgIcons/Tracking.svg';
import PackageDetail from '../../asset/svgIcons/PackageDetail.svg';
import ConfirmDeparture from '../../asset/svgIcons/ConfirmDeparture.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPickupPackages } from '../../redux/actions/getAllpackagesFromPickup';
import DestinationMarker from '../../asset/svgIcons/destinationMarkerDark.svg';
import { fetchMyLocation } from '../../utils/helperFunction';
import GetLocation from 'react-native-get-location';
import Truck from '../../asset/svgIcons/Truck.svg';
import { all } from 'axios';
import { GoogleMapKey } from '../../utils/keys';
import MapViewDirections from 'react-native-maps-directions';
import {
  getSingleShift,
  getSingleShiftDelivery,
} from '../../redux/actions/getShifts';
import { confirmPickupDeparturee } from '../../redux/actions/confirmPickupDeparture';
import CustomActivityIndicator from '../../components/CustomLoader';
import { confirmDeliveryDeparturee } from '../../redux/actions/confirmDeliveryDeparturee';
import { confirmAllPackagesPcikedUp } from '../../redux/actions/confirmAllPackagesPickedup';


const initialRegion = {
  latitude: 29.7604,
  longitude: -95.3698, // Replace with your default longitude
  latitudeDelta: 0.0922, // You can adjust these values to set initial zoom level
  longitudeDelta: 0.0421,
};
const itemWidth = dimensionsWidth * 0.88;
const itemSpacing = 20;
const magneticOffset = (itemWidth + itemSpacing) / 2;

const ANIMATION_DURATION = 500;
const SCROLL_EVENT_THROTTLE = 1;

const LATITUDE_DELTA = 0.04864195044303443;
const LONGITUDE_DELTA = 0.040142817690068;
const index = ({ navigation }) => {
  //   const [successErrorAlert, setSuccessErrorAlert] = useState(false);
  //   const [showOrderDetail, setShowOrderDetail] = useState(false);
  //   const [currentIndex, setCurrentIndex] = useState(0);
  //   const [readyForPickup, setReadyForPickup] = useState(false);
  const [chooseDelayTime, setChooseDelayTime] = useState(false);
  const [delayHours, setDelayHours] = useState(null);
  const [delayMins, setDelayMins] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [closeBtn, setClosBtn] = useState(false);
  const [refresher, setRefresher] = useState(0);

  const [deliveryStatus, setDeliveryStatus] = useState('');
  const [assignedOrders, setAssignedOrders] = useState([]);

  const [allPickuppackages, setAllPickuppackages] = useState(false);
  const [allDeliveredPackages, setAllDeliveredPackages] = useState(false);
  const [allCoords, setAllCoords] = useState([
    {
      lat: 51.5072,
      lng: 0.1276,
    },
  ]);
  const [myLiveLocation, setMyLiveLocation] = useState({
    latitude: 37.785834,
    longitude: -122.406417,
  });
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const mapRef = useRef(null);

  const dispatch = useDispatch();
  const parameter = useRoute();
  const isFocused = useIsFocused();
  const param = parameter?.params;
  // const {setStateValue} = parameter?.params;
  const checkDelayedTime =
    delayHours != null || delayMins != null ? true : false;

  //get singleShift
  // used is fouces when comming back to the pickupcards screen it should show the updated singleShift status prnding to done or so
  useEffect(() => {
    dispatch(getSingleShift(param?.shipmentId));
  }, [navigation, isFocused, refresher]);

  //getSingleShift

  console.log("Alllcords>>>>", allCoords);

  const truckingState = useSelector(state => state);
  const { data: singleShift } = truckingState?.getSingleShift?.data || [];
  const { loading: getSingleShiftLoader } = truckingState?.getSingleShift || {};

  //get Single shift Delivery
  const { data: singleShiftDelivery } =
    truckingState?.getSingleshiftDelivery?.data || [];
  const { loading: getSingleShiftDeliveryLoader } =
    truckingState?.getSingleshiftDelivery || {};

  //confirm pickup departure
  const { data: confirmPickupDepartureData } =
    truckingState?.confirmPickupDeparturereducer || [];
  const { loading: confirmPickupDepartureLoader } =
    truckingState?.confirmPickupDeparturereducer || {};

  //confirm pickup departure
  const { data: confirmDeliveryDepartureData } =
    truckingState?.confirmDeliveryDeparturereducer || [];
  const { loading: confirmDeliveryDepartureLoader } =
    truckingState?.confirmDeliveryDeparturereducer || {};

  //confirm all the packages are picked up send confirmation status
  const { data: confirmAllPackagespickup } = truckingState?.confirmAllPackagesArePickedup || [];
  console.log("confirm all pickedup", confirmAllPackagespickup);


  // back for the map screen
  const handleBackPress = () => {
    navigation.goBack();
  };

  // CHECK IF single shift all pickuppoints are pickuped , if pickup and departed then show delivery cards instead
  useEffect(() => {
    let allpickedUp = singleShift?.every(obj => obj.status === 'departure');
    if (allpickedUp) {
      // when all packagesare picked up then tell its time for delivering////sending status to admin
      dispatch(confirmAllPackagesPcikedUp({ id: param?.shipmentId, status: "delivering" }))
      setDeliveryStatus('delivery');
    }
    // setAllPickuppackages(allpickedUp);
    return () => {
      allpickedUp = false;
      setDeliveryStatus('');
    };
  }, [singleShift, navigation]);

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

  const closeSuccessErrorAlert = () => {
    setShowAlert(false);
    // navigating to home and removing navigation cache
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: route.Home }],
      }),
    );
  };
  const closeButton = () => {
    setClosBtn(false);
    setChooseDelayTime(false);
  };

  //get live coords

  useEffect(() => {
    const fetchMyLoc = async () => {
      const location = await fetchMyLocation();
      setMyLiveLocation(location);
    };
    fetchMyLoc();
  }, []);

  useEffect(() => {
    const cityCoordinates = [
      // {
      //   lat: 40.7128,
      //   lng: -74.006,
      //   latitudeDelta: LATITUDE_DELTA,
      //   longitudeDelta: LONGITUDE_DELTA,
      // },
      // {
      //   lat: 34.0522,
      //   lng: -118.2437,
      //   latitudeDelta: LATITUDE_DELTA,
      //   longitudeDelta: LONGITUDE_DELTA,
      // },
      {
        lat: 41.8781,
        lng: -87.6298,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      {
        lat: 29.7604,
        lng: -95.3698,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      {
        lat: 25.7617,
        lng: -80.1918,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    ];
    const cooooords = singleShift?.map(item => ({
      lat: item.lat && item.lat,
      lng: item.lng && item.lng,
    }));
    cooooords &&
      setAllCoords(prevCoords => [
        ...prevCoords,
        ...cityCoordinates,
        // ...cooooords,
      ]);
  }, [singleShift]);

  const handleAlternativeRoutes = result => {
    const routes = result?.result?.routes || [];
    console.log('Alternative Routes:', routes);
    // You can store the routes in the state or handle them as needed
  };
  const waypoints = [
    { latitude: 37.7896386, longitude: -122.421646 },
    // { latitude: 37.774929, longitude: -122.419418 },
    // { latitude: 37.773972, longitude: -122.431297 },
  ];
  useEffect(() => {
    dispatch(getSingleShiftDelivery(param?.shipmentId));
  }, [navigation, isFocused, refresher]);

  // CHECK IF single delivery card deliveries are done and ready/click departure
  useEffect(() => {
    let allDelivered = singleShiftDelivery?.every(
      obj => obj.status === 'departure',
    );
    if (allDelivered) {
      // when all packages are delivered then tell delivered//sending status to admin
      dispatch(confirmAllPackagesPcikedUp({ id: param?.shipmentId, status: "delivered" }))
      setShowAlert(true);
    }

    // setAllDeliveredPackages(allDelivered);
    return () => {
      allDelivered = false;
      // setDeliveryStatus('');
      setShowAlert(false);
    };
  }, [singleShiftDelivery]);

  //  pickup on click confirm deaprture
  const confirmPickupDeparture = async item => {
    await dispatch(
      confirmPickupDeparturee({
        shipmentId: param.shipmentId,
        pickup_Id: item._id,
        status: 'departure',
      }),
    );
    setRefresher(refresher + 2);
  };
  // delivery on click confirm departure
  const confirmDeliveryDeparture = async item => {
    await dispatch(
      confirmDeliveryDeparturee({
        shipmentId: param.shipmentId,
        deliveryId: item._id,
        status: 'departure',
      }),
    );
    setRefresher(refresher + 2);
  };


  //clicking on markiers scrolling the horizontal list
  const handleMarkerClick = (index) => {
    setSelectedMarkerIndex(index);
    scrollViewRef.current.scrollTo({ x: index * getCardWidth(), animated: true });
    mapRef.current.animateToRegion({
      latitude: allCoords[index]?.lat,
      longitude: allCoords[index]?.lng,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }, ANIMATION_DURATION);
  };
  // on scrolling moving to the markers
  const handleHorizontalListScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / getCardWidth());
    setSelectedMarkerIndex(index);
    mapRef.current.animateToRegion({
      latitude: allCoords[index]?.lat,
      longitude: allCoords[index]?.lng,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }, ANIMATION_DURATION);
  };
  const getCardWidth = () => {
    const screenWidth = Dimensions.get('window').width;
    return screenWidth * 0.8; // 80% of the screen width
  };
  useEffect(() => {
    // When the component mounts or markers change, fit all markers on the screen
    if (allCoords?.length > 0) {
      const coordinates = allCoords?.map((marker) => ({
        latitude: marker.lat,
        longitude: marker.lng,
      }));
      mapRef?.current?.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }, // Adjust padding as needed
        animated: true,
      });
    }
  }, [allCoords, isFocused]);

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
            {/* loader */}
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
                style={{ color: color.appBlue, fontWeight: '500' }}>
                Please Choose your current time
              </CustomText>
              <View
                style={{ width: 120, position: 'absolute', left: 30, top: 40 }}>
                <CustomDropDown
                  placeholder={'Hours'}
                  objects={[
                    { label: '1 hour', value: '1 hour' },
                    { label: '2 Hours', value: '2 hours' },
                    { label: '3 Hours', value: '3 hours' },
                  ]}
                  onChange={handleHourChange}
                />
              </View>
              <View
                style={{ width: 120, position: 'absolute', right: 30, top: 40 }}>
                <CustomDropDown
                  placeholder={'Mins'}
                  objects={[
                    { label: '10 mins', value: '10 mins' },
                    { label: '15 mins', value: '15 mins' },
                    { label: '30 mins', value: '30 mins' },
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
              textStyle={{ color: color.white, fontWeight: '500' }}
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
                style={{ fontWeight: '500', color: color.appBlue }}>
                In-Transit
              </CustomText>
            </View>
          </View>
        </View>

        {/* Map */}
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          zoomEnabled={true}
          showsScale={true}
          showsBuildings={true}
          initialRegion={initialRegion}>
          {allCoords?.map((coords, index) => (
            <Marker
              coordinate={{
                latitude: coords?.lat,
                longitude: coords?.lng,
              }}
              title="destinantion"
              onPress={() => handleMarkerClick(index)}
            >
              <DestinationMarker />
            </Marker>
          ))}
          <Marker coordinate={myLiveLocation} title="driver">
            <Truck />
          </Marker>
          {/* <Polyline
            coordinates={[
              myLiveLocation,{latitude: allCoords[0]?.lat, longitude: allCoords[0]?.lng},
              {latitude: allCoords[1]?.lat, longitude: allCoords[1]?.lng},
              {latitude: allCoords[2]?.lat, longitude: allCoords[2]?.lng},
              {latitude: allCoords[3]?.lat, longitude: allCoords[3]?.lng},
              {latitude: allCoords[4]?.lat, longitude: allCoords[4]?.lng},
              {latitude: allCoords[5]?.lat, longitude: allCoords[5]?.lng},

            ]}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              '#7F0000',
              'yellow', // no color, creates a "long" gradient between the previous and next coordinate
              '#B24112',
              '#E5845C',
              '#238C23',
              '#7F0000',
            ]}
            strokeWidth={6}
          /> */}
          <MapViewDirections
            origin={{
              latitude: allCoords[1]?.lat,
              longitude: allCoords[1]?.lng,
            }}
            destination={{
              latitude: allCoords[2]?.lat,
              longitude: allCoords[2]?.lng,
            }}
            waypoints={waypoints}
            apikey={GoogleMapKey}
            mode="driving"
            alternatives // Request multiple alternative routes
            strokeWidth={6}
            strokeColor="green"
          />
        </MapView>
        {(confirmPickupDepartureLoader ||
          getSingleShiftLoader ||
          getSingleShiftDeliveryLoader ||
          confirmDeliveryDepartureLoader) && <CustomActivityIndicator />}

        {/* new map Card */}
        {/* {showAlert && (
          <CustomAlert
            closeSuccessErrorAlert={closeSuccessErrorAlert}
            buttonText="OK"
            alertType="error"
            Title={'ERROR'}
            description={
              'Please set delayed time first......under development/only for screen testing'
            }
          />
        )} */}
        {showAlert && (
          <CustomAlert
            closeSuccessErrorAlert={closeSuccessErrorAlert}
            alertType="success"
            buttonText="OK"
            Title="Job Completed"
            description="All Packages are delivered successfully"
          />
        )}
        {/* pickup cards */}
        {deliveryStatus != 'delivery' ? (
          <View
            style={{
              position: 'absolute',
              bottom: 20,
            }}>
            <ScrollView
              ref={scrollViewRef}
              onScroll={handleHorizontalListScroll}
              horizontal
              snapToInterval={
                dimensionsWidth / 1.15 + (dimensionsWidth / 2) * 0.25
              }
              decelerationRate="fast" // You can experiment with different rates
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={SCROLL_EVENT_THROTTLE}
            >
              {singleShift?.map((item, index) => (
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
                        style={{ position: 'absolute', left: -50, top: -30 }}
                      />
                    </View>
                    <View style={{ width: '60%', height: 60 }}>
                      <CustomText
                        size={15}
                        style={{ color: color.appBlue, fontWeight: '600' }}>
                        {item.name}
                      </CustomText>
                      <CustomText
                        size={10}
                        style={{ color: color.appBlue, fontWeight: '500' }}>
                        ID : {item._id}
                      </CustomText>
                      <CustomText
                        size={10}
                        style={{ color: color.appBlue, fontWeight: '500' }}>
                        {item.address}
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
                        style={{ color: color.textGrey, fontWeight: '500' }}>
                        Time
                      </CustomText>
                      <CustomText
                        size={13}
                        style={{ color: color.appBlue, fontWeight: '600' }}>
                        {item.time}
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
                        style={{ color: color.textGrey, fontWeight: '500' }}>
                        Total Packages
                      </CustomText>
                      <CustomText
                        size={13}
                        style={{ color: color.appBlue, fontWeight: '600' }}>
                        {item.packageCount}
                      </CustomText>
                    </View>

                    {/* {item.status == 'done' && (
                      <View
                        style={{
                          backgroundColor: 'orange',
                          height: 20,
                          width: 20,
                          borderRadius: 10,
                        }}
                      />
                    )} */}
                    <View
                      style={{
                        width: '33%',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        paddingLeft: 10,
                      }}>
                      <CustomText
                        size={12}
                        style={{ color: color.textGrey, fontWeight: '500' }}>
                        Package Volume
                      </CustomText>
                      <CustomText
                        size={13}
                        style={{ color: color.appBlue, fontWeight: '600' }}>
                        {item.totalPackageWeight} Kg
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
                      style={{ color: color.appBlue, fontWeight: '500' }}>
                      Handle with care
                    </CustomText>
                  </View>

                  {/* Buttons */}
                  {/* Arrival  buttons when pickuopin progress of the shipment */}
                  {item.status == 'pending' && (
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
                          //   if (checkDelayedTime) {
                          //     navigation.navigate(route.PackageDetails);
                          //   } else {
                          //     setShowAlert(true);
                          //   }
                          console.log(
                            'get pickup id',
                            item._id,
                            param.shipmentId,
                          );
                          // dispatch(
                          //   getAllPickupPackages({
                          //     shipmentId: param.shipmentId,
                          //     pickup_Id: item._id,
                          //   }),
                          // );
                          navigation.navigate(route.PackageDetails, {
                            shipmentId: param.shipmentId,
                            pickup_Id: item._id,
                          });
                        }}
                        buttonStyle={{
                          backgroundColor: color.white,
                          // backgroundColor: checkDelayedTime
                          //   ? color.successGreen
                          //   : color.white,
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
                          // color: checkDelayedTime
                          // ? color.white
                          // : color.successGreen,
                          marginHorizontal: 3,
                        }}
                        icon={
                          (
                            <ClockConfirmArrival />
                          )
                          // checkDelayedTime ? (
                          //   <ClockConfirmArrivalwhite />
                          // ) : (
                          //   <ClockConfirmArrival />
                          // )
                        }
                        title={'Confirm Arrival'}
                      />
                    </View>
                  )}

                  {/* confirm Pickup departure */}
                  {item.status == 'done' && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        marginVertical: 10,
                      }}>
                      <CustomButton
                        onPress={() =>
                        // navigation.navigate(route.PackageDetails,)
                        {
                          navigation.navigate(route.PackageDetails, {
                            shipmentId: param.shipmentId,
                            pickup_Id: item._id,
                          });
                        }
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
                        onPress={() => confirmPickupDeparture(item)}
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
                          fontWeight: '700',
                          fontSize: 10,
                          color: color.successGreen,
                          marginHorizontal: 3,
                        }}
                        icon={<ConfirmDeparture />}
                        title={'Confirm Departure'}
                      />
                    </View>
                  )}

                  {item.status == 'departure' && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        marginVertical: 10,
                      }}>
                      {/* <CustomButton
                          onPress={() =>
                            // navigation.navigate(route.PackageDetails,)
                            {
                              navigation.navigate(route.PackageDetails, {
                                shipmentId: param.shipmentId,
                                pickup_Id: item._id,
                              });
                            }
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
                        /> */}
                      <CustomButton
                        // onPress={() => confirmDeparture(item)}
                        buttonStyle={{
                          backgroundColor: color.successGreen,
                          borderWidth: 2.5,
                          borderColor: color.successGreen,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 40,
                          width: '48%',
                        }}
                        textStyle={{
                          fontWeight: '700',
                          fontSize: 10,
                          color: color.white,
                          marginHorizontal: 3,
                        }}
                        icon={<ConfirmDeparture />}
                        title={'Departure Confirmed'}
                      />
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        )
          :
          // delivery cards
          (
            <View
              style={{
                position: 'absolute',
                bottom: 20,
              }}>
              <ScrollView
                ref={scrollViewRef}
                onScroll={handleHorizontalListScroll}
                horizontal
                snapToInterval={itemWidth + itemSpacing}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}>
                {singleShiftDelivery?.map((item, index) => (
                  <View
                    style={{
                      marginLeft: itemSpacing,
                      width: itemWidth,
                      flexDirection: 'row',
                      paddingVertical: 15,
                      backgroundColor: color.white,
                      borderRadius: 15,
                      paddingBottom: 80,
                    }}>
                    <View style={{ width: '20%' }}>
                      <TrackingIcon
                        style={{ position: 'absolute', top: -25, left: -25 }}
                        width={90}
                        height={90}
                      />
                    </View>
                    <View style={{ width: '50%', paddingLeft: 7 }}>
                      <CustomText
                        size={16}
                        style={{ fontWeight: '600', color: color.appBlue }}>
                        {item.name}
                      </CustomText>
                      <CustomText
                        size={12}
                        style={{ fontWeight: '500', color: color.appBlue }}>
                        {item.address}
                      </CustomText>
                    </View>
                    <View
                      style={{
                        width: '30%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {/* {item.status == 'done' && (
                      <View
                        style={{
                          backgroundColor: 'orange',
                          height: 20,
                          width: 20,
                          borderRadius: 10,
                        }}
                      />
                    )} */}
                      {/* confirm delivery */}
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
                        <CustomText size={10} style={{ fontWeight: '600' }}>
                          Confirm Delivery
                        </CustomText>
                      </TouchableOpacity>
                      <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                        {(item.status == 'done' || item.status == 'departure') || <TouchableOpacity
                          // onPress={() => setShowOrderDetail(!showOrderDetail)}>
                          onPress={() =>
                            navigation.navigate(route.PackageDetailsDelivery, {
                              shipmentId: param?.shipmentId,
                              deliveryId: item._id,
                            })
                          }>
                          <MapEye />
                        </TouchableOpacity>}
                        {/* <TouchableOpacity
                        onPress={() => alert('navigation in progress')}>
                        <MapNavigate />
                      </TouchableOpacity> */}
                      </View>
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 5,
                        alignSelf: 'center',
                        width: '100%',
                        padding: 5,
                      }}>
                      {/* confirm Pickup departure */}
                      {item.status == 'done' && (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            marginVertical: 10,
                            marginHorizontal: 5,
                          }}>
                          <CustomButton
                            onPress={() =>
                            // navigation.navigate(route.PackageDetails,)
                            {
                              navigation.navigate(
                                route.PackageDetailsDelivery,
                                {
                                  shipmentId: param?.shipmentId,
                                  deliveryId: item._id,
                                },
                              );
                            }
                            }
                            buttonStyle={{
                              backgroundColor: color.appLightBlue,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: 40,
                              width: '45%',
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
                            onPress={() => confirmDeliveryDeparture(item)}
                            buttonStyle={{
                              backgroundColor: color.white,
                              borderWidth: 2.5,
                              borderColor: color.successGreen,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: 40,
                              width: '45%',
                            }}
                            textStyle={{
                              fontWeight: '700',
                              fontSize: 10,
                              color: color.successGreen,
                              marginHorizontal: 3,
                            }}
                            icon={<ConfirmDeparture />}
                            title={'Confirm Departure'}
                          />
                        </View>
                      )}

                      {item.status == 'departure' && (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            marginVertical: 10,
                            marginHorizontal: 5,
                          }}>
                          <CustomButton
                            buttonStyle={{
                              backgroundColor: color.successGreen,
                              borderWidth: 2.5,
                              borderColor: color.successGreen,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: 40,
                              width: '50%',
                            }}
                            textStyle={{
                              fontWeight: '700',
                              fontSize: 10,
                              color: color.white,
                              marginHorizontal: 3,
                            }}
                            icon={<ConfirmDeparture />}
                            title={'Departure Confirmed'}
                          />
                        </View>
                      )}
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
