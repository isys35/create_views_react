import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const executionConditions = [
    {title:"команда", value:'command-trigger'},
    {title:"представление", value:'view-trigger'},
]


function Trigger(props) {
    const trigger = props.trigger
    const component = (trigger === 'command-trigger') ? <CommandTrigger /> : <ViewTrigger />
    return component
}

function CreateCommand(props) {
    return (
        <div>
            <span>Создать комманду:</span>
        </div>
    )
}


function SelectCommand(props) {
    return (<div>
                <span>Выберите комманду:</span>
                <select>
                    {props.commandsOptions}
                </select>
                <button>Создать новую комманду</button>
            </div>
            )
}


class CommandTrigger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {action: 'select'};
    }
    
    render() {
        const commands = ['/start']; // TODO: Получаем из api
        const commandsOptions = commands.map((command) =>
            <option
                key={command}
                value={command}>
                    {command}
            </option>);
        const component = (this.state.action === 'select') ? <SelectCommand commandsOptions={commandsOptions}/> : <CreateCommand />
        return (component)
        
    }

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
