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
    data?: Airport[];
    q?: string;
    value?: Airport;
}

export class AirportFinder extends React.Component<AirportFinderProps, AirportFinderState> {
    private static defaultProps: Partial<AirportFinderProps> = {
        placeholder: 'Search Airports',
    }

    constructor(props: AirportFinderProps) {
        super(props);
        this.state = {
            data: [],
            q: '',
        };
    }

    componentDidMount() {
        fetch('api/airports')
            .then(response => response.json() as Promise<Airport[]>)
            .then(data => {
                this.setState({ data });
            });
    }

    handleSelect(value: Airport) {
        this.setState({ value })
    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({ q: event.currentTarget.value });
    }

    renderResultsList() {
        const { data, q } = this.state;
        let results: Airport[];
        if (data && q) {
            results = data.filter((airport: Airport) => {
                const query = new RegExp(q, 'gi');
                return query.test(airport.code) || query.test(airport.name);
            });
        } else {
            results = [];
        }

        return (
            <ul>
                {results && results.map((airport: Airport) => (
                    <li onClick={(e) => this.handleSelect(airport)} key={airport.code}> CODE: {airport.code} - {airport.name} </li>
                ))}
            </ul>
        )
    }

    public render() {
        const { placeholder } = this.props;
        const { data, q } = this.state;
        return (
            <div className="airport-finder">
                <input type="text" value={q} onChange={ (e) => this.handleChange(e) } placeholder={placeholder} />
                { this.renderResultsList() }
            </div>
        );
    }
}
