import React from 'react';
import classes from './Users.module.css';

import Paginator from '../common/Paginator/Paginator';
import User from './User/User';

const Users = (props) => {

    return (
        <div className={classes.users_box}>
            {props.users.map(user =>
                <User key={user.id} user={user} follow={props.follow} unfollow={props.unfollow} />
            )}
            <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                totalUsersCount={props.totalUsersCount} pageSize={props.pageSize}
            />
        </div>
    )
}

export default Users;