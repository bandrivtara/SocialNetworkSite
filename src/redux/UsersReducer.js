import {usersAPI} from '../API/API.js';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS='SET_USERS';
const SET_CURRENT_PAGE='SET_CURRENT_PAGE';
const SET_TOTAL_COUNT='SET_TOTAL_COUNT';
const TOOGLE_IS_FETCHING='TOOGLE_IS_FETCHING';
const TOOGLE_IS_FOLLOWING_PROGRESS='TOOGLE_IS_FOLLOWING_PROGRESS'; 


let initialState = {
    users: [],
    pageSize: 8,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgres: false
};

const UsersReducer = (state = initialState, action) => {

    switch(action.type) {
        case FOLLOW:
            return {
                ...state, 
                users: state.users.map(e => {
                    if(e.id === action.userId) {
                        return (
                            {...e, followed: true}
                        )
                    }
                    return e;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(e => {
                    if(e.id === action.userId) {
                        return (
                            {...e, followed: false}
                        )
                    }
                    return e;
                })
            }
        case SET_USERS: {
            return {...state, users: [...action.users]}
        }

        case SET_CURRENT_PAGE: {
            return {
                ...state, currentPage: action.currentPage
            }
        }

        case SET_TOTAL_COUNT: {
            return {
                ...state, totalUsersCount: action.totalCount
            }
        }
        case TOOGLE_IS_FETCHING: {
            return {
                ...state, isFetching: action.isFetching
            }
        }
        case TOOGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state, followingInProgress: action.isFetching
            }
        }

        default: 
            return state;
    }
}

export const followSuccess = (userId) => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalCount = (totalCount) => ({type: SET_TOTAL_COUNT, totalCount});
export const toggleIsFetching = (isFetching) => ({type: TOOGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (isFetching) => ({type: TOOGLE_IS_FOLLOWING_PROGRESS, isFetching});

export const getUsersThunkCreator = (pageSize, currentPage) => async (dispatch) => {
        dispatch(setCurrentPage(currentPage));
        dispatch(toggleIsFetching(true));
        let data = await usersAPI.getUsers(pageSize, currentPage);
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalCount(data.totalCount));
}
export const getUsersOnChange = (pageSize, pageNumber) => async (dispatch) => {
        dispatch(setCurrentPage(pageNumber));
        dispatch(toggleIsFetching(true));
        dispatch(setUsers([]));
        let data = await usersAPI.getUsers(pageSize, pageNumber);
        dispatch(setUsers(data.items));
        dispatch(toggleIsFetching(false));
}

export const follow = (userId) => async (dispatch) => {
        let data = await usersAPI.getUsersFollow(userId);
            if (data.resultCode === 0) {
                dispatch(followSuccess(userId));
            }
}
export const unfollow = (userId) => async (dispatch) => {
        let data = await usersAPI.getUsersUnfollow(userId);
            if (data.resultCode === 0) {
                dispatch(unfollowSuccess(userId));
            }
}

export default UsersReducer;