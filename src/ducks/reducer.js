
const initialState = {
  username: '',
  id: 0,
  profile_pic: ''
};

const GET_USER_INFO = 'GET_USER_INFO';

export const getUserInfo = (userInfo) => {
  return {
    type: GET_USER_INFO,
    payload: userInfo
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_USER_INFO:
      return Object.assign({}, state, {username: action.payload.username})
    default:
      return state;
  }
}


export default reducer;
