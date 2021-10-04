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


class CreateCommand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '/'};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSubmit() {
        this.props.handleSubmitCreate(this.state.value);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <span>Создать комманду:</span>
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    <input type="submit" value="Сохранить"/>
                    <button onClick={this.props.handleCancelCreate}>Отмена</button>
                </form>
            </div>
        )
    }

}

function SelectCommand(props) {
    return (<div>
                <span>Комманда:</span>
                <select>
                    {props.commandsOptions}
                </select>
                <button onClick={props.handleCreate}>Создать новую комманду</button>
            </div>
            )
}


function TextView(props) {
    return (
        <div>
            <textarea></textarea>
        </div>
    )
}

class CommandTrigger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {action: 'select', commands: ['/start']};
        this.handleCreate = this.handleCreate.bind(this);
        this.handleCancelCreate = this.handleCancelCreate.bind(this);
        this.handleSubmitCreate = this.handleSubmitCreate.bind(this);
    }

    handleCreate() {
        this.setState({action: 'create'});
    }

    handleCancelCreate() {
        this.setState({action: 'select'});
    }
    
    handleSubmitCreate(value) {
        this.setState({action: 'select'});
        this.setState({
            commands: [...this.state.commands, value]
        });
    }
    
    render() {
        const commands = this.state.commands; // TODO: Получаем из api
        const commandsOptions = commands.map((command) =>
            <option
                key={command}
                value={command}>
                    {command}
            </option>);
        const component = (this.state.action === 'select')
                                                            ? <SelectCommand commandsOptions={commandsOptions}
                                                                            handleCreate={this.handleCreate}/>
                                                            : <CreateCommand handleCancelCreate={this.handleCancelCreate}
                                                                             handleSubmitCreate={this.handleSubmitCreate}/>
        return (component)
        
    }

}



function ViewTrigger(props) {
    return (<div>
                <div>
                    <span>Представление:</span>
                </div>
            </div>
    )
}


class ButtonsField extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const buttons = this.props.buttons.map((button) =>
            <p><span key={button}>{button}</span></p>);
        return (
            <div>
                {buttons}
            </div>
        )
    }

}


class ButtonView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {buttons: []};
        this.addButton = this.addButton.bind(this);
    }

    addButton() {
        this.setState({
            buttons: [...this.state.buttons, 'Кнопка']
        });
    }
    
    render() {
        const buttons = ['ReplyKeyboard', 'InlineKeyboard'];
        const options = buttons.map((button) =>
            <option
                key={button}
                value={button}>
                    {button}
            </option>);
        return (
            <div>
                <span>Тип кнопок:</span>
                <select>
                    {options}
                </select>
                <button onClick={this.addButton}>Добавить кнопку</button>
                <div>
                    <span>Кнопки:</span>
                    <ButtonsField buttons={this.state.buttons}/>
                </div>
            </div>
    )
    }
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
                    <span>Условие выполнения:</span>
                    <select onChange={this.handleChange}>
                        {options}
                    </select>
                </div>
                <Trigger trigger={this.state.trigger}/>
                <TextView />
                <ButtonView buttonsField={<ButtonsField />}/>
            </div>);
    }
}


ReactDOM.render(
  <CreateViewMain executionConditions={executionConditions} />,
  document.getElementById('root')
);
