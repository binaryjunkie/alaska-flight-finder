import * as React from 'react';
import 'isomorphic-fetch';

export interface Airport {
    code: string;
    name: string;
}

interface AirportFinderProps {
    placeholder?: string;
    active?: boolean;
}

interface AirportFinderState {
    data?: Airport[];
    results: Airport[];
    q?: string;
    value?: Airport;
    selectedIndex: number;
    active: boolean;
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
            active: false,
        };
    }

    handleSelect = (value: Airport): any => {
        return (event: React.FormEvent<HTMLInputElement>): void => {
            console.log("SELECTING ")
            const { results } = this.state;
            this.setState({ value, selectedIndex: results.indexOf(value), active: false })
        };
    }

    handleFocus = (event: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ active: true });
    }

    handleBlur = (event: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ active: false });

    }

    handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const { data } = this.state;
        const q = event.currentTarget.value;
        let results: Airport[];
        let selectedIndex: number = this.state.selectedIndex;

        if (data && q) {
            results = data.filter((airport: Airport) => {
                const name = airport.name.toLowerCase();
                const code = airport.code.toLowerCase();
                const query = q.toLowerCase();
                return name.indexOf(query) > -1 || code.indexOf(query) > -1;
            });
        } else {
            results = [];
        }
        
        this.setState({
            q,
            results,
            selectedIndex: (results.length !== this.state.results.length) ? 0 : selectedIndex,
        });
    }

    handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        const keyCode = event.which;
        const { selectedIndex, results } = this.state;

        if (results.length < 1 && [13, 38, 40].indexOf(keyCode) > -1) {
            event.preventDefault();
            return;
        }

        if (keyCode === 13) {
            event.preventDefault();
            this.handleSelect(results[selectedIndex])(event);
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
        const { results, selectedIndex, q, active } = this.state;
        
        return (
            <ul>
                {q && results.length > 0 && results.map((airport: Airport, index: Number) => (
                    <li
                        className={(index === selectedIndex) ? 'active' : ''}
                        onClick={this.handleSelect(airport)}
                        key={airport.code}
                    >
                        {airport.name} ({airport.code})
                    </li>
                ))}
                {q && results.length === 0 && (
                    <li className="no-data">No results found</li>
                )}
            </ul>
        )
    }

    render() {
        const { placeholder } = this.props;
        const { active, q } = this.state;
        return (
            <div className="airport-finder">
                <input
                    type="text"
                    value={q}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onKeyDown={this.handleKeyDown}
                    onChange={this.handleChange}
                    placeholder={placeholder}
                />
                { active && this.renderResultsList() }
            </div>
        );
    }
}
