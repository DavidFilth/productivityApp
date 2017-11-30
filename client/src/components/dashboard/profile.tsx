import * as React from 'react';

export interface ProfileProps {
    profile: {
        lastName: string;
        firstName: string;
    };
    company: {
        name: string;
    };
    notifications: Array<{}>;
}

class Profile extends React.Component<ProfileProps> {

    render() {
        return (
            <div>
                <div 
                    className="card panel panel-default ks-solid ks-widget ks-widget-info"
                >
                    <div className="ks-user1"><p>&nbsp;</p></div>
                    <div className="ks-user">
                        <img 
                            className="ks-avatar1" 
                            src="http://via.placeholder.com/80x77" 
                            width="100" 
                            height="100" 
                        />
                        <div className="ks-info">
                            <div className="ks-name">
                                {this.props.profile.firstName + ' ' + this.props.profile.lastName}
                            </div>
                            <div className="ks-description">
                                {this.props.company.name}
                            </div>
                        </div>
                    </div>
                    <div className="card-block1">
                        <div className="ks-item">
                            <span className="fig">{this.props.notifications.length}</span>
                            <span className="title">Notifications</span>
                        </div>
                    </div>
                </div>
            </div>  
        );
    }
}

export default Profile;