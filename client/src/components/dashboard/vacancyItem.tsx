import * as React from 'react';

class VacancyItem extends React.Component<CustomInterfaces.VacanyInterface> {
    render() {
        return (
            <div className="follow-user">
                <img className="profile-photo-sm pull-left" src="http://via.placeholder.com/128x128" alt="some" />
                <div>
                    <h6>
                        <a href="#">{this.props.name}</a> at 
                      <a href="#"> {this.props.company.name}</a>
                    </h6>
                    <h6>Location: {this.props.location}</h6>
                </div>
            </div>
        );
    }
}

export default VacancyItem;