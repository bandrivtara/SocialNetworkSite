import {usersAPI, profileAPI} from '../API/API'

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS_PROFILE = 'SET_STATUS_PROFILE';


let initialState = {
        postData: [
            {id: 1, message: "How are u?", likesCount: 12},
            {id: 2, message: "It's my second post", likesCount: 15},
            {id: 3, message: "It's my first post?", likesCount: 1},
        ],
        profile: {
            photos: {
                
            }
        },
        status: ''
};


const profileReducer = (state = initialState, action) => {

    

    switch(action.type) {
        case ADD_POST: {
            return {...state, 
                postData: [...state.postData, {
                    message: action.text, 
                    id:5, 
                    likesCount: 45
                }] 
            };
            
        }
        case SET_USER_PROFILE: {
            return (
                {...state, profile: action.profile}
            )
        }
        case SET_STATUS_PROFILE: {
            return (
                {...state, status: action.status}
            )
        }

        default: 
            return state;
    }
}


export const addPostActionCreator = (text) => {
    
    return {
      type: ADD_POST,
      text
    }
}
export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}
export const setStatusProfile = (status) => {
    return {
        type: SET_STATUS_PROFILE,
        status
    }
}

export const showUserProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.getUserProfile(userId);
    dispatch(setUserProfile(response));   
}
export const getStatusProfile = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatusProfile(userId);
    dispatch(setStatusProfile(response)); 
}
export const updateStatusProfile = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatusProfile(status);
        if (response.resultCode === 0){
            dispatch(setStatusProfile(status));
        }
}

export default profileReducer;