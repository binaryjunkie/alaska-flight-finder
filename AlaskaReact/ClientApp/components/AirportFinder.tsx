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
    results: Airport[];
    q?: string;
    value?: Airport;
    selectedIndex: number;
}

export class AirportFinder extends React.Component<AirportFinderProps, AirportFinderState> {
    private static defaultProps: Partial<AirportFinderProps> = {
        placeholder: 'Search Airports',
    }

    constructor(props: AirportFinderProps) {
        super(props);
        this.state = {
            data: [],
            results: [],
            q: '',
            selectedIndex: 0,
        };
    }

    componentDidMount() {
        fetch('api/airports')
            .then(response => response.json() as Promise<Airport[]>)
            .then(data => {
                this.setState({ data });
            });
    }

    handleFocus(event: React.FormEvent<HTMLInputElement>) {
        console.log("BLUR");
    }

    handleBlur(event: React.FormEvent<HTMLInputElement>) {
        console.log("BLUR");
    }

    handleSelect(value: Airport) {
        const { results } = this.state;
        this.setState({ value, selectedIndex: results.indexOf(value) })
    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        const { data } = this.state;
        const q = event.currentTarget.value;
        let results: Airport[];
        let selectedIndex: number = this.state.selectedIndex;

        if (data && q) {
            results = data.filter((airport: Airport) => {
                // const query = new RegExp(q, 'i'); // doesn't like special characters, below is produces more reliable results than escaping those
                const name = airport.name.toLowerCase();
                const code = airport.code.toLowerCase();
                const query = q.toLowerCase();
                return name.indexOf(query) > -1 || code.indexOf(query) > -1;
            });
        } else {
            results = [];
            //selectedIndex = 0;
        }

        let newState = {
            selectedIndex: (results.length !== this.state.results.length) ? 0 : selectedIndex

        }
        
        this.setState({ q, results, selectedIndex });
    }

    handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        const keyCode = event.which;
        const { selectedIndex, results } = this.state;

        if (results.length < 1 && [13, 38, 40].indexOf(keyCode) > -1) {
            event.preventDefault();
            return;
        }

        if (keyCode === 13) {
            event.preventDefault();
            this.handleSelect(results[selectedIndex]);
        }
        if (keyCode === 38) {
            event.preventDefault();
            let index = selectedIndex - 1;
            if (index < 0) {
                this.setState({ selectedIndex: results.length - 1 });
            } else {
                this.setState({ selectedIndex: index });
            }
        }
        if (keyCode == 40) {
            event.preventDefault();
            let index = selectedIndex + 1;
            if (index > results.length - 1) {
                this.setState({ selectedIndex: 0 });
            } else {
                this.setState({ selectedIndex: index });
            }
        }
    }

    renderResultsList() {
        const { results, selectedIndex, q } = this.state;
        
        return (
            <ul>
                {q && results.length > 0 && results.map((airport: Airport, index: Number) => (
                    <li className={(index === selectedIndex) ? 'active' : ''} onClick={(e) => this.handleSelect(airport)} key={airport.code}> CODE: {airport.code} - {airport.name} </li>
                ))}
                {q && results.length === 0 && (
                    <li className="no-data">No results found</li>
                )}
            </ul>
        )
    }

    public render() {
        const { placeholder } = this.props;
        const { data, q } = this.state;
        return (
            <div className="airport-finder">
                <input type="text" value={q} onKeyDown={(e) => this.handleKeyDown(e)} onChange={(e) => this.handleChange(e)} placeholder={placeholder} />
                { this.renderResultsList() }
            </div>
        );
    }
}
