import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Block from '../../components/Block';
import { dimensions } from '../../Dimensions';
import { color } from '../../utils/colors';
import Package from '../../asset/svgIcons/PackageDetails.svg';
import CustomText from '../../components/CustomText';
import NotificationAlert from '../../components/NotificationAlert';
import CustomAlert from '../../components/CustomAlert';
import { route } from '../../Routes';
import FormText from '../../components/FormText';
import { useDispatch, useSelector } from 'react-redux';
import { confirmPickupPackages } from '../../redux/actions/confirmPackagePickup';
import { useIsFocused, useRoute } from '@react-navigation/native';
import CustomActivityIndicator from '../../components/CustomLoader';
import {
  getAllPickupPackages,
  pickupPointDepartureOrDone,
} from '../../redux/actions/getAllpackagesFromPickup';

const index = ({ navigation }) => {
  const [pickupConfirmed, setPickupConfirmed] = useState(false);
  const [showNotificationAlert, setShowNotificationAlert] = useState(false);
  const [oneTimeShowNotiAlert, setOneTimeShowNotiAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [cardStates, setCardStates] = useState({});
  const [refreshComponent, setRefreshComponent] = useState(0);
  const [dataFetched, setDataFetched] = useState(false);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const parameter = useRoute();
  const param = parameter?.params;

  //selectors

  const truckingState = useSelector(state => state);

  //getAllPickupPackages

  const { data: allPickupPackages } =
    truckingState?.getALLPickupPackages?.data || [];
  const { loading: getALLPickupLoader } = truckingState?.getAllShifts || {};

  // confirm packages pickup

  const { data: confirmPickupResponse, success: confirmPickupSuccess } =
    truckingState?.confirmPackagesPickup?.data || [];
  const { loading: confirmPackagesPickupLoader } =
    truckingState?.confirmPackagesPickup || {};


  useEffect(() => {
    dispatch(
      getAllPickupPackages({
        shipmentId: param.shipmentId,
        pickup_Id: param.pickup_Id,
      }),
    );
  }, [refreshComponent, isFocused]);

  useEffect(() => {
    // Check if allPickupPackages has a value
    if (allPickupPackages) {
      const allPickup = allPickupPackages?.every(
        obj => obj.status === 'pickup',
      );
      // Show alert when data is fetched and value is available
      if (dataFetched) {
        if (allPickup) {
          dispatch({ type: 'SET_CONTINUE_BTN', payload: true })
          dispatch(
            pickupPointDepartureOrDone({
              shipmentId: param.shipmentId,
              pickup_Id: param.pickup_Id,
              status: 'done',
            }),
          );
        }
      } else {
        // Data has been fetched, update the state to true
        setDataFetched(true);
      }
    }
  }, [allPickupPackages, dataFetched]);
  // show notification alert when confirmed
  const handleConfirmPickup = () => {
    if (confirmPickupSuccess) {
      setShowNotificationAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowNotificationAlert(false);
  };

  const closeOrUpdateSuccessErrorAlert = () => {
    setSuccessAlert(false);
    // navigation.navigate('MyRoutes')
    navigation.navigate(route.MyRoutes, {
      requireButtonType: 'departure',
      deliveryStatus: 'delivery',
    });
  };

  const handleConfirmPickupPackage = async obj => {
    // Dispatch your action to confirm pickup
    await dispatch(
      confirmPickupPackages({
        pickUp_id: obj._id,
        shipmentId: param?.shipmentId,
      }),
    );
    setRefreshComponent(refreshComponent + 2);
    setOneTimeShowNotiAlert(true);
  };
  // show NotificationAlert
  useEffect(() => {
    oneTimeShowNotiAlert && handleConfirmPickup();
    // handleConfirmPickup();
  }, [confirmPickupSuccess && oneTimeShowNotiAlert]);

  return (
    <Block>
      {(getALLPickupLoader || confirmPackagesPickupLoader) && (
        <CustomActivityIndicator />
      )}
      {successAlert && (
        <CustomAlert
          closeSuccessErrorAlert={closeOrUpdateSuccessErrorAlert}
          alertType={'success'}
          Title={'SUCCESS'}
          description={'You are departing'}
          buttonText={'OK'}
        />
      )}
      {showNotificationAlert && (
        <NotificationAlert
          title={'Success'}
          description={'Pick-up Confirmed'}
          onClose={handleCloseAlert}
        />
      )}
      <View
        style={{
          backgroundColor: color.appYellow,
          alignSelf: 'center',
          width: '95%',
          height: (dimensions / 2) * 1.6,
          borderRadius: 15,
        }}>
        {/* card */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {allPickupPackages?.map(obj => (
            <View
              style={{
                backgroundColor: color.white,
                width: '95%',
                alignSelf: 'center',
                marginTop: 10,
                borderTopRightRadius: 30,
              }}>
              {/* Card header */}
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  height: 60,
                  backgroundColor: color.appBlue,
                  borderTopRightRadius: 30,
                  borderBottomLeftRadius: 30,
                }}>
                <View
                  style={{
                    height: 60,
                    width: '20%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 25,
                      backgroundColor: color.white,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Package height={24} width={24} />
                  </View>
                </View>
                <View
                  style={{
                    height: 60,
                    width: '45%',
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                  }}>
                  <CustomText
                    size={15}
                    style={{ color: color.white, fontWeight: '700' }}>
                    {obj.article_name}
                  </CustomText>
                  <CustomText
                    size={12}
                    style={{ color: color.white, fontWeight: '500' }}>
                    ID : {obj._id}
                  </CustomText>
                </View>
                <View
                  style={{ height: 60, width: '35%', justifyContent: 'center' }}>
                  <TouchableOpacity
                    onPress={async () => {
                      // setShowNotificationAlert(true)
                      // setPickupConfirmed(!pickupConfirmed)
                      //   handleConfirmPickup(obj.id);
                      await handleConfirmPickupPackage(obj);
                    }}
                    style={{
                      height: 30,
                      backgroundColor: color.white,
                      borderRadius: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 100,
                    }}>
                    <CustomText
                      size={11}
                      style={{ color: color.appBlue, fontWeight: '600' }}>
                      {/* {cardStates[obj.id] ? 'Confirmed' : 'Confirm Pickup'} */}
                      {obj.status == 'pickup' ? 'Confirmed' : 'Confirm Pickup'}
                    </CustomText>
                  </TouchableOpacity>
                  {/* disablig button when pickedup */}
                  {obj.status == 'pickup' && (
                    <View
                      style={{
                        backgroundColor: 'pink',
                        height: 30,
                        width: 100,
                        position: 'absolute',
                        borderRadius: 8,
                        zIndex: 99,
                        backgroundColor: 'rgba(191,191,191,0.8)',
                      }}
                    />
                  )}
                </View>
              </View>

              {/* Card Body */}
              <View style={{ marginVertical: 10 }} />
              <FormText
                heading={'Article no. :'}
                description={obj.article_no}
              />
              <FormText
                heading={'Package Content :'}
                description={obj.article_content}
              />
              <FormText
                heading={'Package Dimensions :'}
                description={`${obj.package_length} L x ${obj.package_height} H x ${obj.package_width} W`}  //{'14 L x 2 H x 20W'}
              />
              <FormText heading={'Receiver Name :'} description={obj.reciverName || '-'} />
              <FormText
                heading={'Delivery Navigate :'}
                description={obj.address || '-'}
              />
              <FormText
                heading={'Package Weight :'}
                description={obj.package_weight || '-'}
              />
              <View style={{ marginBottom: 10 }} />

            </View>
          ))}
        </ScrollView>
      </View>
    </Block>
  );
};

export default index;
