import { ActivityItemProps as activity } from './activityItem';
import { ArticleItemProps as article } from './articleItem';
import { VacancyItemProps as vacancy } from './vacancyItem';
import { ProfileProps as profile } from './profile';
import { client } from '../../util/graphql/client';
import { TeamProps as team } from './teamItem';
import * as update from 'immutability-helper';
import ActivityList from './activityList';
import ArticleList from './articleList';
import VacancyList from './vacancyList';
import TeamList from './teamList';
import Profile from './profile';
import * as React from 'react';
import gql from 'graphql-tag';
import './style.css';

export interface DashboardState {
    activities: Array<activity>;
    articles: Array<article>;
    vacancies: Array<vacancy>;
    User: profile & {teams: Array<team>};
}

class Dassboard extends React.Component<{}, DashboardState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            activities: [],
            articles: [],
            vacancies: [],
            User: {
                profile: {firstName: '', lastName: ''},
                company: {name: ''},
                notifications: [],
                teams: []
            }
        };
    }
    componentDidMount() {
        client.query({query: gql`
            {
                Activities(company:"1245"){ 
                    content,
                    project{
                        name
                    },
                    dueAt,
                    users{
                        email
                    }
                }
                Articles(company: "1245"){
                    title,
                    author,
                    content
                },
                Vacancies(company: "1245"){
                    name,
                    company{
                        name
                    },
                    location
                },
                User(id: "2514"){
                    profile{
                        lastName,
                        firstName
                    },
                    company{
                        name
                    },
                    notifications{
                        content,
                        sender
                    },
                    teams{
                        name,
                        members{
                            email
                        }
                    }
                }
            }
        `}).then((res) => {
            console.log(res.data);
            this.setState(update(this.state, {
                activities: {$set: res.data['Activities']},
                articles: {$set: res.data['Articles']},
                vacancies: {$set: res.data['Vacancies']},
                User: {$set: res.data['User']}
            }));
         });
    }
    render() {
        return (
                <div id="page-contents">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 static">
                                <Profile {...this.state.User} />
                                <div><p>&nbsp;</p></div>
                                <TeamList teams={this.state.User.teams}/>
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
export default Dassboard;