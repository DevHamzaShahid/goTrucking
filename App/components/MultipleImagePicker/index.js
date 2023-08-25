import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View, Modal, ActivityIndicator, Platform } from "react-native";
import ImageCropPicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { color } from "../../utils/colors";
import CustomButton from "../CustomButton";
import { dimensions } from "../../Dimensions";
import DeliveredAlert from '../../components/deliveredAlert'
import { UploadMultipleImages } from "../../redux/actions/UploadMultipleImages";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UploadImagesPath } from "../../redux/actions/confirmDeliveryDeparturee";
import CustomActivityIndicator from "../CustomLoader";
import { route } from "../../Routes";

const MultipleImagePicker = ({ setIsImageSelected }) => {
    const dispatch = useDispatch()
    const parameter = useRoute();
    const navigation = useNavigation()
    const param = parameter?.params;

    console.log("hehehhehehhehehhe", param);
    const [imageList, setImageList] = useState([])
    const [isModalVisible, setModalVisible] = useState(false);
    const [reFresh, setRefresh] = useState(0);
    const [activeLoader, setActiveLoader] = useState(false)
    const [hideSlctBtnWhileUploading, setHideSlctBtnWhileUploading] = useState(false)
    const [delivered, setDelivered] = useState(false)
    const [showDeliveredAlert, setShowDeliveredAlert] = useState(false)
    const [sendPhotosPath, setSendPhotosPath] = useState(false)

    const truckingState = useSelector(state => state);
    //get Upoloaded delivery photos path
    const { data: uploadedPhotosPath } =
        truckingState?.uploadedMultipleImages || [];
    const { loading: RawPhotosLoader } =
        truckingState?.uploadedMultipleImages || {};
    const photo = uploadedPhotosPath


    //get response of those paths are uploaded
    const { data: uploadedPhotosPathResponse } =
        truckingState?.uploadIMagesPath || [];
    const { loading: RawPhotosresponseLoader } =
        truckingState?.uploadIMagesPath || {};
    const photoresponse = uploadedPhotosPathResponse
    console.log("photoresponse?.messagephotoresponse?.messagephotoresponse?.message", photoresponse?.message);
    useEffect(() => {
        (async () => {
            if (sendPhotosPath && photo?.paths) {
                await dispatch(UploadImagesPath({ ...param, photoPaths: photo?.paths }))
                // setSendPhotosPath(true)//to awake next useeffect
            }
        })()

        
    }, [photo?.paths, photoresponse?.message, sendPhotosPath])

    useEffect(() => {
        if (sendPhotosPath && photoresponse?.message) {
            setSendPhotosPath(false)
            setDelivered(true)
            setTimeout(() => {
                navigation.navigate(route.MyRoutes)
            }, 1000)
            
                setImageList([])
                setDelivered(false)
                setSendPhotosPath(false)
            
        }
    }, [photoresponse?.message, photo?.paths, sendPhotosPath])


    const openPicker = () => {
        ImageCropPicker.openPicker({
            waitAnimationEnd: false,
            multiple: true,
            includeExif: true,
            forceJpg: true,
            compressImageQuality: 0.8,
            maxFiles: 5,
            mediaType: 'any',
            includeBase64: true
        }).then(images => {
            setModalVisible(false);
            const newImages = images.map(image => ({
                id: "" + Math.random(),
                uri: image.sourceURL,
                name: image.filename,
                type: image.mime,
                path: image.path
            }));
            setImageList(prevImages => [...prevImages, ...newImages]);
            setIsImageSelected(false)
        }).catch(error => {
            setModalVisible(false);
            alert(error.message);
        });
    }
    const openCamera = () => {
        ImageCropPicker.openCamera(
            {
                mediaType: 'photo',
                cropping: true
            }).then(image => {
                let imageListss = []
                const imagePath = "/private/var/mobile/Containers/Data/Application/81FFFDBE-7D91-4673-9289-4A9A6A327FBE/tmp/react-native-image-crop-picker/0180B877-E2C6-4271-BF30-58DA60CC3B12.jpg";
                const imageUri = imagePath;
                imageListss.push({
                    id: "" + Math.random(),
                    uri: image.path,
                    name: image.path.substring(image.path.lastIndexOf('/') + 1),
                    type: image.mime,
                    path: image.path
                })
                setImageList(prevImages => [...prevImages, ...imageListss]);
                setIsImageSelected(false)
            }).catch((e) => {
                alert(e)
            })
    }
    // const imagesource = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
    const removeImage = (index) => {
        const newArray = [...imageList]; // create a new copy of the array
        newArray.splice(index, 1); // remove the item at the given index
        setImageList(newArray); // set the state using the new array
    }
    const uploadPhotoHandler = async () => {
        // setActiveLoader(true)
        // setHideSlctBtnWhileUploading(true)
        if (imageList != null) {
            try {
                var formdata = new FormData();
                imageList.map((item) => {
                    formdata.append('image', {
                        uri: item.uri,
                        name: item.name,
                        type: item.type,
                    });
                })
                //uploading multiple selected images
                await dispatch(UploadMultipleImages(formdata));
                setSendPhotosPath(true)
            } catch (error) {
                alert(error)
            }
        }

    };
    // check if image is selected or not then show the selected images or the default static imagesvg
    useEffect(() => {
        if (imageList?.length > 0) {
            setIsImageSelected(false)
        }
        else {
            setIsImageSelected(true)
        }
    }, [imageList])
    return (
        <>
            <View style={{ flexDirection: 'row', }}>
                {(RawPhotosLoader || RawPhotosresponseLoader) && <CustomActivityIndicator />}
                <ScrollView>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center' }}>
                        {
                            imageList.map((item, index) =>
                            (
                                <View style={{ shadowColor: 'red', marginHorizontal: 5, marginVertical: 5, alignSelf: 'center', paddingVertical: 8, backgroundColor: color.appYellow, borderRadius: 10 }}>
                                    <TouchableOpacity onPress={() => removeImage(index)} style={{ position: 'absolute', zIndex: 2, alignItems: 'center', justifyContent: "center", height: 25, width: 25, backgroundColor: 'red', borderRadius: 15 }}>
                                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                            —
                                        </Text>
                                    </TouchableOpacity>
                                    <Image source={{ uri: item.path }} resizeMode='cover' style={{ height: 120, width: dimensions / 2 * 0.23, margin: 12, borderRadius: 7 }} />
                                </View>
                            )
                            )
                        }
                    </View>
                </ScrollView>
            </View>
            {showDeliveredAlert && <DeliveredAlert setShowDeliveredAlert={setShowDeliveredAlert} />}
            <CustomButton title={'Take a Picture'} onPress={openCamera} buttonStyle={{ marginVertical: 20, backgroundColor: color.appLightBlue, height: 50, width: '70%', borderRadius: 50 }} textStyle={{ color: color.white, fontSize: 19, fontWeight: '500' }} />
            <CustomButton title={'Choose a Picture'} onPress={openPicker} buttonStyle={{ backgroundColor: color.white, height: 50, width: '70%', borderRadius: 50, borderWidth: 2, borderColor: color.appBlue }} textStyle={{ color: color.appBlue, fontSize: 19, fontWeight: '500' }} />
            <CustomButton title={delivered ? 'Delivered' : "Deliver"} onPress={() => {
                if (!delivered) {
                    if (imageList?.length == 0) {
                        alert('please select image to deliver')
                    }
                    else if (imageList?.length > 5) {
                        alert('Choose only 5 images')
                    }
                    else {
                        // setDelivered(!delivered), setShowDeliveredAlert(true)
                        uploadPhotoHandler()
                    }
                } else {
                    alert("already delivered")
                }
            }} buttonStyle={{ marginVertical: 20, backgroundColor: (delivered ? color.appBlue : color.white), height: 50, width: '70%', borderRadius: 50, borderWidth: 2, borderColor: color.appBlue }} textStyle={{ color: (delivered ? color.white : color.appBlue), fontSize: 19, fontWeight: '500' }} />
            {/* <TouchableOpacity onPress={() => openPicker() } style={{ backgroundColor: color.app_green, height: 50, width: '80%', borderColor: '#000', borderWidth: 1, borderRadius: 5, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', }}>
                <Text style={{ color: 'red', fontWeight: 'bold' }}>
                    Select Images
                </Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity onPress={() => {
                if (imageList.length != 0) {
                    if (imageList.length > 5) {
                        alert('you can upload maximum 5 images, remove the extra ones')
                    } else {
                        uploadPhotoHandler()
                    }
                }
                else {
                    alert('Please select atleast one image')
                }
            }} style={{ backgroundColor: color.app_green, height: 50, width: '80%', borderColor: '#000', borderWidth: 1, borderRadius: 5, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 20 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                    Upload
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => callOnDeliveredHandler()} style={{ backgroundColor: color.app_green, height: 50, width: '80%', borderColor: '#000', borderWidth: 1, borderRadius: 5, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 20 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                    Confirm
                </Text>
            </TouchableOpacity> */}
            {/* {!uploaded && activeLoader && <ActivityIndicator />} */}
            {/* <Modal transparent={true} style={{ height: 300 }} animationType="slide" visible={isModalVisible}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <View style={{ width: 70, height: 100, backgroundColor: '#D7F6EF', borderTopLeftRadius: 10, borderTopRightRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Icon name="image" onPress={() => { openPicker() }} size={50} color={color.app_green} />
                        <Icon name="camera" onPress={openCamera} size={50} color={color.app_green} />
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal> */}
        </>
    )
}
export default MultipleImagePicker