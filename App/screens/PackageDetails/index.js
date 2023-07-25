import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import React, {useState} from 'react';
import Block from '../../components/Block';
import {dimensions} from '../../Dimensions';
import {color} from '../../utils/colors';
import Package from '../../asset/svgIcons/PackageDetails.svg';
import CustomText from '../../components/CustomText';
import NotificationAlert from '../../components/NotificationAlert';
import CustomAlert from '../../components/CustomAlert';
import {route} from '../../Routes';
import FormText from '../../components/FormText';
const arrDummy = [
  {
    id: '234',
    item: 'Gloves Box',
  },
  {
    id: '23c4',
    item: 'Grocery',
  },
  {
    id: '23cd4',
    item: 'Leather Jackets',
  },
  {
    id: '233324',
    item: 'Footballs',
  },
  {
    id: '234324',
    item: 'Leather Jackets box',
  },
];
const index = ({navigation}) => {
  const [pickupConfirmed, setPickupConfirmed] = useState(false);
  const [showNotificationAlert, setShowNotificationAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [cardStates, setCardStates] = useState({});

  const handleConfirmPickup = cardId => {
    setCardStates(prevState => ({
      ...prevState,
      [cardId]: !prevState[cardId] || false,
    }));

    const remainingCards = arrDummy.filter(card => !cardStates[card.id]);
    const remainingCardsLength = remainingCards.length;

    if (remainingCardsLength === 1 && cardId === remainingCards[0].id) {
      // when all packages are confirmed
      setSuccessAlert(true);
    } else {
      setShowNotificationAlert(true);
    }
  };
  // const FormText = ({ heading, description }) =>
  // (
  //     <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: 15, marginBottom: 5 }}>
  //         <CustomText size={12} style={{ color: color.textGrey, fontWeight: '500', width: '45%', }}>
  //             {heading}
  //         </CustomText>
  //         <CustomText size={12} style={{ color: color.appBlue, fontWeight: '600', width: '55%', }}>
  //             {description}
  //         </CustomText>
  //     </View>
  // )
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

  return (
    <Block>
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
          {arrDummy.map(obj => (
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
                    style={{color: color.white, fontWeight: '700'}}>
                    {obj.item}
                  </CustomText>
                  <CustomText
                    size={12}
                    style={{color: color.white, fontWeight: '500'}}>
                    ID : 8837373828
                  </CustomText>
                </View>
                <View
                  style={{height: 60, width: '35%', justifyContent: 'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      // setShowNotificationAlert(true)
                      // setPickupConfirmed(!pickupConfirmed)
                      handleConfirmPickup(obj.id);
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
                      style={{color: color.appBlue, fontWeight: '600'}}>
                      {cardStates[obj.id] ? 'Confirmed' : 'Confirm Pickup'}
                    </CustomText>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Card Body */}
              <View style={{marginVertical: 10}} />
              <FormText heading={'Article no. :'} description={'20'} />
              <FormText
                heading={'Package Content :'}
                description={'Lorem Ipsum, Lorem Ipsum'}
              />
              <FormText
                heading={'Package Dimensions :'}
                description={'14 L x 2 H x 20W'}
              />
              <FormText heading={'Receiver Name :'} description={'Abc Name'} />
              <FormText
                heading={'Delivery Navigate :'}
                description={'No75, Grand Lake,HDT45H,  sydney, Australia.'}
              />
              <View style={{marginBottom: 10}} />
            </View>
          ))}
        </ScrollView>
      </View>
    </Block>
  );
};

export default index;
