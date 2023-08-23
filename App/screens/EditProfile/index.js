import { View, TouchableOpacity, Image, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import Block from '../../components/Block';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../../utils/colors';
import CustomText from '../../components/CustomText';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import SingleImagePicker from '../../components/SingleImagePicker';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile, uploadPhoto } from '../../redux/actions/auth';
import { useNavigation } from '@react-navigation/native';
import CustomActivityIndicator from '../../components/CustomLoader';
import polyline from '@mapbox/polyline';
import axios from 'axios';
import { GoogleMapKey } from '../../utils/keys';
import { dimensions, dimensionsWidth } from '../../Dimensions';
const defaultImage =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

const index = () => {
  //   const startLatitude = 31.5497;
  //   const startLongitude = 74.3436;
  //   const endLatitude = 32.1877;
  //   const endLongitude = 74.1945;
  //   const apiKey = GoogleMapKey;

  //   const handleOpenGoogleMaps = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://maps.googleapis.com/maps/api/directions/json?origin=${startLatitude},${startLongitude}&destination=${endLatitude},${endLongitude}&alternatives=false&key=${apiKey}`,
  //       );

  //       const encodedPolyline = response.data.routes[0].overview_polyline.points;
  //       const decodedPolyline = polyline.decode(encodedPolyline);
  //       const waypoints = decodedPolyline
  //         .map(point => `${point[0]},${point[1]}`)
  //         .join('|');

  //       const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&dir_action=navigate&destination=${endLatitude},${endLongitude}&waypoints=${waypoints}`;

  //       Linking.canOpenURL(googleMapsUrl).then(supported => {
  //         if (supported) {
  //           Linking.openURL(googleMapsUrl);
  //         } else {
  //           console.log('Cannot open Google Maps.');
  //         }
  //       });
  //     } catch (error) {
  //       console.error('Error fetching directions:', error);
  //     }
  //   };

  //selectors
  // get profile
  const Profile = useSelector(profile => profile);
  const { fullName, email, address, city, state, mobileNumber, profilePhoto } =
    Profile?.getProfile.data || {};
  const { loading: getProfileLoader } = Profile?.getProfile || {};
  // update Profile
  const { loading: updateProfileLoader } = Profile?.updateProfile || {};
  const [inputData, setInputData] = useState({
    fullName: fullName || '',
    email: email || '',
    address: address || '',
    city: city || '',
    state: state || '',
    mobileNumber: mobileNumber || '',
  });
  //uploadphoto
  const { loading: uploadPhotoLoader } = Profile?.uploadPhoto || {};
  const { path: updatedResponseImage } = Profile?.uploadPhoto?.data || {};

  //states
  const [showPicker, setShowPicker] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const [showImagePickerModal, setShowImagePickerModal] = useState(false);
  const [pickerType, setPickerType] = useState('');
  const [dataFetched, setDataFetched] = useState(false);
  console.log("image selected", imageSelected);
  const dispatch = useDispatch();

  // onClick Save button
  const handleSave = async () => {
    dispatch(updateProfile(inputData));
    const formData = new FormData();
    formData.append('image', imageSelected);
    dispatch(uploadPhoto(formData));
  };

  useEffect(() => {
    if (!dataFetched) {
      dispatch(getProfile());
      setDataFetched(true);
    }
  }, [Profile]);

  // will call when photo is uploaded
  useEffect(() => {
    dispatch(updateProfile({ profilePhoto: updatedResponseImage }));
  }, [updatedResponseImage]);

  useEffect(() => {
    setInputData({
      fullName: fullName || '',
      email: email || '',
      address: address || '',
      city: city || '',
      state: state || '',
      mobileNumber: mobileNumber || '',
    });
  }, [fullName, email, address, city, state, mobileNumber]);

  const getImageSource = () => {
    if (imageSelected) {
      return imageSelected?.path;
    }
    if (profilePhoto) {
      return profilePhoto;
    }
    return defaultImage;
  };

  return (
    <Block>
      {(getProfileLoader || updateProfileLoader || uploadPhotoLoader) && (
        <CustomActivityIndicator />
      )}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: 45,
        }}>
        <TouchableOpacity
          style={{ position: 'absolute', zIndex: 2, top: 10, right: 2 }}
          onPress={() => setShowImagePickerModal(true)}>
          <Icon name="camera" size={24} color={color.textGrey} />
        </TouchableOpacity>
        <Image
          source={{
            uri: getImageSource(),
          }}
          style={{ height: 110, width: 110, borderRadius: 70 }}
          resizeMode="cover"
        />
      </View>
      <CustomText
        size={23}
        style={{ fontWeight: '700', alignSelf: 'center', marginBottom: 40 }}>
        {inputData.fullName}
      </CustomText>
      <View style={{ alignSelf: 'center' }}>
        <CustomTextInput
          placeholder="Enter your name"
          ContainerStyle={{ width: '70%', height: 40 }}
          rightIcon={'pencil'}
          value={inputData.fullName}
          onChangeText={text => setInputData({ ...inputData, fullName: text })}
        />
        <CustomTextInput
          placeholder="Enter your email"
          ContainerStyle={{ width: '70%', height: 40 }}
          rightIcon={'pencil'}
          value={inputData.email}
          onChangeText={text => setInputData({ ...inputData, email: text })}
        />
        <CustomTextInput
          placeholder="Enter your phone number"
          ContainerStyle={{ width: '70%', height: 40 }}
          rightIcon={'pencil'}
          value={inputData.mobileNumber}
          onChangeText={text =>
            setInputData({ ...inputData, mobileNumber: text })
          }
        />
        <CustomTextInput
          placeholder="Enter your address"
          ContainerStyle={{ width: '70%', height: 40 }}
          rightIcon={'pencil'}
          value={inputData.address}
          onChangeText={text => setInputData({ ...inputData, address: text })}
        />
      </View>
      <CustomButton
        title={'Save'}
        onPress={handleSave}
        buttonStyle={{
          height: 50,
          width: '55%',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          backgroundColor: color.appBlue,
          borderRadius: 50,
          position: 'absolute',
          bottom: 50,
        }}
        textStyle={{ color: color.white, fontWeight: '500', fontSize: 21 }}
      />
      {showImagePickerModal && (
        <View style={{ position: 'absolute', zIndex: 999, height: dimensions, width: dimensionsWidth, backgroundColor: 'rgba(255,255,255,0.7)' }}>
          <View
            style={{
              backgroundColor: color.white,
              width: '70%',
              height: 300,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              position: 'absolute',
              zIndex: 999,
              borderWidth: 1,
              borderRadius: 25,
              top: dimensions / 5,
              alignSelf: 'center',
              shadowColor: color.appBlue,
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.44,
              shadowRadius: 10.32,

              elevation: 16,
            }}>
            <Icon
              name="close"
              size={30}
              onPress={() => setShowImagePickerModal(false)}
              style={{ position: 'absolute', top: 20, right: 20 }}
            />
            <CustomButton
              title={'Take a Picture'}
              onPress={() => {
                setPickerType('camera');
                setShowPicker(true);
              }}
              buttonStyle={{
                marginVertical: 20,
                backgroundColor: color.appLightBlue,
                height: 45,
                width: '80%',
                borderRadius: 50,
              }}
              textStyle={{ color: color.white, fontSize: 16, fontWeight: '500' }}
            />
            <CustomButton
              title={'Choose a Picture'}
              onPress={() => {
                setPickerType('gallery');
                setShowPicker(true);
              }}
              buttonStyle={{
                backgroundColor: color.white,
                height: 45,
                width: '80%',
                borderRadius: 50,
                borderWidth: 2,
                borderColor: color.appBlue,
              }}
              textStyle={{ color: color.appBlue, fontSize: 16, fontWeight: '500' }}
            />
          </View>
        </View>
      )}
      {showPicker && (
        <SingleImagePicker
          setImageSelected={setImageSelected}
          setShowPicker={setShowPicker}
          pickerType={pickerType}
          setShowImagePickerModal={setShowImagePickerModal}
        />
      )}
    </Block>
  );
};

export default index;
