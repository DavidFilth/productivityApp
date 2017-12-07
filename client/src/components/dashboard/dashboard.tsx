import { withRouter, RouteComponentProps } from 'react-router-dom';
import { client } from '../../util/graphql/client';
import { ApolloQueryResult } from 'apollo-client';
import * as update from 'immutability-helper';
import ActivityList from './activityList';
import ArticleList from './articleList';
import VacancyList from './vacancyList';
import TeamList from './teamList';
import Profile from './profile';
import * as React from 'react';
import gql from 'graphql-tag';
import './style.css';

export interface DashboardProps extends RouteComponentProps<{}> {
    User: CustomInterfaces.UserInterface;
}

export interface DashboardState {
    activities: Array<CustomInterfaces.ActivityInterface>;
    articles: Array<CustomInterfaces.ArticleInterface>;
    vacancies: Array<CustomInterfaces.VacanyInterface>;
}

class Dassboard extends React.Component<DashboardProps, DashboardState> {
    constructor(props: DashboardProps) {
        super(props);
        this.state = {
            activities: [],
            articles: [],
            vacancies: []
        };
    }
    componentWillMount() {
        if (!this.props.User) {
            this.props.history.push('/login');
        }
    }
    componentDidMount() {
        if (!this.props.User) { return; }
        if (!this.props.User.company) {
            this.setState(update(this.state, {
                activities: {$set: []},
                articles: {$set: []},
                vacancies: {$set: []}
            }));
            return;
        }
        client.query({query: gql`
            {
                Activities(company:"${this.props.User.company._id}"){ 
                content,
                    company{
                        name
                    },
                    dueAt,
                    users{
                        email
                    }
                }
                Articles(company: "${this.props.User.company._id}"){
                    title,
                    author,
                    content
                },
                Vacancies(company: "${this.props.User.company._id}"){
                    name,
                    company{
                        name
                    },
                    location
                }
            }
        `}).then((res: ApolloQueryResult<{
            Activities: Array<CustomInterfaces.ActivityInterface>;
            Articles: Array<CustomInterfaces.ArticleInterface>;
            Vacancies: Array<CustomInterfaces.VacanyInterface>;
        }>) => {
            this.setState(update(this.state, {
                activities: {$set: res.data.Activities},
                articles: {$set: res.data.Articles},
                vacancies: {$set: res.data.Vacancies}
            }));
         });
    }
    render() {
        if (!this.props.User) {
            return null;
        }
        return (
                <div id="page-contents">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 static">
                                <Profile {...this.props.User} />
                                <div><p>&nbsp;</p></div>
                                <TeamList teams={this.props.User.teams}/>
                            </div>
                            <div className="col-md-6">
                                <ActivityList activities={this.state.activities}/>
                                <ArticleList articles={this.state.articles}/>
                            </div>
                            <div className="col-md-3 static">
                                <VacancyList vacancies={this.state.vacancies} />
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
export default withRouter(Dassboard);