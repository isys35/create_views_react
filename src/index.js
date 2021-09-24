import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


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
    const commands = ['/start']
    return (<div>
                <span>Выберите комманду:</span>
            </div>)
}


function ViewTrigger(props) {
    const commands = ['/start']
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
                    <select>
                        {options}
                    </select>
                </div>
                <Trigger type={this.state.trigger}/>
            </div>);
    }
}


ReactDOM.render(
  <CreateViewMain executionConditions={executionConditions}></CreateViewMain>,
  document.getElementById('root')
);
