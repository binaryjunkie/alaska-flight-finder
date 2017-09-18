import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { AirportFinder } from './AirportFinder';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>Hello, world!</h1>
            <AirportFinder placeholder="Find a fuckin' airport"/>
        </div>;
    }
}
