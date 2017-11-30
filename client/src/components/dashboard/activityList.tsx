import { default as Activity, ActivityItemProps as activity } from './activityItem';
import * as React from 'react';

export interface ActivityListProps {
    activities: Array<activity>;
}

class ActivityList extends React.Component<ActivityListProps> {
    render() {
        const activities = this.props.activities.map((val, ind) => (
            <div className="ks-social-profile" key={'act-' + ind}>
                <div className="ks-social-profile-body">
                    <div className="ks-feed">
                        <Activity {...val} />
                    </div>
                </div>
            </div>
        ));
        return (
            <div>
                <h4>Activities</h4>
                {activities}
            </div>
        );
    }
}

export default ActivityList;