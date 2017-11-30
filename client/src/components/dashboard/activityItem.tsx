import * as React from 'react';

export interface ActivityItemProps {
    project: {
        name: string;
    };
    dueAt: string;
    content: string;
    users: Array<{ }>;
}

class ActivityItem extends React.Component<ActivityItemProps> {
    render() {
        return (
            <div className="card panel panel-default ks-post">
                <div className="ks-header">
                    <a href="#" className="ks-user">
                        <img className="ks-avatar" src="http://via.placeholder.com/110x110" width="36" height="36" />
                        <span className="ks-name">{this.props.project.name}</span>
                    </a>
                    <span className="ks-date-created">{this.props.dueAt}</span>
                </div>
                <div className="ks-body">
                    <div className="ks-text">{this.props.content}</div>
                </div>
                <div className="ks-footer">
                    <div className="ks-block">
                        <span className="ks-control" data-toggle="tooltip" data-placement="top" title="Comment">
                            <span className="fa fa-comment-o ks-icon"/>
                            <span className="ks-amount"> {this.props.users.length}</span>
                        </span>
                    </div>
                    <div className="ks-block">
                        <span className="ks-control" data-toggle="tooltip" data-placement="top" title="Share" >
                            <span className="fa fa-share ks-icon"/>
                        </span>
                        <span className="ks-control" data-toggle="tooltip" data-placement="top" title="Like">
                            <span className="fa fa-tags ks-icon"/>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default ActivityItem;