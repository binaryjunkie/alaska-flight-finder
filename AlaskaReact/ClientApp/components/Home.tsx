import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Airport, AirportFinder } from './AirportFinder';

interface Flight {
        from: string;
        to: string;
        flightNumber: string;
        departs: string;
        arrives: string;
        mainCabinPrice: number;
        firstClassPrice: number;
}

interface HomeState {
    airports?: Airport[];
    airportsByKey?: { [key: string]: Airport };
    flights?: Flight[];
}
export class Home extends React.Component<RouteComponentProps<{}>, HomeState> {

    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        //Load airports and flights
        fetch('api/airports')
            .then(response => response.json() as Promise<Airport[]>)
            .then(data => {
                const airportsByKey = data.reduce((airports, airport): any => {
                    airports[airport.code] = airport;
                    return airports;
                }, {} as { [key: string]: Airport });
                this.setState({ airports: data, airportsByKey });
            });
        fetch('api/flights')
            .then(response => response.json() as Promise<Flight[]>)
            .then(data => {
                this.setState({ flights: data });
            });
    }

    airportByKey(code: string) {
        const { airportsByKey } = this.state;
        if (airportsByKey) {
            return airportsByKey[code];
        } else {
            return;
        }
    }

    renderFlightTableRow(flight: Flight) {
        const airportTo = this.airportByKey(flight.to);
        const airportFrom = this.airportByKey(flight.from);
        if (airportTo && airportFrom) {
            return (
                <tr>
                    <td>{airportTo.name}</td>
                    <td>{airportFrom.name}</td>
                    <td>{flight.departs}</td>
                    <td>{flight.arrives}</td>
                    <td>{flight.mainCabinPrice}</td>
                    <td>{flight.firstClassPrice}</td>
                </tr>
            )
        } else {
            return (
                <p>NO FLIGHT ROW</p>
            )
        }
    }

    public render() {
        const { flights, airports } = this.state;
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
                <div className="row">
                    <div className="col-12-sm">
                        <table className="table">
                            {flights && airports && flights.map((flight: Flight) => (
                                this.renderFlightTableRow(flight)
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}