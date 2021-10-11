import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const HOST = 'http://127.0.0.1:8000/'

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
                    <span className="title">Создать комманду:</span>
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    <input type="submit" value="Сохранить"/>
                    <button onClick={this.props.handleCancelCreate}>Отмена</button>
                </form>
            </div>
        )
    }

}


class CommandOptions extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {options: [], selectedId: null};
        this.handleChangeSelectedCommand = this.handleChangeSelectedCommand.bind(this);
    }
    
    handleChangeSelectedCommand(e) {
        this.props.setSelectedCommand(e.target.value);
    }

    componentDidMount() {
        fetch(HOST + 'commands')
            .then(res => res.json())
                .then(
                    (result) => {
                        this.props.setSelectedCommand(result[0].id, result[0].value);
                        this.setState({
                        options: result.map((item) =>   <option
                                                            key={item.id}
                                                            value={item.id}>
                                                            {item.value}
                                                        </option>)
                            });
                        }
                    )


    }

    render() {
        return (<select onChange={this.handleChangeSelectedCommand}>
                    {this.state.options}
                </select>)
    }
}
    

function SelectCommand(props) {
    return (<div className="row-select">
                <span className="title">Комманда:</span>
                <div>
                    <CommandOptions setSelectedCommand={props.setSelectedCommand}/>
                    <button onClick={props.handleChange}>🛠️</button>
                </div>
            </div>
            )
}


function MainMenuChange(props) {
    return (
        <div className="row-select">
            <span className="title">Редактировать комманды:</span>
            <div>
                <CommandOptions setSelectedCommand={props.setSelectedCommand}/>
                {/*<button onClick={props.handleDelete}>🗑️</button>*/}
                <button onClick={props.handleDelete}>🗑️</button>
                <button>✏️</button>
                <button>➕</button>
                <button onClick={props.handleCancelChange}>❌</button>
            </div>
        </div>
    )
}


class DeleteCommand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {commandName: null};
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        const url = `${HOST}commands/${this.props.commandId}`
        fetch(url)
            .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({commandName: result.value});
                        }
                    )
    }

    handleDelete() {
        const url = `${HOST}commands/${this.props.commandId}`;
        fetch(url, {method: 'DELETE'})
            .then(res => res.json())
                .then(
                    (result) => {
                        this.props.cancelDelete();
                        }
                    )
    }

    render() {
        return (
            <div className="row-select">
                <span className="title">Удалить комманду "{this.state.commandName}" ?</span>
                <div>
                    <button onClick={this.handleDelete}>✅</button>
                    <button onClick={this.props.cancelDelete}>❎</button>
                </div>
            </div>
        )
    }

}


class ChangeCommands extends React.Component {
    constructor(props) {
        super(props);
        this.state = {action: 'main'};
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCancelDelete = this.handleCancelDelete.bind(this);
    }

    handleDelete() {
        this.setState({action: 'delete'});
    }

    handleCancelDelete() {
        this.setState({action: 'main'});
    }

    render() {
        const component = (this.state.action === 'main') ?
            <MainMenuChange
                setSelectedCommand={this.props.setSelectedCommand}
                handleDelete={this.handleDelete}
                handleCancelChange={this.props.handleCancelChange}
            /> :
                <DeleteCommand
                    commandId={this.props.commandId}
                    cancelDelete={this.handleCancelDelete}
                />
        return component
    }
}

// function ChangeCommands(props) {
//     return (<div className="row-select">
//                 <span className="title">Редактировать комманды:</span>
//                 <div>
//                     <CommandOptions setSelectedCommand={props.setSelectedCommand}/>
//                     <button onClick={props.handleDelete}>🗑️</button>
//                     <button>✏️</button>
//                     <button>➕</button>
//                     <button onClick={props.handleCancelChange}>❌</button>
//                 </div>
//             </div>
//             )
// }


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
        this.state = {action: 'select', selectedCommandId: null, selectedCommandName: null};
        this.handleChange = this.handleChange.bind(this);
        this.handleCancelChange = this.handleCancelChange.bind(this);
        this.setSelectedCommand = this.setSelectedCommand.bind(this);
    }

    setSelectedCommand(commandId) {
        this.setState(
            {
                selectedCommandId: commandId,
            }
        );
    }
    
    handleChange() {
        this.setState({action: 'change'});
    }

    handleCancelChange() {
        this.setState({action: 'select'});
    }
    
    render() {
        return (this.state.action === 'select') ?
            <SelectCommand
                handleChange={this.handleChange}
                setSelectedCommand={this.setSelectedCommand}/> :
            <ChangeCommands
                handleCancelChange={this.handleCancelChange}
                handleDelete={this.handleDelete}
                setSelectedCommand={this.setSelectedCommand}
                commandId={this.state.selectedCommandId}
            />
    }

}



function ViewTrigger(props) {
    return (<div>
                <div className="row-select">
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
            <div className="button-view"><span key={button}>{button}</span></div>);
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
                <div className="row-select">
                    <span className="title">Тип кнопок:</span>
                    <div>
                        <select>
                            {options}
                        </select>
                        <button onClick={this.addButton}>+</button>
                    </div>
                </div>
                <div>
                    <span className="title">Кнопки:</span>
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
                <h1>Cоздание представления</h1>
                <div className="create-view">
                    <div className="row-select">
                        <span className="title">Условие выполнения:</span>
                        <select onChange={this.handleChange}>
                            {options}
                        </select>
                    </div>
                    <Trigger trigger={this.state.trigger}/>
                    <TextView />
                    <ButtonView buttonsField={<ButtonsField />}/>
                    <div className="save-button">
                        <button>Сохранить</button>
                    </div>
                </div>
            </div>);
    }
}


ReactDOM.render(
  <CreateViewMain executionConditions={executionConditions} />,
  document.getElementById('root')
);
