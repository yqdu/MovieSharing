import React from 'react';


class ProfilePhoto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            portrait: this.props.portrait
        }

        console.log(this.props.portrait)
    }
    render() {
        return (
            <div id="profilephoto">
                <div className="card card-default">
                    <div className="card-body">
                        <div align="center">
                            <div >
                                <img className="img-thumbnail img-responsive" src={`../profilepictures/`+this.state.portrait} width="300px" height="300px"></img>
                            </div>
                            <br></br>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProfilePhoto;