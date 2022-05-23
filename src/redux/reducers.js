

const reducers=(state=[],action={})=>{
    switch(action.type){

        case 'Fetch_Api':
            return {
                ...state, 
                state:action.payload
            }

        default: return state ;       
    }
}
export default reducers;