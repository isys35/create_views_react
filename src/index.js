import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Select } from './select.js';
import { Load } from './load.js';
import { HOST } from './settings';
import { SaveButton } from './action-buttons'
import { ButtonView } from  './telegram-buttons'
import { SelectWithSettings } from './select-with-settings'

const executionConditions = [
    {text:"команда", value:'command-trigger'},
    {text:"представление", value:'view-trigger'},
]


function Trigger(props) {
    const trigger = props.trigger
    const component = (trigger === 'command-trigger') ?   <SelectWithSettings
                                                                mainTitle="Комманда"
                                                                changeTitle="Редактировать комманды"
                                                                changeTextTitle="Изменить текст комманды"
                                                                createTitle="Создать комманду"
                                                                deleteTitle="Удалить комманду"
                                                                restURLpath = "commands"
                                                            />
                                                       :   <ViewTrigger />
    return component
}



function TextView(props) {
    return (
        <div>
            <textarea className="textview-input"></textarea>
        </div>
    )
}





function ViewTrigger(props) {
    return (<div>
                <div className="row-select">
                    <span className="title">Представление:</span>
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

    handleChange(value) {
        this.setState({trigger: value});
    }

    render() {
        const executionConditions = this.props.executionConditions;
        const options = executionConditions.map((executionCondition) =>
            <option
                key={executionCondition.text}
                value={executionCondition.value}>
                    {executionCondition.text}
            </option>);
        return (

            <div className="container">
                <h1>Cоздание шага</h1>
                <div className="create-view">
                    <div className="row-select">
                        <span className="title">Условие выполнения:</span>
                        <Select items={executionConditions}
                                text={executionConditions[0].text}
                                value={executionConditions[0].value}
                                handleChange={this.handleChange}
                        />
                    </div>
                    <Trigger trigger={this.state.trigger}/>
                    <TextView />
                    <ButtonView />
                    <div className="row-save-button">
                        <SaveButton />
                    </div>
                </div>
            </div>);
    }
}


ReactDOM.render(
  <CreateViewMain executionConditions={executionConditions} />,
  document.getElementById('root')
);
