import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {color} from '../../utils/colors';
import Location from '../../asset/svgIcons/Location.svg';
import CustomButton from '../CustomButton';
import CustomText from '../CustomText';
import Navigate from '../../asset/svgIcons/navigation.svg';
import Clockreport from '../../asset/svgIcons/clockReport.svg';
import ClockConfirmArrival from '../../asset/svgIcons/clockConfirmArrival';
import ClockConfirmArrivalwhite from '../../asset/svgIcons/clockConfirmArrivalwhite.svg';
import ConfirmDeparture from '../../asset/svgIcons/ConfirmDeparture.svg';
import PackageDetail from '../../asset/svgIcons/PackageDetail.svg';
import {route} from '../../Routes';
import {useNavigation} from '@react-navigation/native';
import CustomAlert from '../../components/CustomAlert';
const index = ({
  data,
  requireButtonType,
  openDelayModal,
  hours,
  mins,
  confirmDeparture,
}) => {
  const navigation = useNavigation();
  const checkDelayedTime = hours != null || mins != null ? true : false;
  const [showAlert, setShowAlert] = useState(false);
  const closeSuccessErrorAlert = () => {
    setShowAlert(false);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
      {data?.map((item) => (
        <View
          style={{
            width: '95%',
            backgroundColor: color.white,
            alignSelf: 'center',
            borderRadius: 4,
            marginVertical: 10,
          }}>
          {/* Card Header */}
          <View style={{flexDirection: 'row', width: '100%'}}>
            {/* avatar */}
            <View
              style={{
                width: '23%',
                height: 70,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
              }}>
              <View
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: color.appBlue,
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Location />
              </View>
            </View>
            {/* id container*/}
            <View
              style={{
                width: '45%',
                height: 70,
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <CustomText
                size={16}
                style={{
                  color: color.textGrey,
                  fontWeight: '500',
                  marginVertical: 1,
                }}>
                Pickup Point 1
              </CustomText>
              <CustomText
                size={14}
                style={{color: color.appBlue, fontWeight: '600'}}>
                ID : 8837373828
              </CustomText>
            </View>
            {/* navigate button */}
            <TouchableOpacity
              style={{
                width: '32%',
                height: 70,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
              }}>
              <View
                style={{
                  backgroundColor: color.appBlue,
                  width: '90%',
                  height: 30,
                  borderRadius: 6,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <CustomText
                  size={12}
                  style={{fontWeight: '600', color: color.white}}>
                  Navigate
                </CustomText>
                <Navigate />
              </View>
            </TouchableOpacity>
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
                {item.packageCount}
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
              style={{color: color.appBlue, fontWeight: '500'}}>
              Handle with care
            </CustomText>
          </View>

          {/* Extra buttons depending on screens requirement {arrival buttons} */}
          {requireButtonType == 'arrival' && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                marginVertical: 10,
              }}>
              <CustomButton
                onPress={() => openDelayModal(true)}
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
                  color: checkDelayedTime ? color.white : color.successGreen,
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
          {requireButtonType == 'departure' && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                marginVertical: 10,
              }}>
              <CustomButton
                onPress={() => navigation.navigate(route.PackageDetails)}
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
  );
};

export default index;
