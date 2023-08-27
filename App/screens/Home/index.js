import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../../utils/colors';
import Block from '../../components/Block';
import CustomText from '../../components/CustomText';
import CustomButton from '../../components/CustomButton';
import RoundTop from '../../asset/svgs/Round top.svg';
import styles from './style';
import Profile from '../../asset/svgs/ProfileImagee.svg';
import Carton from '../../asset/svgIcons/carton.svg';
import Building from '../../asset/svgs/Building.svg';
import { route } from '../../Routes';
import { useIsFocused, useRoute } from '@react-navigation/native';
import PickupAlert from '../../components/PickupAlert';
import database from '@react-native-firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../redux/actions/auth';
import CustomActivityIndicator from '../../components/CustomLoader';
import { getAllShifts, getSingleShift } from '../../redux/actions/getShifts';
import { acceptOrRejectJob } from '../../redux/actions/acceptOrRejectJob';
import { resetState } from '../../redux/actions/resetReduxState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoJobs from '../../asset/svgs/noJobAssigned.svg'
const Index = ({ navigation }) => {
  // hitApis/dispatch
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  // getallshipments and profile

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getAllShifts());
  }, [isFocused, navigation, dispatch, allShifts]);

  //selectors

  const truckingState = useSelector(state => state);
  const { shipment_Id } = truckingState.shipmentId || ''

  // get profile

  const { fullName, email, city, profilePhoto, firstName, lastName } =
    truckingState?.getProfile.data || {};
  const { loading: getProfileLoader } = truckingState?.getProfile || {};

  //getAllshifts

  const { data: allShifts } = truckingState?.getAllShifts?.data || [];
  const { loading: getAllShiftsLoader } = truckingState?.getAllShifts || {};

  //get acceptrejectjob status

  const { data } = truckingState?.acceptOrRejectJob?.data || [];


  //get Direction Line
  const { data: directionLine } =
    truckingState?.getdirectionLine || [];
  const { loading: directionLineLoader } =
    truckingState?.getdirectionLine || {};
  const direction = directionLine?.data?.shipmentDetail?.direction

  const [readyForPickup, setReadyForPickup] = useState(false);
  const [shipmentId, setShipmentId] = useState('');
  const parameter = useRoute();
  const filteredShifts = allShifts?.filter(shift => shift.status !== 'delivered')
  const reversedShifts = filteredShifts?.slice()?.reverse();
  console.log("reversedShiftsreversedShiftsreversedShifts", reversedShifts);
  const PickupAlertNext = () => {
    dispatch(acceptOrRejectJob({ id: shipmentId, status: 'start' }));
    // active single shifts again to get its response to next screen where currently navigating
    // navigation.navigate(route.MyRoutes, {
    //   requireButtonType: 'arrival',
    //   shipmentId,
    // });
    navigation.navigate('My Routes', { screen: 'MyRoutes', params: { shipment_Id: shipmentId } })
    setReadyForPickup(false);
  };

  const closePickupAlert = () => {
    setReadyForPickup(false);
  };

  const onClickViewDetails = _id => {
    dispatch(getSingleShift(_id));
    navigation.navigate(route.ViewDetails, { shiftId: _id });
    // send shift id to get single shift packages
  };

  const checkIfanyotherJobIsInProgress = () => {
    const jobInProgress = allShifts?.some(
      shift =>
        shift.status === 'delivering' ||
        shift.status === 'pickup' ||
        shift.status === 'arrival' ||
        shift.status === 'start'
    );
    return jobInProgress
  }
  // save shipment if any of the shipment in progress status==start >>>> this id will be used when directly click on myRoutes tab
  useEffect(() => {
    const startShift = allShifts?.find(shift => shift.status === "start" || shift.status === "delivering");
    if (startShift?._id) {
      dispatch({ type: 'SET_SHIPMENT_ID', payload: startShift?._id });
    } else {
      dispatch({ type: 'SET_SHIPMENT_ID', payload: null });
    }
  }, [allShifts, dispatch])

  const onClickShipmentButton = item => {
    setShipmentId(item?._id)
    if (item.status == 'accept') {
      //onclick startworking
      const inProgress = checkIfanyotherJobIsInProgress()
      if (inProgress) {
        alert('one job allowed at a time')
      }
      else {
        setReadyForPickup(true);
        setShipmentId(item._id);
      }
    } else if (item.status == 'assign') {//by default assign
      onClickViewDetails(item._id);
    } else if (item.status == 'start') {//means pickup
      setShipmentId(item._id);
      dispatch({ type: 'SET_SHIPMENT_ID', payload: item._id });
      // navigation.navigate(route.MyRoutes)
      navigation.navigate('My Routes', { screen: 'MyRoutes', params: { shipment_Id: item._id } })

      // navigation.navigate(route.MyRoutes, {
      //   requireButtonType: 'arrival',//not using for now
      //   shipmentId: item?._id,
      // });
    }
    else if (item.status == 'delivering') {
      setShipmentId(item._id);
      // navigation.navigate('RouteStack',{screen:'MyRoutes'})
      navigation.navigate('My Routes', { screen: 'MyRoutes', params: { shipment_Id: item._id } })
      // navigation.navigate(route.MyRoutes, {
      //   requireButtonType: 'arrival',
      //   shipmentId: item._id,
      // });
    }
    else if (item.status == 'delivered') {
      alert("Successfully Delivered")
      // setShipmentId(item._id);
      // navigation.navigate(route.MyRoutes, {
      //   requireButtonType: 'arrival',
      //   shipmentId: item._id,
      // });
    }
    else if (item.status == 'reject') {
      alert("You rejected the job contact admin if still interested")
    }
  };



  // reset redux state selected entities (why? coz it sets delivered when come back from map as it still persists single shift data thats why realy important to remove that)
  useEffect(() => {
    // setTimeout(() => {
    //   (allShifts && truckingState?.getProfile.data) && dispatch(resetState());
    // }, 4000)
    (allShifts && truckingState?.getProfile.data) && isFocused && dispatch(resetState())
  }, [allShifts && truckingState?.getProfile.data])




  return (
    <Block>
      {(getProfileLoader || getAllShiftsLoader) && <CustomActivityIndicator />}
      <RoundTop width={'100%'} height={500} style={{ marginTop: -50 }} />
      {readyForPickup && (
        <PickupAlert
          PickupAlertNext={PickupAlertNext}
          closeButton={closePickupAlert}
          title={`Let's start with pickups`}
          description={
            'On next screen, you will see Pickup Navigates. You can start delivering only when you have picked all the orders.'
          }
        />
      )}

      {/* Shift Card */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.ScrollView}>
        {reversedShifts?.length>0 ? reversedShifts?.map(item => (
          <View style={{ marginTop: 20 }}>
            <View style={styles.BlueBackCard} />
            <View style={styles.MainCardContainer}>
              {/* Card Header */}
              <View style={styles.CardHeader}>
                <View style={styles.Icon}>
                  <Carton />
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <CustomText
                    size={14}
                    style={[
                      styles.textSmall,
                      { fontWeight: '700', color: color.appBlue },
                    ]}>
                    Shift ID: {item.shiftId}
                  </CustomText>
                  <CustomText size={12}>Estimated per hour rate</CustomText>
                  <CustomText size={12}>Assigned by : Solaris</CustomText>
                </View>
                {/* <View style={styles.PriceView}>
                  <CustomText size={8} style={styles.price}>
                    $147.09
                  </CustomText>
                </View> */}
              </View>

              {/* Card body */}

              <View style={styles.containerCard}>
                <View style={styles.row}>
                  <View style={styles.box}>
                    <CustomText size={13} style={styles.text}>
                      EST. Starting{'\n'}Time
                    </CustomText>
                    <CustomText size={10} style={styles.textSmall}>
                      {item.estimationStartTime}
                    </CustomText>
                  </View>
                  <View style={styles.separatorVertical} />
                  <View style={styles.box}>
                    <CustomText size={13} style={styles.text}>
                      Pick-up{'\n'}Points
                    </CustomText>
                    <CustomText size={10} style={styles.textSmall}>
                      {item.totalPickup} Points
                    </CustomText>
                  </View>
                  <View style={styles.separatorVertical} />
                  <View style={styles.box}>
                    <CustomText size={13} style={styles.text}>
                      Delivery{'\n'}Navigates
                    </CustomText>
                    <CustomText size={10} style={styles.textSmall}>
                      {item.totalDelivery} Navigates
                    </CustomText>
                  </View>
                </View>
                <View style={styles.separatorHorizontal} />
                <View style={styles.row}>
                  <View style={styles.box}>
                    <CustomText size={13} style={styles.text}>
                      EST. Tolls
                    </CustomText>
                    <CustomText size={10} style={styles.textSmall}>
                      Eur. {item.estimationToll}
                    </CustomText>
                  </View>
                  <View style={styles.separatorVertical} />
                  <View style={styles.box}>
                    <CustomText size={13} style={styles.text}>
                      Total{'\n'}Distance
                    </CustomText>
                    <CustomText size={10} style={styles.textSmall}>
                      {item.totalDistance} KM
                    </CustomText>
                  </View>
                  <View style={styles.separatorVertical} />
                  <View style={styles.box}>
                    <CustomText size={13} style={styles.text}>
                      Est. Time
                    </CustomText>
                    <CustomText size={10} style={styles.textSmall}>
                      {item.estimationTime} hours
                    </CustomText>
                  </View>
                </View>
              </View>
              {/* detail floating button */}
              <CustomButton
                title={
                  (item.status == 'accept' && 'Start Working') ||
                  (item.status == 'assign' && 'View Details') ||
                  (item.status == 'reject' && 'Rejected') ||
                  (item.status == 'start' && 'Picking Up') ||
                  (item.status == 'delivering' && 'Delivering') ||
                  (item.status == 'delivered' && 'Delivered')
                }
                onPress={() => {
                  onClickShipmentButton(item);
                }}
                buttonStyle={styles.ViewDetailsBtn}
                textStyle={styles.BtnText}
              />
            </View>
          </View>
        ))
          :

          ((!getProfileLoader && !getAllShiftsLoader) && <View style={{ backgroundColor:color.white,marginTop: 20, borderWidth: 1, borderColor:'#CCCCCC', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', height: 400, width: '80%' ,borderRadius:15}} >
            {/* <NoJobs /> */}
            <View style={{position:'absolute',top:20,zIndex:999,width:'70%'}}>
              <CustomText size={20} style={{fontWeight:'600'}}>
                No Jobs Assigned at
                the Moment.
              </CustomText>
              <CustomText size={16}>
              Reach out to your contractor for new jobs or wait for them to assign.
              </CustomText>
            </View>
            <Image
              source={require('../../asset/pngs/NoJobs.png')}
              style={{ height: '100%', width: '100%' ,borderRadius:15}}
            />
          </View>)
        }
        <View style={{ marginBottom: 100 }} />
      </ScrollView>

      <Image
        source={require('../../asset/pngs/Hidelayer.png')}
        style={styles.HideLayer}
      />

      {/* Main header */}

      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={styles.iconContainer}>
            <Icon name="bell" size={30} color={color.white} />
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>0 Jobs Completed</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.profileContainer1}>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileStack')} style={styles.profileContainer2}>
              {/* <Profile height={182} width={182} style={styles.profilePhoto} /> */}
              <Image
                source={{ uri: profilePhoto }}
                height={182}
                width={184}
                style={styles.profilePhoto}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/*User Detail */}

      <View style={styles.UserDetailContainer}>
        <CustomText style={styles.email} size={18}>
          {email}
        </CustomText>
        <CustomText size={40} style={styles.name}>
          {/* {firstName}
          {'\n'}
          {lastName} */}
          {fullName}
        </CustomText>
      </View>

      {/* add background image at the bottom in here */}
      <Building
        position={'absolute'}
        marginTop={400}
        marginLeft={140}
        zIndex={-2}
      />
    </Block>
  );
}
export default Index;
