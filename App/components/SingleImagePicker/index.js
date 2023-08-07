import {useEffect, useState} from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';

const MultipleImagePicker = ({
  setImageSelected,
  setShowPicker,
  pickerType,
  setShowImagePickerModal
}) => {
  const [imageList, setImageList] = useState([]);
  const [reFresh, setRefresh] = useState(0);

  const openPicker = () => {
    ImageCropPicker.openPicker({
      waitAnimationEnd: false,
      multiple: false,
      includeExif: true,
      forceJpg: true,
      compressImageQuality: 0.8,
      maxFiles: 1,
      mediaType: 'image',
      includeBase64: true,
    })
      .then(image => {
        const newImage = {
          id: '' + Math.random(),
          uri: image.sourceURL,
          name: image.filename,
          type: image.mime,
          path: image.path,
        };
        setImageSelected(newImage);
        setShowPicker(false);
      })
      .catch(error => {
        alert(error.message);
      });
  };
  useEffect(() => {
    if (pickerType == 'camera') {
      openCamera();
      setShowPicker(false);
    } else {
      openPicker();
      setShowPicker(false);
    }
    setShowImagePickerModal(false)
  }, []);
  const openCamera = () => {
    ImageCropPicker.openCamera({
      mediaType: 'photo',
      cropping: true,
    })
      .then(image => {
        const newImage = {
          id: '' + Math.random(),
          uri: image.path,
          name: image.path.substring(image.path.lastIndexOf('/') + 1),
          type: image.mime,
          path: image.path,
        };
        setImageSelected(newImage);
        setShowPicker(false);
      })
      .catch(error => {
        alert(error.message);
      });
  };

  const uploadPhotoHandler = async () => {
    if (imageList != null) {
      var formdata = new FormData();
      imageList.map(item => {
        formdata.append('image', {
          uri: item.uri,
          name: item.name,
          type: item.type,
        });
      });
      //uploading multiple selected images
      await dispatch(UploadOrderMultipleImageAction(formdata));
      setRefresh(reFresh + 2);
    }
  };
  // check if image is selected or not then show the selected images or the default static imagesvg

  return (
    <>
      {/* <View style={{flexDirection: 'row'}}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignSelf: 'center',
            }}>
            {imageList.map((item, index) => (
              <View
                style={{
                  shadowColor: 'red',
                  marginHorizontal: 5,
                  marginVertical: 5,
                  alignSelf: 'center',
                  paddingVertical: 8,
                  backgroundColor: color.appYellow,
                  borderRadius: 10,
                }}>
                <TouchableOpacity
                  onPress={() => removeImage(index)}
                  style={{
                    position: 'absolute',
                    zIndex: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 25,
                    width: 25,
                    backgroundColor: 'red',
                    borderRadius: 15,
                  }}>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>—</Text>
                </TouchableOpacity>
                <Image
                  source={{uri: item.path}}
                  resizeMode="cover"
                  style={{
                    height: 120,
                    width: (dimensions / 2) * 0.23,
                    margin: 12,
                    borderRadius: 7,
                  }}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View> */}
      {/* {showDeliveredAlert && (
        <DeliveredAlert setShowDeliveredAlert={setShowDeliveredAlert} />
      )}
      <CustomButton
        title={'Take a Picture'}
        onPress={openCamera}
        buttonStyle={{
          marginVertical: 20,
          backgroundColor: color.appLightBlue,
          height: 50,
          width: '70%',
          borderRadius: 50,
        }}
        textStyle={{color: color.white, fontSize: 19, fontWeight: '500'}}
      />
      <CustomButton
        title={'Choose a Picture'}
        onPress={openPicker}
        buttonStyle={{
          backgroundColor: color.white,
          height: 50,
          width: '70%',
          borderRadius: 50,
          borderWidth: 2,
          borderColor: color.appBlue,
        }}
        textStyle={{color: color.appBlue, fontSize: 19, fontWeight: '500'}}
      />
       */}
    </>
  );
};
export default MultipleImagePicker;
