import React,{useState,useRef} from 'react';
import { View, Text ,FlatList,Animated} from 'react-native';
import {useSelector,useDispatch} from "react-redux";
import { QuestionItem } from '../components';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const Questions = (props) => {
    const dispatch=useDispatch()
    const questions=useSelector((state)=>state.questions)
    const listRef=useRef(null)
    const [currentIndex,setCurrentIndex]=useState(0)

    const renderList=({item})=>(
    <QuestionItem questionObject={item} 

    onAnswer={answer}
        
    />)

    const answer=(res)=>{
        dispatch({type:"SET_SCORE",payload:{isTrue:res}})
        const newindex=currentIndex+1
        setCurrentIndex(newindex)

        if (newindex >= questions.length){
            return props.navigation.navigate("Finish")
        }
        listRef.current.scrollToIndex({index:newindex})
    }
  
    return (
        <View style={{flex:1}}>

           <View style={{backgroundColor:"#3949ab",alignItems:"center",padding:20}}>
                <CountdownCircleTimer
                    isPlaying={true }
                    duration={20}
                    onComplete={()=>props.navigation.navigate("Finish")}
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

            <FlatList
            ref={listRef}
            data={questions}
            horizontal
            scrollEnabled={false}
            renderItem={renderList}
            keyExtractor={(_,index)=>index.toString()}
            />
        </View>
    )
}

export default Questions
