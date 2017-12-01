import * as React from 'react';
import TeamItem from './teamItem';

export interface TeamListProps {
    teams: Array<CustomInterfaces.TeamInterface>;
}

class TeamList extends React.Component<TeamListProps> {
    render() {
        let teams = this.props.teams.map((val, ind) => (
            <div className="col-xs-6" key={'team-' + ind}>
                <h5 className="card-header1">Team #{ind + 1}</h5>
                <div className="card-block">
                    <TeamItem {...val}/>
                </div>
            </div>
        ));
        return (
            <div className="card panel panel-default ks-solid ks-widget ks-widget-users">
                <div className="row">
                    {teams}
                </div>
            </div>
        );
    }
}

export default TeamList;