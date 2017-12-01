import * as React from 'react';

class TeamItem extends React.Component<CustomInterfaces.TeamInterface> {
    render() {
        const participants = this.props.members.map((val, ind) => (
            <div className="ks-user" key={'memb-' + ind}>
                <img className="ks-avatar" src="http://via.placeholder.com/110x110" width="45" height="45" />
            </div>
        ));
        return (
            <div className="card-block">
                {participants}
            </div>
        );
    }
}

export default TeamItem;