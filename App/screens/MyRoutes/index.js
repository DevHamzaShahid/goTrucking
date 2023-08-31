import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Block from '../../components/Block';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { color } from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapBackBtn from '../../asset/svgIcons/mapBackBtn.svg';
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import MapEye from '../../asset/svgIcons/MapEye.svg';
import { route } from '../../Routes';
import { CommonActions, useIsFocused, useRoute } from '@react-navigation/native';
import { dimensions, dimensionsWidth } from '../../Dimensions';
import Navigate from '../../asset/svgIcons/navigation.svg';
import Clockreport from '../../asset/svgIcons/clockReport.svg';
import ClockConfirmArrival from '../../asset/svgIcons/clockConfirmArrival.svg';
import CustomAlert from '../../components/CustomAlert';
import CustomDropDown from '../../components/CustomDropDown';
import TrackingIcon from '../../asset/svgIcons/Tracking.svg';
import PackageDetail from '../../asset/svgIcons/PackageDetail.svg';
import ConfirmDeparture from '../../asset/svgIcons/ConfirmDeparture.svg';
import { useDispatch, useSelector } from 'react-redux';
import PickupPin from '../../asset/svgIcons/destinationMarker.svg';
import { fetchMyLocation, openGoogleMaps } from '../../utils/helperFunction';
import Truck from '../../asset/svgIcons/Truck.svg';
import { GoogleMapKey } from '../../utils/keys';
import MapViewDirections from 'react-native-maps-directions';
import {
  getSingleShift,
  getSingleShiftDelivery,
} from '../../redux/actions/getShifts';
// import NoRoute from '../../asset/svgs/noRoute.svg'
import { confirmPickupDeparturee } from '../../redux/actions/confirmPickupDeparture';
import CustomActivityIndicator from '../../components/CustomLoader';
import { confirmDeliveryDeparturee } from '../../redux/actions/confirmDeliveryDeparturee';
import { confirmAllPackagesPcikedUp } from '../../redux/actions/confirmAllPackagesPickedup';
import { auth } from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import DeliveryPin from '../../asset/svgIcons/deliveryMarker.svg';
import Dpin from '../../asset/svgIcons/Dlipin.svg'
import { getDirectionLine, resetDirectionLineState } from '../../redux/actions/getDirectionLine';
import polyline from '@mapbox/polyline';
import { resetState } from '../../redux/actions/resetReduxState';
import { CONFIRMALLPACKAGESPICKEDUP_SUCCESS } from '../../redux/constants/ConfirmAllPackagesPickedUp';
import { pickupDelayReport } from '../../redux/actions/pickupDelayReport';
import { deliveryDelayReport } from '../../redux/actions/deliveryDelayReport';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location';
const geolib = require("geolib");
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

// const direction1=[[-45.460626,3.069363],[-45.317803,3.071252],[-45.269464,3.004909],[-45.271660999999995,3.0806929999999997],[-45.566094,3.0655829999999997],[-45.348565,3.1127219999999998],[-45.300225,3.168981],[-45.23211,3.146518],[-45.552910999999995,3.157756],[-45.1596,3.1988469999999998],[-45.056329,3.0825799999999997],[-45.02337,3.174588],[-44.882745,3.107078],[-45.128839,2.974431],[-44.970635,3.016314],[-45.467217,3.25088],[-45.240358,3.5116009999999998],[-45.200807,3.390294],[-45.238161,3.3133559999999997],[-44.904176,3.42124]]


// const direction1 = [[-454.60626, 30.69363], [-453.17803, 30.71252], [-452.69464, 30.04909], [-452.71661, 30.80693], [-452.24522, -2984.18449], [-451.68263, -2982.0092], [-451.90726, -2981.5258], [-451.79488, -2980.84465], [-451.38397, -2984.05266], [-452.54664, -2980.11955], [-451.62656, -2979.08684], [-452.30166, -2978.75725], [-453.62813, -2977.351], [-453.2093, -2979.81194], [-450.86364, -2978.2299], [-448.25643, -2983.19572], [-449.4695, -2980.92713], [-450.23888, -2980.53162], [-449.16004, -2980.90516], [-449.16004, -2977.56531]]

const direction1 = [
  [
    151.1394844121329,
    -33.76806907278485
  ],
  [
    151.01637565713838,
    -32.93157259390829
  ],
  [
    150.3569268484777,
    -32.087893072915634
  ],
  [
    147.90045293476015,
    -30.869577388425427
  ],
  [
    148.3773267886138,
    -32.29036690886308
  ],
  [
    147.45385346032378,
    -33.89204769786868
  ],
  [
    148.86209272919683,
    -34.01917162023395
  ],
  [
    147.19106171372812,
    -35.44623786880841
  ],
  [
    145.48613491345964,
    -33.31348914307953
  ],
  [
    144.19032017906795,
    -32.77981223389115
  ],
  [
    144.18261512760222,
    -34.81073259145486
  ],
  [
    146.53962053884612,
    -35.926155173948246
  ],
  [
    149.8546350322053,
    -36.06442638528288
  ],
  [
    150.29474481792937,
    -33.433550197987
  ],
  [
    151.2723748783476,
    -34.81063277887092
  ],
  [
    150.53385121020926,
    -33.10183855140902
  ]
]



// const encodePolyline = (coords) => {
//   const encoded = [];
//   let prevLat = 0;
//   let prevLng = 0;

//   for (const coord of coords) {
//     const latDiff = Math.round((coord.latitude - prevLat) * 1e5);
//     const lngDiff = Math.round((coord.longitude - prevLng) * 1e5);
//     prevLat = coord.latitude;
//     prevLng = coord.longitude;

//     encoded.push(latDiff);
//     encoded.push(lngDiff);
//   }

//   return encoded.join(",");
// };

// const encodedDirection1 = encodePolyline(newDirection1);
// console.log("encodedDirection1", encodedDirection1);

// const decodePolyline = (encoded) => {
//   const decoded = [];
//   let prevLat = 0;
//   let prevLng = 0;

//   const values = encoded.split(",");

//   for (let i = 0; i < values.length; i += 2) {
//     const latDiff = parseInt(values[i], 10);
//     const lngDiff = parseInt(values[i + 1], 10);
//     prevLat += latDiff / 1e5;
//     prevLng += lngDiff / 1e5;
//     decoded.push({ latitude: prevLat, longitude: prevLng });
//   }

//   return decoded;
// };

// const decodedDirection1 = decodePolyline(encodedDirection1);
// console.log("decodedDirection1", decodedDirection1);

const initialRegion = {
  latitude: 29.7604,
  longitude: -95.3698,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};
const itemWidth = dimensionsWidth * 0.88;
const itemSpacing = 20;
const magneticOffset = (itemWidth + itemSpacing) / 2;

const ANIMATION_DURATION = 700;
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
  const [locationAlertOnArrival, setLocationAlertOnArrival] = useState(false);
  const [closeBtn, setClosBtn] = useState(false);
  const [refresher, setRefresher] = useState(0);
  const [alertShown, setAlertShown] = useState(false);
  const [allPickedUpAlert, setAllPickedUpAlert] = useState(false);

  const [deliveryStatus, setDeliveryStatus] = useState('');
  const [assignedOrders, setAssignedOrders] = useState([]);

  const [allPickuppackages, setAllPickuppackages] = useState(false);
  const [allDeliveredPackages, setAllDeliveredPackages] = useState(false);
  const [stopFetchingDirectionLineAgain, setStopFetchDirectionLine] = useState(false);//will not fetch when true
  const [allCoords, setAllCoords] = useState([]);
  const [singleShiftCoords, setSingleShiftCoords] = useState([]);
  const [singleDeliveryCoords, setSingleDeliveryCoords] = useState([]);
  const [currentDeliveryOrPickupData, setCurrentDeliveryOrPickupData] = useState({});
  const [delayReportPickupAndDeliveryData, setDelayReportPickupAndDeliveryData] = useState({});
  const [getPolyline, setPolyline] = useState([]);
  const [locationPermission, setLocationPermission] = useState('');
  const [myLocationFocused, setMylocationFocused] = useState(true)
  const [isDragging, setIsDragging] = useState(false);
  // const [myLiveLocation, setMyLiveLocation] = useState({
  //   latitude: 37.785834,
  //   longitude: -122.406417,
  // });
  const [myLiveLocation, setMyLiveLocation] = useState(null);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [locationAnimated, setLocationAnimated] = useState(false)
  // let mapRegion = {
  //   latitude: 37.785834, // Default latitude
  //   longitude: -122.406417, // Default longitude
  //   latitudeDelta: 0.01,
  //   longitudeDelta: 0.01,
  // };
  // const [selectedPickupMarkerIndex, setSelectedPickupMarkerIndex] = useState(0);
  // const [selectedDeliveryMarkerIndex, setSelectedDeliveryMarkerIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const mapRef = useRef(null);
  const shouldAnimateToMarker = useRef(false);

  const [initialRegion, setInitialRegion] = useState(null);
  const [currentRegion, setCurrentRegion] = useState(initialRegion);




  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const parameter = useRoute();
  const param = parameter?.params;
  // const {setStateValue} = parameter?.params;
  const checkDelayedTime =
    delayHours != null || delayMins != null ? true : false;

  //get singleShift
  // used is fouces when comming back to the pickupcards screen it should show the updated singleShift status prnding to done or so
  useEffect(() => {
    if (isFocused && !stopFetchingDirectionLineAgain) {
      dispatch(getSingleShift(param?.shipment_Id || shipment_Id));
    }
  }, [isFocused, stopFetchingDirectionLineAgain, refresher]);


  //getSingleShift

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

  //get Direction Line
  const { data: directionLine } =
    truckingState?.getdirectionLine || [];
  const { loading: directionLineLoader } =
    truckingState?.getdirectionLine || {};
  const direction = directionLine?.data?.shipmentDetail?.direction

  //get profile
  const { data: userData } =
    truckingState?.getProfile || [];

  //confirm all the packages are picked up send confirmation status
  const { data: confirmAllPackagespickup } = truckingState?.confirmAllPackagesArePickedup || [];

  //get saved Shipmentid
  const { shipment_Id } = truckingState?.shipmentId || ''





















  // getdirectionLine
  useEffect(() => {
    // if (!direction && !stopFetchingDirectionLineAgain) {
    dispatch(getDirectionLine(param?.shipment_Id || shipment_Id))
    // }
    // return () => setStopFetchDirectionLine(false)
    // setPolyline(direction)
  }, [param?.shipment_Id || shipment_Id])

  useEffect(() => {
    const reversedData = direction?.map(item => ({
      latitude: item.longitude,
      longitude: item.latitude
    }));
    setPolyline(reversedData)
  }, [direction])





  const askForPermission = () => {
    if (locationPermission != "granted") {
      request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) => {
        setLocationPermission(result)
      }).catch((error) => {
        console.log(error);
      })
    }
  }


  useEffect(() => {
    askForPermission()
  }, [locationPermission])













  // back for the map screen
  const handleBackPress = () => {
    const resetAction = CommonActions.reset({
      index: 0, // Reset to the first screen in the stack
      routes: [{ name: 'HomeStack' }], // Replace the stack with the Home screen
    });
    navigation.dispatch(resetAction);
    // navigation.navigate(route.Home)
    // navigation.goBack()
  };

  // CHECK IF single shift all pickuppoints are pickuped , if pickup and departed then show delivery cards instead
  useEffect(() => {
    let allpickedUp = singleShift?.every(obj => obj.status === 'departure');
    let allDelivered = singleShiftDelivery?.every(
      obj => obj.status === 'departure',
    );
    if (allpickedUp) {
      setDeliveryStatus('delivery');
    }
    if (allpickedUp && !alertShown && !allDelivered) {
      // when all packagesare picked up then tell its time for delivering////sending status to admin
      dispatch(confirmAllPackagesPcikedUp({ id: param?.shipment_Id || shipment_Id, status: "delivering" }))
      // alert('picked up all')
      // setDeliveryStatus('delivery');
      setAllPickedUpAlert(true)
      setAlertShown(true);

      // Store alertShown value in AsyncStorage
      AsyncStorage.setItem('alertShown', 'true')
        .catch(error => console.error('AsyncStorage error:', error));
    }
    // setAllPickuppackages(allpickedUp);
    return () => {
      // setAlertShown(false);
      // setDeliveryStatus('');
      allpickedUp = false;
    };
  }, [singleShift, navigation, singleShiftDelivery]);

  const handleHourChange = value => {
    setDelayHours(value);
  };
  const handleMinsChange = value => {
    setDelayMins(value);
  };


  const sendDelayReport = async () => {
    if (checkDelayedTime) {
      if (delayReportPickupAndDeliveryData?.delayType == 'pickup') {
        await dispatch(pickupDelayReport({ shipmentId: param?.shipment_Id || shipment_Id, pickup_Id: delayReportPickupAndDeliveryData?._id, status: 'delay', delayTime: `${delayHours} ${delayMins}` }))
      }
      else if (delayReportPickupAndDeliveryData?.delayType == 'delivery') {
        await dispatch(deliveryDelayReport({ shipmentId: param?.shipment_Id || shipment_Id, deliveryId: delayReportPickupAndDeliveryData?._id, status: 'delay', delayTime: `${delayHours} ${delayMins}` }))
      }
      setChooseDelayTime(false)
    }
  }

  const closeSuccessErrorAlert = async () => {
    setShowAlert(false);
    // navigating to home and removing navigation cache
    handleBackPress()
    dispatch(resetDirectionLineState());
    await AsyncStorage.removeItem('alertShown');
    setStopFetchDirectionLine(true)
  };

  const closeButton = () => {
    setClosBtn(false);
    setChooseDelayTime(false);
  };
  // AsyncStorage.getAllKeys().then((data) => console.log("all keyyysyysys", data))



  useEffect(() => {
    const locationUpdateInterval = setInterval(() => {
      askForPermission()
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
        .then(location => {
          const { latitude, longitude } = location;
          if (latitude && longitude && !locationAnimated) {
            setInitialRegion({
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
            setLocationAnimated(true);
          }
          setMyLiveLocation({ latitude, longitude });
          console.log('Live Location:', latitude, longitude);
        })
        .catch(error => console.log('Error getting location:', error));
    }, 3000);

    return () => {
      clearInterval(locationUpdateInterval);
    };
  }, [locationAnimated]);

  useEffect(() => {
    // Reset locationAnimated to false when navigating away from the screen
    if (!isFocused) {
      setLocationAnimated(false);
    }
  }, [isFocused]);


  // useEffect(() => {
  //   GetLocation.getCurrentPosition({
  //     enableHighAccuracy: true,
  //     timeout: 15000,
  //   })
  //     .then(location => {
  //       const { latitude, longitude } = location;
  //       setInitialRegion({
  //         latitude,
  //         longitude,
  //         latitudeDelta: 0.0922,
  //         longitudeDelta: 0.0421,
  //       });
  //       setMyLiveLocation({ latitude, longitude });
  //       if (mapRef) {
  //         mapRef?.current?.animateToRegion({
  //           latitude,
  //           longitude,
  //           latitudeDelta: 0.0922,
  //           longitudeDelta: 0.0421,
  //         });
  //       }
  //     })
  //     .catch(error => console.log('Error getting location:', error));
  // }, [directionLineLoader]);





  useEffect(() => {
    const pickupCoords = singleShift?.map(item => ({
      lat: item.lat && item.lat,
      lng: item.lng && item.lng,
      name: item.name
    }));
    console.log("for coords", singleShift);
    const deliveryCoords = singleShiftDelivery?.map(item => ({
      lat: item.lat && item.lat,
      lng: item.lng && item.lng,
      name: item.name
    }));
    pickupCoords && setSingleShiftCoords(pickupCoords)
    deliveryCoords && setSingleDeliveryCoords(deliveryCoords)
  }, [singleShift, singleShiftDelivery]);

  // get delivery points
  useEffect(() => {
    if (isFocused && !stopFetchingDirectionLineAgain) {
      dispatch(getSingleShiftDelivery(param?.shipment_Id || shipment_Id));
    }
  }, [isFocused, stopFetchingDirectionLineAgain, refresher]);


  // CHECK IF single delivery card deliveries are done and ready/click departure
  useEffect(() => {
    let allDelivered = singleShiftDelivery?.every(
      obj => obj.status === 'departure',
    );
    if (allDelivered === true) {
      // when all packages are delivered then tell delivered//sending status to admin
      dispatch(confirmAllPackagesPcikedUp({ id: param?.shipment_Id || shipment_Id, status: "delivered" }))
      setShowAlert(true);
      // dispatch(resetDirectionLineState());
    }

    // setAllDeliveredPackages(allDelivered);
    return () => {
      allDelivered = false;
      // setDeliveryStatus('');
      setShowAlert(false);
    };
  }, [singleShiftDelivery, navigation]);//====================================================================================================


  //  pickup on click confirm deaprture
  const confirmPickupDeparture = async item => {
    await dispatch(
      confirmPickupDeparturee({
        shipmentId: param?.shipment_Id || shipment_Id,
        pickup_Id: item._id,
        status: 'departure',
      }),
    );
    setRefresher(refresher + 2);
  };


  // delivery on click confirm departure
  const confirmDeliveryDeparture = async item => {
    // setTimeout(async() => {
    await dispatch(
      confirmDeliveryDeparturee({
        shipmentId: param?.shipment_Id || shipment_Id,
        deliveryId: item._id,
        status: 'departure',
      }),
    );
    setRefresher(refresher + 2);
    // }, 3000);
  };

  //clicking on markers scrolling the horizontal list
  const handlePickupMarkerClick = (index) => {
    setMylocationFocused(false)
    // setSelectedPickupMarkerIndex(index);
    scrollViewRef.current.scrollTo({ x: index * getCardWidth(), animated: true });
    mapRef.current.animateToRegion({
      latitude: singleShiftCoords[index]?.lat,
      longitude: singleShiftCoords[index]?.lng,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }, ANIMATION_DURATION);
  };
  const handleDeliveryMarkerClick = (index) => {
    setMylocationFocused(false)
    // setSelectedDeliveryMarkerIndex(index);
    scrollViewRef.current.scrollTo({ x: index * getCardWidth(), animated: true });
    mapRef.current.animateToRegion({
      latitude: singleDeliveryCoords[index]?.lat,
      longitude: singleDeliveryCoords[index]?.lng,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }, ANIMATION_DURATION);
  };


  // on scrolling moving to the markers
  const handlePickupHorizontalListScroll = (event) => {
    setMylocationFocused(false)
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / getCardWidth());

    // setSelectedPickupMarkerIndex(index);
    mapRef?.current?.animateToRegion({
      latitude: singleShiftCoords[index]?.lat,
      longitude: singleShiftCoords[index]?.lng,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }, ANIMATION_DURATION);
  };
  // console.log("slectedMarkerIndex", selectedMarkerIndex);
  const handleDeliveryHorizontalListScroll = (event) => {
    setMylocationFocused(false)
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / getCardWidth());
    // setSelectedDeliveryMarkerIndex(index);
    mapRef?.current?.animateToRegion({
      latitude: singleDeliveryCoords[index]?.lat,
      longitude: singleDeliveryCoords[index]?.lng,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }, ANIMATION_DURATION);
  };
  const getCardWidth = () => {
    const screenWidth = Dimensions.get('window').width;
    return deliveryStatus == 'delivery' ? screenWidth * 0.75 : screenWidth * 0.95; // 95% of the screen width
  };

  useEffect(() => {
    // When the component mounts or markers change, fit all markers on the screen
    if (singleShiftCoords?.length > 0 && singleDeliveryCoords > 0) {
      const coordinates = singleShiftCoords?.map((marker) => ({
        latitude: marker.lat,
        longitude: marker.lng,
      }));
      const deliveryCoordinates = singleDeliveryCoords?.map((marker) => ({
        latitude: marker.lat,
        longitude: marker.lng,
      }));
      mapRef?.current?.fitToCoordinates({ ...coordinates, ...deliveryCoordinates, latitude: myLiveLocation.latitude, longitude: myLiveLocation.longitude }, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }, // Adjust padding as needed
        animated: true,
      });
    }
  }, [singleShiftCoords, isFocused, singleDeliveryCoords]);


  const checkUserInDestinationOrNot = (item) => {
    const currentLocation = {
      latitude: myLiveLocation?.latitude,
      longitude: myLiveLocation?.longitude
    }
    const orderCords = {
      longitude: item?.lng,
      latitude: item?.lat
    };

    const dist = geolib?.getDistance(currentLocation, orderCords, {
      unit: "km",
    });
    //unit is not working here thats why divide dist by 1000 to convert meters to km if needed
    console.log("dist dist / 1000dist / 1000dist / 1000dist / 1000dist / 1000", dist);
    return dist //in metres
  }

  // when user is 50 meters aways from the delivery point and still want to deliver then click anyways
  const continueAnyWays = async () => {
    if (currentDeliveryOrPickupData?.arrivalType == 'pickup') {
      await dispatch(confirmPickupDeparturee({ shipmentId: param?.shipment_Id || shipment_Id, pickup_Id: currentDeliveryOrPickupData?._id, status: 'arrival' }))
      dispatch(getSingleShift(param?.shipment_Id || shipment_Id))
    }
    else if (currentDeliveryOrPickupData?.arrivalType == 'delivery') {
      await dispatch(confirmDeliveryDeparturee({ shipmentId: param?.shipment_Id || shipment_Id, deliveryId: currentDeliveryOrPickupData?._id, status: 'arrival' }))
      dispatch(getSingleShiftDelivery(param?.shipment_Id || shipment_Id))
    }
    setLocationAlertOnArrival(false)
  };


  useEffect(() => {
    const checkAlertShown = async () => {
      try {
        const storedAlertShown = await AsyncStorage.getItem('alertShown');
        if (storedAlertShown === 'true') {
          setAlertShown(true);
        }
      } catch (error) {
        console.error('AsyncStorage error:', error);
      }
    };

    checkAlertShown();
  }, []);


  const recenterMyLocation = () => {
    setMylocationFocused(true)
    const newMapRegion = {
      latitude: myLiveLocation?.latitude,
      longitude: myLiveLocation?.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    mapRef?.current?.animateCamera({
      center: newMapRegion,
      zoom: 15, // Adjust the zoom level as needed
    });
  }


  const updateMapRegion = () => {
    if (mapRef.current) {
      const camera = {
        center: myLiveLocation,
        zoom: 15, // Adjust as needed
      };
      mapRef.current.animateCamera(camera);
    }
  };


  if (myLocationFocused) { updateMapRegion() }
  console.log("myLocationFocusedmyLocationFocusedmyLocationFocusedmyLocationFocused", myLocationFocused);



  const handleRegionChange = (region) => {
    // Check if the user is dragging the map.
    if (region) {
      setIsDragging(true);
      console.log("sdsadsadsadsadsadsad>>>>>>>>>>><>33333", region);
    }
  };

  useEffect(() => {
    if (isDragging) {
      setMylocationFocused(false);
    }
  }, [isDragging]);

  return (
    <SafeAreaView flex={1}>
      {param?.shipment_Id || shipment_Id ? <Block>
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
        <TouchableOpacity style={{ position: 'absolute', top: 10, right: 20, zIndex: 999 }} onPress={recenterMyLocation}>
          {/* <MapBackBtn height={45} width={45} /> */}
          <Image
            style={{ height: 50, width: 50 }}
            size={30}
            resizeMode={"contain"}
            source={require("../../asset/ImageIcons/Recenter-Button.png")}
          />
        </TouchableOpacity>
        {/* Map */}
        {initialRegion && <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          zoomEnabled={true}
          showsScale={true}
          showsBuildings={true}
          initialRegion={initialRegion}
          showsUserLocation={true}
          onRegion={handleRegionChange}
          onPress={() => setMylocationFocused(false)}
          onLongPress={() => setMylocationFocused(false)}
          onDoublePress={() => setMylocationFocused(false)}
        >
          {singleShiftCoords?.map((coords, index) => (
            <Marker
              coordinate={{
                latitude: coords?.lat,
                longitude: coords?.lng,
              }}
              title={coords.name}
              onPress={() => handlePickupMarkerClick(index)}
            >
              <PickupPin />
            </Marker>
          ))}
          {singleDeliveryCoords?.map((coords, index) => (
            <Marker
              coordinate={{
                latitude: coords?.lat,
                longitude: coords?.lng,
              }}
              title={coords.name}
              onPress={() => handleDeliveryMarkerClick(index)}
            >
              <Dpin />
              {/* <DeliveryPin/> */}
            </Marker>
          ))}
          {myLiveLocation && <Marker coordinate={myLiveLocation} title="Driver" >
            <Truck />
          </Marker>}

          <Polyline
            coordinates={getPolyline ? getPolyline : [
              { latitude: 37.78825, longitude: -122.4324 },
              { latitude: 37.78925, longitude: -122.4324 },
            ]}
            strokeColor={'red'}
            // strokeColors={[
            //   'red',
            //   'orange'
            // ]}
            strokeWidth={5}

          />

          {/* <MapViewDirections
            origin={origin}
            destination={destination}
            // waypoints={waypointsss}
            apikey={GoogleMapKey}
            mode="driving"
            alternatives // Request multiple alternative routes
            strokeWidth={6}
            strokeColor="green"
          /> */}
        </MapView>}
        {(confirmPickupDepartureLoader ||
          getSingleShiftLoader ||
          getSingleShiftDeliveryLoader ||
          confirmDeliveryDepartureLoader ||
          directionLineLoader
        ) && <CustomActivityIndicator />}

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
        {locationAlertOnArrival && (
          <CustomAlert
            closeSuccessErrorAlert={continueAnyWays}
            alertType="error"
            buttonText="Confirm Arrival Anyways"
            Title="ERROR"
            description="We cannot verify your location at the moment. Please check your connection and try again."
          />
        )}
        {allPickedUpAlert && (
          <CustomAlert
            closeSuccessErrorAlert={() => setAllPickedUpAlert(false)}
            alertType="success"
            buttonText="Start Delivering"
            Title="Success"
            description="You have successfully picked up all packages from all pickup locations."
          />
        )}
        {/* pickup cards */}
        {deliveryStatus != 'delivery' ? (
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              zIndex: 0
            }}>
            <ScrollView
              ref={scrollViewRef}
              onScroll={handlePickupHorizontalListScroll}
              horizontal
              snapToInterval={
                dimensionsWidth / 1.15 + (dimensionsWidth / 2) * 0.25
              }
              decelerationRate="normal" // You can experiment with different rates
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
                      <TouchableOpacity
                        onPress={() => {
                          let latitude = item?.lat;
                          let longitude = item?.lng;
                          openGoogleMaps(
                            latitude,
                            longitude,
                          )
                        }}
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: color.appBlue,
                          height: 30,
                          width: 30,
                          borderRadius: 4,
                        }}>
                        <Navigate />
                      </TouchableOpacity>
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
                  {(item.status == 'pending' || item.status == 'delay') && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        marginVertical: 10,
                      }}>
                      <CustomButton
                        onPress={() => {
                          setChooseDelayTime(true)
                          setDelayReportPickupAndDeliveryData({ ...item, delayType: 'pickup' })
                        }}
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
                        onPress={async () => {
                          const onLocation = await checkUserInDestinationOrNot(item)
                          console.log("ONlocation=>>>>>>>", onLocation);
                          if (onLocation <= 50) {
                            await dispatch(confirmPickupDeparturee({ shipmentId: param?.shipment_Id || shipment_Id, pickup_Id: item._id, status: 'arrival' }))
                            dispatch(getSingleShift(param?.shipment_Id || shipment_Id))
                          }
                          else {
                            // show alert and ask if he want to still continue/anyways
                            setLocationAlertOnArrival(true)
                            setCurrentDeliveryOrPickupData({ ...item, arrivalType: 'pickup' })
                          }
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
                  {/*Start picking up*/}
                  {(item.status == 'arrival') && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        marginVertical: 10,
                      }}>
                      <CustomButton
                        onPress={() => {
                          setStopFetchDirectionLine(false)
                          navigation.navigate(route.PackageDetails, {
                            shipmentId: param?.shipment_Id || shipment_Id,
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
                        title={'Start Picking Up'}
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
                            shipmentId: param?.shipment_Id || shipment_Id,
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
                        title={'Pickup Confirmed'}
                      />
                    </View>
                  )}
                </View>
              ))}
              {Platform.OS == 'android' && <View style={{ width: dimensionsWidth / 1.15 + (dimensionsWidth / 2) * 0.25 }} />}
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
                zIndex: 0
              }}>
              <ScrollView
                ref={scrollViewRef}
                onScroll={handleDeliveryHorizontalListScroll}
                horizontal
                snapToInterval={itemWidth + itemSpacing}
                decelerationRate="normal"
                scrollEventThrottle={SCROLL_EVENT_THROTTLE}
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
                      {(item.status == 'done' && item?.deliveryImages == null) && <TouchableOpacity
                        onPress={() => navigation.navigate(route.Receipt, { shipmentId: param?.shipment_Id || shipment_Id, deliveryId: item._id })}
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
                      </TouchableOpacity>}
                      {/* <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                        {((item.status == 'arrival') && (item.status != 'pending')) && <TouchableOpacity
                          onPress={() => {
                            setStopFetchDirectionLine(false)
                            navigation.navigate(route.PackageDetailsDelivery, {
                              shipmentId: param?.shipment_Id||shipment_Id,
                              deliveryId: item._id,
                            })
                          }
                          }>
                          <MapEye />
                        </TouchableOpacity>}
                      </View> */}
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 5,
                        alignSelf: 'center',
                        width: '100%',
                        padding: 5,
                      }}>



                      {/*Start delivery */}
                      {(item.status == 'arrival') && (item.status != 'pending') && (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            marginVertical: 10,
                          }}>
                          <CustomButton
                            onPress={() => {
                              setStopFetchDirectionLine(false)
                              navigation.navigate(route.PackageDetailsDelivery, {
                                shipmentId: param?.shipment_Id || shipment_Id,
                                deliveryId: item._id,
                              })
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
                            title={'Deliver Packages'}
                          />
                        </View>
                      )}
                      {/* Arrival  buttons when available to deliver that he picked*/}
                      {(item.status == 'pending' || item.status == 'delay') && (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            marginVertical: 10,
                          }}>
                          <CustomButton
                            onPress={() => {
                              setChooseDelayTime(true)
                              setDelayReportPickupAndDeliveryData({ ...item, delayType: 'delivery' })
                            }}
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
                            onPress={async () => {
                              const onLocation = await checkUserInDestinationOrNot(item)
                              console.log("ONlocation=>>>>>>>delivery", onLocation);
                              if (onLocation <= 50) {
                                await dispatch(confirmDeliveryDeparturee({ shipmentId: param?.shipment_Id || shipment_Id, deliveryId: item._id, status: 'arrival' }))
                                dispatch(getSingleShiftDelivery(param?.shipment_Id || shipment_Id))
                              }
                              else {
                                // show alert and ask if he want to still continue/anyways
                                setLocationAlertOnArrival(true)
                                setCurrentDeliveryOrPickupData({ ...item, arrivalType: 'delivery' })
                              }
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
                      {/* confirm delivery departure */}
                      {(item.status == 'done' && item.deliveryImages) && (
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
                                  shipmentId: param?.shipment_Id || shipment_Id,
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
                            title={'Delivery Confirmed'}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                ))}
                {Platform.OS == 'android' && <View style={{ width: dimensionsWidth / 1.15 + (dimensionsWidth / 2) * 0.25 }} />}
              </ScrollView>
            </View>
          )}
        {/* choose time if late (delay time) */}
        {chooseDelayTime && (
          <View style={{ height: dimensions, width: dimensionsWidth, backgroundColor: 'rgba(0,0,0,0.7)', zindex: 2 }}>
            <View
              style={{
                position: 'absolute',
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
                  Please choose your current time
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
                onPress={sendDelayReport}
                title={'Continue'}
                buttonStyle={{
                  zIndex: -2,
                  position: 'absolute',
                  bottom: 20,
                  alignSelf: 'center',
                  height: 40,
                  width: '60%',
                  backgroundColor: checkDelayedTime ? color.appBlue : '#CCCCCC',
                }}
                textStyle={{ color: color.white, fontWeight: '500' }}
              />
            </View>
          </View>
        )}
      </Block>

        :
        <Block>
          {(!confirmPickupDepartureLoader &&
            !getSingleShiftLoader &&
            !getSingleShiftDeliveryLoader &&
            !confirmDeliveryDepartureLoader &&
            !directionLineLoader
          ) &&
            <>
              <View style={{ top: 50, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', position: 'absolute' }}>
                <CustomText size={17}>
                  There is no new job
                </CustomText>
                <CustomText style-={{ fontWeight: 'bold' }} size={28}>
                  No New Route Found
                </CustomText>
              </View>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {/* <NoRoute /> */}
                <Image
                  source={require('../../asset/pngs/myrouteNojob.png')}
                  resizeMode='contain'
                  style={{ height: '100%', width: '100%' }}
                />
              </View>
            </>}
          {(confirmPickupDepartureLoader ||
            getSingleShiftLoader ||
            getSingleShiftDeliveryLoader ||
            confirmDeliveryDepartureLoader ||
            directionLineLoader
          ) && <CustomActivityIndicator />}
        </Block>
      }
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
