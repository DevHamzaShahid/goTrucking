import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { AuthStack } from '../AuthStack';
import { MyTabs } from '../BottomTabs';

const index = () => {
    // const[token,setToken]=useState('')
    const AUTH_TOKEN = useSelector(state => state?.userToken?.token);
    // useEffect(() => {
    //   console.log("Auth token", AUTH_TOKEN);
    //   setToken(AUTH_TOKEN)
    // }, [store.getState().userToken?.token])
    // useEffect(() => {
    //   console.log("tokenLLLLLLLL",token);
    // }, [token])
  return (
  AUTH_TOKEN?<MyTabs/>:<AuthStack/>
  )
}

export default index