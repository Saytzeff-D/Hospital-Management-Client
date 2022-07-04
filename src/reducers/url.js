const initstate={
//  url = 'https://hospital-software-server.herokuapp.com/'
   url:'http://localhost:4000/',
   staffDetails:{}   
}

const myReducer=(state=initstate,action)=>{

   if(action.type=='setStaff'){

      let value=action.payload
      let newstate={...state,staffDetails:value}
      return newstate
   }


return state;
}

export default myReducer