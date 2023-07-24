import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Block from '../../components/Block'
import CustomText from '../../components/CustomText'
import { color } from '../../utils/colors'
import Coins from '../../asset/svgIcons/coins.svg'

const index = () => {
  return (
    <Block>
      {/* earning header */}
      <View style={{ backgroundColor: color.appBlue, height: 180, width: '100%', borderBottomRightRadius: 28, borderBottomLeftRadius: 28 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <CustomText size={27} style={{ fontWeight: '600', color: color.white, marginLeft: 32 }}>
            My Earnings
          </CustomText>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 12, height: 24, backgroundColor: '#345570', paddingHorizontal: 10, marginRight: 30 }}>
            <Coins />
            <CustomText size={17} style={{ fontWeight: '600', color: color.white, marginLeft: 8 }}>
              2500
            </CustomText>
          </View>
        </View>
      </View>
      {/* header cards */}
      <View style={{ height: 200,width:'100%', top:50,position:'absolute',alignItems:'center',justifyContent:'center'}}>
        <View style={{ height: 150, backgroundColor: color.appLightBlue, width: '60%' ,borderRadius:12}} />
        <View style={{ height: 150, backgroundColor: 'green', width: '70%' ,borderRadius:12,position:'absolute',top:46,zIndex:2}} />
        <View style={{ height: 150, backgroundColor: 'pink', width: '80%' ,borderRadius:12,position:'absolute',top:72,zIndex:2}} >
          </View>
      </View>

    </Block>
  )
}

export default index