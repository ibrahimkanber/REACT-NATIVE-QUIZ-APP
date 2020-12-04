import React from 'react'
import { View, Text } from 'react-native'
import {finishPage} from "./styles"
import {useSelector}  from "react-redux"
const Finish = (props) => {
    const score=useSelector(data=>data.score)
    return (
        <View style={finishPage.container}>
            <Text style={finishPage.text}>Your score is {score}</Text>
        </View>
    )
}

export  {Finish}
