import {View, Text} from 'react-native';
import React from 'react';
import CustomText from '../../components/CustomText';
import {dimensions} from '../../Dimensions';
import CustomButton from '../CustomButton';
import {color} from '../../utils/colors';
import Error from '../../asset/svgIcons/Error.svg';
import Success from '../../asset/svgIcons/success.svg';
const index = ({
  alertType,
  Title,
  description,
  closeSuccessErrorAlert,
  buttonText,
}) => {
  // set color
  const AlertThemeColor =
    alertType == 'error' ? color.errorRed : color.successGreen;

  return (
    <View
      style={{
        backgroundColor: 'rgba(120,120,120,0.5)',
        flex: 1,
        position: 'absolute',
        zIndex: 999,
        height: '100%',
        width: '100%',
      }}>
      <View
        style={{
          borderRadius: 20,
          backgroundColor: AlertThemeColor,
          width: '85%',
          alignSelf: 'center',
          marginTop: (dimensions / 2) * 0.45,
          paddingVertical: 20,
        }}>
        {/*Alert Icon */}
        <View
          style={{
            borderWidth: alertType != 'error' ? 4 : 0,
            borderColor: alertType != 'error' && color.white,
            backgroundColor: AlertThemeColor,
            height: 80,
            width: 80,
            borderRadius: 50,
            alignSelf: 'center',
            position: 'absolute',
            top: -40,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {alertType == 'error' ? <Error /> : <Success />}
        </View>
        {/* description Body */}
        <View
          style={{
            marginVertical: 60,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CustomText size={23} style={{fontWeight: '700', color: color.white}}>
            {Title}
          </CustomText>
          <CustomText
            size={16}
            style={{
              color: color.white,
              fontWeight: '500',
              textAlign: 'center',
            }}>
            {description}
          </CustomText>
        </View>

        {/*Floating Button */}
        <CustomButton
          onPress={() => closeSuccessErrorAlert()}
          title={buttonText}
          buttonStyle={{
            backgroundColor: color.white,
            borderRadius: 50,
            borderWidth: 1.5,
            borderColor: AlertThemeColor,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            width: '90%',
            alignSelf: 'center',
            position: 'absolute',
            bottom: -25,
          }}
          textStyle={{color: AlertThemeColor, fontSize: 22, fontWeight: '700'}}
        />
      </View>
    </View>
  );
};

export default index;
