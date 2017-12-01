import { withRouter, RouteComponentProps } from 'react-router-dom';
import { client } from '../../util/graphql/client';
import * as React from 'react';
import gql from 'graphql-tag';

export interface LogoutProps {
    onLogUserOut(): void;
}

class Logout extends React.Component<RouteComponentProps<{}> & LogoutProps> {
    componentDidMount() {
        client.mutate({mutation: gql`
            mutation{
                logout(optionally:"1243")
            }
        `}).then((res) => {
            if (res.data) {
                this.props.onLogUserOut();
                this.props.history.push('/login');
            }
        });
    }
    render() {
        return (
            <div className="container">
                Wait...
            </div>
        );
    }
}
export default withRouter(Logout);