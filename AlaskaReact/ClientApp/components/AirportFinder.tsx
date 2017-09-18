import * as React from 'react';
import 'isomorphic-fetch';

interface Airport {
    code: string;
    name: string;
}

interface AirportFinderProps {
    placeholder?: string;
}

interface AirportFinderState {
    airports?: Airport[];
}

export class AirportFinder extends React.Component<AirportFinderProps, AirportFinderState> {
    public static defaultProps: Partial<AirportFinderProps> = {
        placeholder: 'Search Airports',
    }

    componentDidMount() {
        fetch('api/airports')
            .then(response => response.json() as Promise<Airport[]>)
            .then(data => {
                console.log("SO ThIS IS HAPPENING")
                console.log(data)
                this.setState({ airports: data });
            });
    }

    constructor(props: AirportFinderProps) {
        super(props);
        this.state = {};
    }

    public render() {
        const { placeholder } = this.props;
        return (
            <div>
                <input type="text" placeholder={placeholder} />
                {this.state.airports && this.state.airports.map((airport) => (
                    <p key={airport.code}> CODE: {airport.code} </p>
                ))}
            </div>
        );
    }
}
