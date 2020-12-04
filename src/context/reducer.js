export const reducer=(state,action)=>{
    switch(action.type){
        case "SET_QUESTIONS":
            state.questions=action.payload.questions
            return {...state}
        case "SET_SCORE":
           state.score=action.payload.isTrue? state.score+1 : state.score
           return {...state}
        default:
            return state

    }
}