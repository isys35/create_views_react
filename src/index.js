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
                        if (result.length !== 0) {
                             this.props.setSelectedCommand(result[0].id, result[0].value);
                            this.setState({
                            options: result.map((item) =>   <option
                                                            key={item.id}
                                                            value={item.id}>
                                                            {item.value}
                                                        </option>)
                            });
                        }
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
                <button onClick={props.handleEdit}>✏️</button>
                <button onClick={props.handleAdd}>➕</button>
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
                        this.props.handleCancel();
                        }
                    )
    }

    render() {
        return (
            <div className="row-select">
                <span className="title">Удалить комманду "{this.state.commandName}" ?</span>
                <div>
                    <button onClick={this.handleDelete}>✅</button>
                    <button onClick={this.props.handleCancel}>❎</button>
                </div>
            </div>
        )
    }

}

class EditCommand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {commandName: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSaveChange = this.handleSaveChange.bind(this);

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

    handleChange(event) {
        this.setState({commandName: event.target.value});
    }

    handleSaveChange() {
        const url = `${HOST}commands/${this.props.commandId}`
        fetch(url,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    value: this.state.commandName
                    }),
                headers: {"Content-type": "application/json; charset=UTF-8"}})
            .then(res => res.json())
                .then(
                    (result) => {
                        this.props.handleCancel();
                        }
                    )
    }



    render() {
        return (
            <div className="row-select">
                <span className="title">Изменить комманду:</span>
                <div>
                    <input type="text" value={this.state.commandName} onChange={this.handleChange}/>
                    <button onClick={this.handleSaveChange}>💾</button>
                    <button onClick={this.props.handleCancel}>❎</button>
                </div>
            </div>
        )
    }

}


class AddCommand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {commandName: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateCommand = this.handleCreateCommand.bind(this);

    }

    handleChange(event) {
        this.setState({commandName: event.target.value});
    }

    handleCreateCommand() {
        const url = `${HOST}commands/`
        fetch(url,
            {
                method: 'POST',
                body: JSON.stringify({
                    value: this.state.commandName
                    }),
                headers: {"Content-type": "application/json; charset=UTF-8"}})
            .then(res => res.json())
                .then(
                    (result) => {
                        this.props.handleCancel();
                        }
                    )
    }



    render() {
        return (
            <div className="row-select">
                <span className="title">Создать комманду:</span>
                <div>
                    <input type="text" value={this.state.commandName} onChange={this.handleChange}/>
                    <button onClick={this.handleCreateCommand}>💾</button>
                    <button onClick={this.props.handleCancel}>❎</button>
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
        this.handleCancel = this.handleCancel.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleDelete() {
        this.setState({action: 'delete'});
    }

    handleCancel() {
        this.setState({action: 'main'});
    }
    
    handleEdit() {
        this.setState({action: 'edit'});
    }

    handleAdd() {
        this.setState({action: 'add'});
    }


    render() {
        switch (this.state.action) {
            case 'main':
                return <MainMenuChange
                            setSelectedCommand={this.props.setSelectedCommand}
                            handleDelete={this.handleDelete}
                            handleCancelChange={this.props.handleCancelChange}
                            handleEdit = {this.handleEdit}
                            handleAdd = {this.handleAdd}
                        />
            case 'delete':
                return <DeleteCommand
                            commandId={this.props.commandId}
                            handleCancel={this.handleCancel}
                        />
            case 'edit':
                return <EditCommand
                        commandId={this.props.commandId}
                        handleCancel={this.handleCancel}
                    />
            case 'add':
                return <AddCommand
                            handleCancel={this.handleCancel}
                        />
        }
    }
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

class AddButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<button className="tgbutton addbutton" onClick={this.props.setStatusCreate}>+</button>)
    }
}


class Button extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {text: ''}
    }

    render() {
        return (<button>{this.state.text}</button>)
    }

}

class  ButtonFieldView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {buttons: []}
    }
    
    render() {
        return (<div>
                    {this.state.buttons.map((button) => <Button />)}
                </div>)
    }

}


class ButtonField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {status: 'add'};
        this.setStatusCreate = this.setStatusCreate.bind(this);
        this.cancelCreate = this.cancelCreate.bind(this);

    }

    setStatusCreate() {
        this.setState({status: 'create'});
    }

    cancelCreate() {
        this.setState({status: 'add'});
    }

    render() {
        if (this.state.status == 'add') {
            return  <div>
                        <ButtonFieldView />
                        <AddButton setStatusCreate={this.setStatusCreate} />
                    </div>
        } else {
            return <div>
                        <ButtonFieldView />
                        <ButtonCreater cancelCreate={this.cancelCreate} />
                    </div>

        };
    }
}


class ButtonCreater extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const button_types = ['ReplyKeyboard', 'InlineKeyboard'];
        const option_types = button_types.map((button_type) =>
            <option
                key={button_type}
                value={button_type}>
                    {button_type}
            </option>);
        return (
            <div className="button-creator">
                <select>
                    {option_types}
                </select>
                <select>
                    {option_types}
                </select>
                <button onClick={this.props.cancelCreate}>❌</button>
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
        const button_types = ['ReplyKeyboard', 'InlineKeyboard'];
        const option_types = button_types.map((button_type) =>
            <option
                key={button_type}
                value={button_type}>
                    {button_type}
            </option>);
        return (
            <div>
                <div className="row-select">
                    <span className="title">Кнопки:</span>
                </div>
                <div>
                    <ButtonField />
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
                    <ButtonView />
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
