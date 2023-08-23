import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
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
import { fetchMyLocation } from '../../utils/helperFunction';
import Truck from '../../asset/svgIcons/Truck.svg';
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
import { auth } from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import DeliveryPin from '../../asset/svgIcons/deliveryMarker.svg';
import { getDirectionLine, resetDirectionLineState } from '../../redux/actions/getDirectionLine';
import polyline from '@mapbox/polyline';
import { resetState } from '../../redux/actions/resetReduxState';
import { CONFIRMALLPACKAGESPICKEDUP_SUCCESS } from '../../redux/constants/ConfirmAllPackagesPickedUp';
import { pickupDelayReport } from '../../redux/actions/pickupDelayReport';
import { deliveryDelayReport } from '../../redux/actions/deliveryDelayReport';
import AsyncStorage from '@react-native-async-storage/async-storage';
const geolib = require("geolib");



// const direction1 = [
//   {
//     "latitude": 37.77494,
//     "longitude": -122.41945
//   },
//   {
//     "latitude": 37.77504,
//     "longitude": -122.41931
//   },
//   {
//     "latitude": 37.77513,
//     "longitude": -122.41919
//   },
//   {
//     "latitude": 37.7753,
//     "longitude": -122.41899
//   },
//   {
//     "latitude": 37.77555,
//     "longitude": -122.41866
//   },
//   {
//     "latitude": 37.77566,
//     "longitude": -122.41852
//   },
//   {
//     "latitude": 37.77576,
//     "longitude": -122.41849
//   },
//   {
//     "latitude": 37.77588,
//     "longitude": -122.41833
//   },
//   {
//     "latitude": 37.776,
//     "longitude": -122.41818
//   },
//   {
//     "latitude": 37.7765,
//     "longitude": -122.41757
//   },
//   {
//     "latitude": 37.7764,
//     "longitude": -122.41733
//   },
//   {
//     "latitude": 37.7761,
//     "longitude": -122.41695
//   },
//   {
//     "latitude": 37.77576,
//     "longitude": -122.41651
//   },
//   {
//     "latitude": 37.77553,
//     "longitude": -122.41624
//   },
//   {
//     "latitude": 37.77528,
//     "longitude": -122.41592
//   },
//   {
//     "latitude": 37.77517,
//     "longitude": -122.41579
//   },
//   {
//     "latitude": 37.77484,
//     "longitude": -122.41539
//   },
//   {
//     "latitude": 37.77473,
//     "longitude": -122.41524
//   },
//   {
//     "latitude": 37.77448,
//     "longitude": -122.41493
//   },
//   {
//     "latitude": 37.77403,
//     "longitude": -122.41437
//   },
//   {
//     "latitude": 37.77394,
//     "longitude": -122.41426
//   },
//   {
//     "latitude": 37.7737,
//     "longitude": -122.41396
//   },
//   {
//     "latitude": 37.77355,
//     "longitude": -122.41378
//   },
//   {
//     "latitude": 37.77281,
//     "longitude": -122.41284
//   },
//   {
//     "latitude": 37.77251,
//     "longitude": -122.41246
//   },
//   {
//     "latitude": 37.77246,
//     "longitude": -122.41239
//   },
//   {
//     "latitude": 37.77208,
//     "longitude": -122.41192
//   },
//   {
//     "latitude": 37.77157,
//     "longitude": -122.41129
//   },
//   {
//     "latitude": 37.77127,
//     "longitude": -122.41091
//   },
//   {
//     "latitude": 37.77107,
//     "longitude": -122.41066
//   },
//   {
//     "latitude": 37.771,
//     "longitude": -122.41056
//   },
//   {
//     "latitude": 37.77067,
//     "longitude": -122.41013
//   },
//   {
//     "latitude": 37.77037,
//     "longitude": -122.40973
//   },
//   {
//     "latitude": 37.77032,
//     "longitude": -122.40967
//   },
//   {
//     "latitude": 37.76982,
//     "longitude": -122.40905
//   },
//   {
//     "latitude": 37.7694,
//     "longitude": -122.40858
//   },
//   {
//     "latitude": 37.76928,
//     "longitude": -122.40843
//   },
//   {
//     "latitude": 37.76916,
//     "longitude": -122.40829
//   },
//   {
//     "latitude": 37.76918,
//     "longitude": -122.40794
//   },
//   {
//     "latitude": 37.76919,
//     "longitude": -122.4078
//   },
//   {
//     "latitude": 37.7692,
//     "longitude": -122.40761
//   },
//   {
//     "latitude": 37.76922,
//     "longitude": -122.4074
//   },
//   {
//     "latitude": 37.76924,
//     "longitude": -122.40723
//   },
//   {
//     "latitude": 37.76924,
//     "longitude": -122.40719
//   },
//   {
//     "latitude": 37.76926,
//     "longitude": -122.40689
//   },
//   {
//     "latitude": 37.76927,
//     "longitude": -122.40675
//   },
//   {
//     "latitude": 37.76929,
//     "longitude": -122.40665
//   },
//   {
//     "latitude": 37.7693,
//     "longitude": -122.40659
//   },
//   {
//     "latitude": 37.76937,
//     "longitude": -122.40634
//   },
//   {
//     "latitude": 37.76942,
//     "longitude": -122.40624
//   },
//   {
//     "latitude": 37.76944,
//     "longitude": -122.40621
//   },
//   {
//     "latitude": 37.76959,
//     "longitude": -122.40595
//   },
//   {
//     "latitude": 37.76961,
//     "longitude": -122.40591
//   },
//   {
//     "latitude": 37.76962,
//     "longitude": -122.40588
//   },
//   {
//     "latitude": 37.76963,
//     "longitude": -122.40586
//   },
//   {
//     "latitude": 37.76964,
//     "longitude": -122.4058
//   },
//   {
//     "latitude": 37.76965,
//     "longitude": -122.4057
//   },
//   {
//     "latitude": 37.76968,
//     "longitude": -122.40565
//   },
//   {
//     "latitude": 37.76968,
//     "longitude": -122.40559
//   },
//   {
//     "latitude": 37.7697,
//     "longitude": -122.40544
//   },
//   {
//     "latitude": 37.76971,
//     "longitude": -122.40521
//   },
//   {
//     "latitude": 37.76972,
//     "longitude": -122.40497
//   },
//   {
//     "latitude": 37.76974,
//     "longitude": -122.4045
//   },
//   {
//     "latitude": 37.76975,
//     "longitude": -122.40443
//   },
//   {
//     "latitude": 37.76977,
//     "longitude": -122.40435
//   },
//   {
//     "latitude": 37.76974,
//     "longitude": -122.40427
//   },
//   {
//     "latitude": 37.76976,
//     "longitude": -122.4041
//   },
//   {
//     "latitude": 37.76978,
//     "longitude": -122.40405
//   },
//   {
//     "latitude": 37.7698,
//     "longitude": -122.404
//   },
//   {
//     "latitude": 37.76979,
//     "longitude": -122.40395
//   },
//   {
//     "latitude": 37.76979,
//     "longitude": -122.4039
//   },
//   {
//     "latitude": 37.76979,
//     "longitude": -122.40387
//   },
//   {
//     "latitude": 37.76982,
//     "longitude": -122.40382
//   },
//   {
//     "latitude": 37.76984,
//     "longitude": -122.40379
//   },
//   {
//     "latitude": 37.76988,
//     "longitude": -122.40376
//   },
//   {
//     "latitude": 37.76992,
//     "longitude": -122.40376
//   },
//   {
//     "latitude": 37.76996,
//     "longitude": -122.40377
//   },
//   {
//     "latitude": 37.77,
//     "longitude": -122.40379
//   },
//   {
//     "latitude": 37.77002,
//     "longitude": -122.40382
//   },
//   {
//     "latitude": 37.77003,
//     "longitude": -122.40386
//   },
//   {
//     "latitude": 37.77004,
//     "longitude": -122.40389
//   },
//   {
//     "latitude": 37.77018,
//     "longitude": -122.40372
//   },
//   {
//     "latitude": 37.771,
//     "longitude": -122.40269
//   },
//   {
//     "latitude": 37.77114,
//     "longitude": -122.4025
//   },
//   {
//     "latitude": 37.77133,
//     "longitude": -122.40227
//   },
//   {
//     "latitude": 37.77147,
//     "longitude": -122.40209
//   },
//   {
//     "latitude": 37.77162,
//     "longitude": -122.4019
//   },
//   {
//     "latitude": 37.77181,
//     "longitude": -122.40168
//   },
//   {
//     "latitude": 37.7721,
//     "longitude": -122.40134
//   },
//   {
//     "latitude": 37.7722,
//     "longitude": -122.40122
//   },
//   {
//     "latitude": 37.77238,
//     "longitude": -122.401
//   },
//   {
//     "latitude": 37.77292,
//     "longitude": -122.40031
//   },
//   {
//     "latitude": 37.77342,
//     "longitude": -122.39966
//   },
//   {
//     "latitude": 37.77351,
//     "longitude": -122.39955
//   },
//   {
//     "latitude": 37.77361,
//     "longitude": -122.39943
//   },
//   {
//     "latitude": 37.77486,
//     "longitude": -122.39784
//   },
//   {
//     "latitude": 37.77534,
//     "longitude": -122.39723
//   },
//   {
//     "latitude": 37.77561,
//     "longitude": -122.39689
//   },
//   {
//     "latitude": 37.7759,
//     "longitude": -122.39653
//   },
//   {
//     "latitude": 37.77645,
//     "longitude": -122.39581
//   },
//   {
//     "latitude": 37.77664,
//     "longitude": -122.39556
//   },
//   {
//     "latitude": 37.77706,
//     "longitude": -122.39504
//   },
//   {
//     "latitude": 37.77712,
//     "longitude": -122.39495
//   },
//   {
//     "latitude": 37.77717,
//     "longitude": -122.39488
//   },
//   {
//     "latitude": 37.77748,
//     "longitude": -122.3945
//   },
//   {
//     "latitude": 37.77791,
//     "longitude": -122.39397
//   },
//   {
//     "latitude": 37.77796,
//     "longitude": -122.39389
//   },
//   {
//     "latitude": 37.77824,
//     "longitude": -122.39356
//   },
//   {
//     "latitude": 37.77843,
//     "longitude": -122.3933
//   },
//   {
//     "latitude": 37.77868,
//     "longitude": -122.39298
//   },
//   {
//     "latitude": 37.77885,
//     "longitude": -122.39276
//   },
//   {
//     "latitude": 37.77912,
//     "longitude": -122.39244
//   },
//   {
//     "latitude": 37.77929,
//     "longitude": -122.39222
//   },
//   {
//     "latitude": 37.77975,
//     "longitude": -122.39165
//   },
//   {
//     "latitude": 37.78019,
//     "longitude": -122.39108
//   },
//   {
//     "latitude": 37.78061,
//     "longitude": -122.39054
//   },
//   {
//     "latitude": 37.78034,
//     "longitude": -122.39018
//   },
//   {
//     "latitude": 37.78022,
//     "longitude": -122.39004
//   },
//   {
//     "latitude": 37.78018,
//     "longitude": -122.38999
//   },
//   {
//     "latitude": 37.77994,
//     "longitude": -122.38967
//   },
//   {
//     "latitude": 37.77975,
//     "longitude": -122.38993
//   },
//   {
//     "latitude": 37.77969,
//     "longitude": -122.39001
//   }
// // ]
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
  const [myLiveLocation, setMyLiveLocation] = useState({
    latitude: 37.785834,
    longitude: -122.406417,
  });
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const mapRef = useRef(null);

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
      dispatch(getSingleShift(param?.shipmentId));
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


  // getdirectionLine
  useEffect(() => {
    if (!direction && !stopFetchingDirectionLineAgain) {
      dispatch(getDirectionLine(param?.shipmentId))
    }
    return () => setStopFetchDirectionLine(false)
    // setPolyline(direction)
  }, [])


  useEffect(() => {
    const reversedData = direction?.map(item => ({
      latitude: item.longitude,
      longitude: item.latitude
    }));
    setPolyline(reversedData)
  }, [direction])


  // back for the map screen
  const handleBackPress = () => {
    const resetAction = CommonActions.reset({
      index: 0, // Reset to the first screen in the stack
      routes: [{ name: route.Home }], // Replace the stack with the Home screen
    });
    navigation.dispatch(resetAction);
    // navigation.navigate(route.Home)
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
      dispatch(confirmAllPackagesPcikedUp({ id: param?.shipmentId, status: "delivering" }))
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
      setDeliveryStatus('');
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
    console.log("send Report", delayHours, delayMins, delayReportPickupAndDeliveryData);
    if (delayReportPickupAndDeliveryData?.delayType == 'pickup') {
      await dispatch(pickupDelayReport({ shipmentId: param?.shipmentId, pickup_Id: delayReportPickupAndDeliveryData?._id, status: 'delay', delayTime: `${delayHours} ${delayMins}` }))
    }
    else if (delayReportPickupAndDeliveryData?.delayType == 'delivery') {
      await dispatch(deliveryDelayReport({ shipmentId: param?.shipmentId, deliveryId: delayReportPickupAndDeliveryData?._id, status: 'delay', delayTime: `${delayHours} ${delayMins}` }))
    }
    setChooseDelayTime(false)
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

  //Fetch users live location 
  useEffect(() => {
    if (singleShiftDelivery != undefined) {
      let retryCount = 0; // Initialize retry count
      const maxRetries = 3; // Maximum number of retries
      const intervalId = setInterval(async () => {
        try {
          const location = await fetchMyLocation();
          setMyLiveLocation(location);
          // console.log("locatiojnnnn", location);
          // if (userData && userData._id) {
          //   firebase.database().ref(`driver_livelocation/${userData._id}`).set(location);
          // }
          retryCount = 0; // Reset retry count on successful location fetch
        } catch (error) {
          console.error('Location fetch error:', error);
          retryCount++;

          if (retryCount >= maxRetries) {
            clearInterval(intervalId); // Stop retrying after max retries
          }
        }
      }, 5000);

      return () => {
        clearInterval(intervalId); // Clear the interval when the component unmounts
      };
    }
  }, [singleShiftDelivery]);



  useEffect(() => {
    const pickupCoords = singleShift?.map(item => ({
      lat: item.lat && item.lat,
      lng: item.lng && item.lng,
    }));
    const deliveryCoords = singleShiftDelivery?.map(item => ({
      lat: item.lat && item.lat,
      lng: item.lng && item.lng,
    }));
    pickupCoords && setSingleShiftCoords(pickupCoords)
    deliveryCoords && setSingleDeliveryCoords(deliveryCoords)
  }, [singleShift, singleShiftDelivery]);

  // get delivery points
  useEffect(() => {
    if (isFocused && !stopFetchingDirectionLineAgain) {
      dispatch(getSingleShiftDelivery(param?.shipmentId));
    }
  }, [isFocused, stopFetchingDirectionLineAgain, refresher]);


  // CHECK IF single delivery card deliveries are done and ready/click departure
  useEffect(() => {
    let allDelivered = singleShiftDelivery?.every(
      obj => obj.status === 'departure',
    );
    if (allDelivered === true) {
      // when all packages are delivered then tell delivered//sending status to admin
      dispatch(confirmAllPackagesPcikedUp({ id: param?.shipmentId, status: "delivered" }))
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
        shipmentId: param.shipmentId,
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
        shipmentId: param.shipmentId,
        deliveryId: item._id,
        status: 'departure',
      }),
    );
    setRefresher(refresher + 2);
    // }, 3000);
  };

  //clicking on markers scrolling the horizontal list
  const handlePickupMarkerClick = (index) => {
    setSelectedMarkerIndex(index);
    scrollViewRef.current.scrollTo({ x: index * getCardWidth(), animated: true });
    mapRef.current.animateToRegion({
      latitude: singleShiftCoords[index]?.lat,
      longitude: singleShiftCoords[index]?.lng,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }, ANIMATION_DURATION);
  };
  const handleDeliveryMarkerClick = (index) => {
    setSelectedMarkerIndex(index);
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
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / getCardWidth());
    setSelectedMarkerIndex(index);
    mapRef.current.animateToRegion({
      latitude: singleShiftCoords[index]?.lat,
      longitude: singleShiftCoords[index]?.lng,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }, ANIMATION_DURATION);
  };
  const handleDeliveryHorizontalListScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / getCardWidth());
    setSelectedMarkerIndex(index);
    mapRef.current.animateToRegion({
      latitude: singleDeliveryCoords[index]?.lat,
      longitude: singleDeliveryCoords[index]?.lng,
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
    if (singleShiftCoords?.length > 0) {
      const coordinates = singleShiftCoords?.map((marker) => ({
        latitude: marker.lat,
        longitude: marker.lng,
      }));
      mapRef?.current?.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }, // Adjust padding as needed
        animated: true,
      });
    }
  }, [singleShiftCoords, isFocused]);

  // const convertInnerArraysToObjects = (array) => {
  //   const newArray = [];
  //   for (const innerArray of array) {
  //     const object = {};
  //     object.latitude = innerArray[1];
  //     object.longitude = innerArray[0];
  //     newArray.push(object);
  //   }
  //   return newArray;
  // };

  // useEffect(() => {
  //   const encode = polyline.encode(direction1)
  //   console.log("encodedededededed", encode);
  //   const decodedPolyline = polyline?.decode(encode);
  //   console.log("decodedPolyline", decodedPolyline);
  //   const newArray = convertInnerArraysToObjects(decodedPolyline);
  //   console.log("newnewArraynewArraynewArray", newArray);
  //   setPolyline(newArray)
  // }, [])
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
    }); //unit is not working here thats why dividing by 1000 to convert meters to km

    return dist / 1000
  }

  // when user is 50 meters aways from the delivery point and still want to deliver then click anyways
  const continueAnyWays = async () => {
    if (currentDeliveryOrPickupData?.arrivalType == 'pickup') {
      await dispatch(confirmPickupDeparturee({ shipmentId: param?.shipmentId, pickup_Id: currentDeliveryOrPickupData?._id, status: 'arrival' }))
      dispatch(getSingleShift(param?.shipmentId))
    }
    else if (currentDeliveryOrPickupData?.arrivalType == 'delivery') {
      await dispatch(confirmDeliveryDeparturee({ shipmentId: param?.shipmentId, deliveryId: currentDeliveryOrPickupData?._id, status: 'arrival' }))
      dispatch(getSingleShiftDelivery(param?.shipmentId))
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









  return (
    <SafeAreaView flex={1}>
      <Block>
        {chooseDelayTime && (
          <View style={{ height: dimensions, width: dimensionsWidth, backgroundColor: 'rgba(0,0,0,0.7)', zindex: 999 }}>
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
                  backgroundColor: color.appBlue,
                }}
                textStyle={{ color: color.white, fontWeight: '500' }}
              />
            </View>
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
          {singleShiftCoords?.map((coords, index) => (
            <Marker
              coordinate={{
                latitude: coords?.lat,
                longitude: coords?.lng,
              }}
              title="Pickup Point"
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
              title="Delivery Point"
              onPress={() => handleDeliveryMarkerClick(index)}
            >
              <DeliveryPin />
            </Marker>
          ))}
          {myLiveLocation && <Marker coordinate={myLiveLocation} title="Driver">
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
        </MapView>
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
              bottom: 20,
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
                            await dispatch(confirmPickupDeparturee({ shipmentId: param?.shipmentId, pickup_Id: item._id, status: 'arrival' }))
                            dispatch(getSingleShift(param?.shipmentId))
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
                        title={'Pickup Confirmed'}
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
                      {item.status == 'done' && <TouchableOpacity
                        onPress={() => navigation.navigate(route.Receipt, { shipmentId: param?.shipmentId, deliveryId: item._id })}
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
                              shipmentId: param?.shipmentId,
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
                                shipmentId: param?.shipmentId,
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
                      {item.status == 'pending' && (
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
                                await dispatch(confirmDeliveryDeparturee({ shipmentId: param?.shipmentId, deliveryId: item._id, status: 'arrival' }))
                                dispatch(getSingleShiftDelivery(param?.shipmentId))
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
                            title={'Delivery Confirmed'}
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
