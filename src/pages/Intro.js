import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import axios from "axios"
import { CategorySelectModal } from '../components';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { useDispatch } from "react-redux";
import { introPage } from "./styles"



const Intro = (props) => {
    const dispatch = useDispatch()
    const [modalFlag, setModalFlag] = useState(false);
    const [counterFlag, setCounterFlag] = useState(false)
    ////
    const selectCategory = (selectedCategoryId) => {
        // `https://opentdb.com/api.php?amount=10&category=${selectedCategoryId}&type=boolean`
        axios.get(`https://opentdb.com/api.php?`, {
            params: {
                amount: 10,
                category: selectedCategoryId,
                type: "boolean",

            }
        }).then(res => {
            const { data: { results: questions } } = res

            dispatch({ type: "SET_QUESTIONS", payload: { questions } })
        })


        setModalFlag(false)
        setCounterFlag(true)

    }


 
    ///
    return (
        <View style={{ flex: 1 }}>

            <View style={{ flex: 1 }}>

                <View style={introPage.container}>
                    <Text style={introPage.bannerText}>Trivia</Text>
                </View>

            <View style={{backgroundColor:"#3949ab",alignItems:"center"}}>
                <CountdownCircleTimer
                    isPlaying={counterFlag }
                    duration={5}
                    onComplete={()=>props.navigation.navigate("Questions")}
                    colors={[
                        ['#fff176', 0.4],
                        ['#ba68c8', 0.4],
                        ['#ff8a65', 0.2],
                    ]}
                >
                    {({ remainingTime, animatedColor }) => (
                        <Animated.Text style={{fontSize:60, color: animatedColor }}>
                            {remainingTime}
                        </Animated.Text>
                    )}
                </CountdownCircleTimer>
            </View>




                <View style={introPage.container}>
                    <TouchableOpacity onPress={() => setModalFlag(true)} style={introPage.buttonContainer}>
                        <Text style={introPage.buttonText}>Start</Text>
                    </TouchableOpacity>
                </View>
                <CategorySelectModal
                    visibility={modalFlag}
                    onClose={() => setModalFlag(false)}
                    selectCategory={selectCategory}
                />

            </View>


        </View>
    )
}

export default Intro
