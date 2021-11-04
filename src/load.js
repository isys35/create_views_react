import React from 'react';
import './load.css';


export class Load extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loadId: 0};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
                500
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        var loadId = this.state.loadId;
        if (loadId == 2 ) {
            this.setState({loadId: 0});
        } else {
            var newID = loadId + 1;
            this.setState({loadId: newID });
        }
    }

    render() {
        const loadVars = ['Загрузка.', 'Загрузка..', 'Загрузка...']
        return (
            <span className="load">{loadVars[this.state.loadId]}</span>
        )
    }
}
