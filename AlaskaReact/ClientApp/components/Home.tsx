import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { AirportFinder } from './AirportFinder';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return (
            <div className="col-12-sm">
                <div className="row header-text">
                    <div className="col-12-sm">
                        <h1 className="light">Welcome.</h1>
                        <h2 className="light">Let's go somewhere.</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12-sm">
                        <AirportFinder placeholder="Depart from" />
                        <AirportFinder placeholder="Arrive at" />
                    </div>
                </div>
            </div>
        );
    }
}