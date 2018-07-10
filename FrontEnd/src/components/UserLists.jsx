import React from 'react';
import Watched from './WatchedList';
import Wish from './WishList';
import ReceivedMessage from './ReceivedMessage';

class UserLists extends React.Component {
    render() {
        return (
            <div className="panel with-nav-tabs panel-default">
            <div className="panel-heading">
                    <ul className="nav nav-tabs">
                        <li className="active"><a href="#tab1default" data-toggle="tab">Wish List</a></li>
                        <li><a href="#tab2default" data-toggle="tab">Watched List</a></li>
                        <li><a href="#tab3default" data-toggle="tab">Received Messages</a></li>                        
                    </ul>
            </div>
            <div className="panel-body">
                <div className="tab-content">
                    <div className="tab-pane fade in active" id="tab1default">
                        <Wish />
                    </div>
                    <div className="tab-pane fade" id="tab2default">
                        <Watched />
                    </div>
                    <div className="tab-pane fade" id="tab3default">
                        <ReceivedMessage />
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default UserLists;