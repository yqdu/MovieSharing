import React from 'react';
import TopBar from './TopBar.jsx';
import BasicInfo from './BasicInfo.jsx';
import UserLists from './UserLists';
import '../style/css/UserAccount.css';

class UserAccount extends React.Component {
    render() {
        return (
            <div>           
                <TopBar />
                <BasicInfo />
                <UserLists />
            </div>
        )
    }
}
export default UserAccount;