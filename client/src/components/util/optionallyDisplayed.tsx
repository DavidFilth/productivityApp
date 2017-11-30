import * as React from 'react';

export interface OptionallyDisplayedProps {
    display: boolean;
}

export default class OptionallyDysplayed extends 
React.Component<OptionallyDisplayedProps> {
    render() {
        return (this.props.display ) ? <div>{this.props.children}</div> : null;
    }
}