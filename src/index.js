import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createBrowserHistory} from 'history'

const executionConditions = [
    {title:"команда", value:'command-trigger'},
    {title:"представление", value:'view-trigger'},
]


function Trigger(props) {
    const trigger = props.trigger
    if (trigger === 'command-trigger') {
        return <CommandTrigger />
    } else {
        return <ViewTrigger />
    }
}

function CommandTrigger(props) {
    const commands = ['/start'];
    const commandsOptions = commands.map((command) =>
            <option
                key={command}
                value={command}>
                    {command}
            </option>);
    return (<div>
                <span>Выберите комманду:</span>
                <select>
                    {commandsOptions}
                </select>
                <button>Создать новую комманду</button>
            </div>)
}


function ViewTrigger(props) {
    return (<div>
                <div>
                    <span>Выберите представление:</span>
                </div>
            </div>
    )
}






class CreateViewMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {trigger: executionConditions[0].value}
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({trigger: event.target.value});
    }

    render() {
        const executionConditions = this.props.executionConditions;
        const options = executionConditions.map((executionCondition) =>
            <option
                key={executionCondition.title}
                value={executionCondition.value}>
                    {executionCondition.title}
            </option>);
        return (

            <div className="container">
                <h1>Окно создания представлений</h1>
                <div>
                    <span>Выбрать условие выполнения:</span>
                    <select onChange={this.handleChange}>
                        {options}
                    </select>
                </div>
                <Trigger trigger={this.state.trigger}/>
            </div>);
    }
}


ReactDOM.render(
  <CreateViewMain executionConditions={executionConditions} />,
  document.getElementById('root')
);
