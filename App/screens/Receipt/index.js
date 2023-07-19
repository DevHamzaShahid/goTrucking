import { View, Text, ImageBackground, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Block from '../../components/Block'
import Receipt from '../../asset/svgs/receiptBlock'
import NoPicSelected from '../../asset/svgs/TakePicture'
import CustomButton from '../../components/CustomButton'
import { color } from '../../utils/colors'
import MultipleImagePicker from '../../components/MultipleImagePicker'
const index = () => {
    const [isImageSelected, setIsImageSelected] = useState(true);

    return (
        <Block>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 50 }}>
                    {isImageSelected&&<NoPicSelected />}
                    <MultipleImagePicker setIsImageSelected={setIsImageSelected}/>
                </View>
            </ScrollView>
        </Block>
    )
}

export default index