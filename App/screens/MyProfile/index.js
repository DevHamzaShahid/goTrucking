import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import CustomText from '../../components/CustomText';
import Block from '../../components/Block';
import RoundTop from '../../asset/svgs/Round top.svg';
import ProfileImage from '../../asset/svgs/ProfileImagee.svg';
import { color } from '../../utils/colors';
import RatingStars from '../../components/RatingStars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { route } from '../../Routes';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../redux/actions/auth';
import { useIsFocused } from '@react-navigation/native';
import CustomActivityIndicator from '../../components/CustomLoader';
import { resetDirectionLineState } from '../../redux/actions/getDirectionLine';
import AsyncStorage from '@react-native-async-storage/async-storage';

const arrDummy = [
  {
    id: '12',
    iconName: 'car',
    heading: 'ID Card',
    description: 'Verifications',
    rightIcon: 'arrow-right',
  },
  {
    id: '123',
    iconName: 'card',
    heading: 'fdsfdsfgs',
    description: 'dcsfcsds',
    rightIcon: 'arrow-right',
  },
  {
    id: '124',
    iconName: 'pencil',
    heading: 'Responsible Service Alcohol',
    description: 'Responsible Service Alcohol',
    rightIcon: 'arrow-right',
  },
  {
    id: '125',
    iconName: 'bucket',
    heading: 'Responsible Service Alcohol',
    description: 'Responsible Service Alcohol',
    rightIcon: 'arrow-right',
  },
  {
    id: 'signout',
    iconName: 'logout',
    heading: 'Logout',
    description: 'Logout',
    rightIcon: 'arrow-right',
  },
];
const index = ({ navigation }) => {
  const rating = 4;

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  useEffect(() => {
    dispatch(getProfile());
  }, [isFocused]);

  //selectors
  // get profile
  const ProfileData = useSelector(profile => profile);
  const {
    fullName,
    email,
    city,
    profilePhoto,
    firstName,
    lastName,
    mobileNumber,
  } = ProfileData?.getProfile.data || {};
  const { loading: getProfileLoader } = ProfileData?.getProfile || {};
  return (
    <Block>
      {getProfileLoader && <CustomActivityIndicator />}
      {/* nav header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          zIndex: 2,
          top: 50,
          width: '100%',
        }}>
        {/* ignoring icon for now, no use of that */}
        {/* <Icon
          name="arrow-left"
          size={30}
          color={color.white}
          style={{marginLeft: 20}}
        /> */}
        <View />

        <TouchableOpacity
          onPress={() => navigation.navigate(route.EditProfile)}>
          <Icon
            name="pencil"
            size={30}
            color={color.white}
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      </View>

      {/*Profile header */}
      <View>
        <RoundTop width={'100%'} style={{ marginTop: -160 }} />
        <TouchableOpacity
          style={{
            alignItems: 'center',
            height: 152,
            width: 152,
            borderRadius: 80,
            backgroundColor: color.white,
            justifyContent: 'center',
            position: 'absolute',
            top: 120,
            left: -20,
          }} onPress={()=>navigation.navigate(route.EditProfile)}>
          {/* <ProfileImage height={150} width={150} /> */}
          <Image
            source={{ uri: profilePhoto }}
            height={150}
            width={150}
            style={{ borderRadius: 100 }}
          />
        </TouchableOpacity>
        <View style={{ position: 'absolute', top: 130, left: 150 }}>
          <CustomText size={32} style={{ fontWeight: '700', color: color.white }}>
            {fullName}
          </CustomText>
          <CustomText size={16} style={{ fontWeight: '400', color: color.white }}>
            {email}
          </CustomText>
          <CustomText size={15} style={{ fontWeight: '400', color: color.white }}>
            {mobileNumber}
          </CustomText>
          <RatingStars rating={rating} />
        </View>
      </View>

      {/* Body */}
      <ScrollView>
        <View style={{ width: '80%', alignSelf: 'center', marginVertical: 50 }}>
          {arrDummy?.map(item => (
            <View
              style={{
                flexDirection: 'row',
                height: 60,
                alignItems: 'center',
                borderBottomColor: color.textGrey,
                borderBottomWidth: 1,
              }}>
              <View style={{ width: '20%', height: 30, alignItems: 'center' }}>
                <Icon name={item.iconName} color={color.appBlue} size={30} />
              </View>
              <View style={{ width: '70%', height: 60, justifyContent: 'center' }}>
                <CustomText
                  size={13}
                  style={{ fontWeight: '600', color: color.appBlue }}>
                  {item.heading}
                </CustomText>
                <CustomText
                  size={10}
                  style={{ fontWeight: '500', color: color.textGrey }}>
                  {item.description}
                </CustomText>
              </View>
              <View style={{ width: '10%', height: 60, justifyContent: 'center' }}>
                <Icon onPress={async() => {
                  if (item.description=='Logout') {
                    dispatch({ type: 'USER_TOKEN', payload: null });
                    dispatch(resetDirectionLineState());
                    await AsyncStorage.removeItem('alertShown');
                  }
                }} name={item.rightIcon} color={color.appBlue} size={30} />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </Block>
  );
};

export default index;
