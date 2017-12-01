import VacancyItem from './vacancyItem';
import * as React from 'react';

export interface VacancyListProps {
    vacancies: Array<CustomInterfaces.VacanyInterface>;
}

class VacancyList extends React.Component<VacancyListProps> {
    render() {
        const vacancies = this.props.vacancies.map((val, ind) => (
            <VacancyItem {...val} key={'vac' + ind}/>
        ));
        return (
            <div>
                <h4>Open positions</h4>
                <div className="siderightbar" id="sticky-sidebar">
                    <div className="form-group">
                        <i className="icon ion-android-search"/>
                        <input className="form-control" type="text" placeholder="Search"/>
                    </div>
                    <div className="suggestions">
                        {vacancies}
                    </div>
                </div>
            </div>
        );
    }
}

export default VacancyList;