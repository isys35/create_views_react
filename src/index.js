import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Select } from './select.js';
import { Load } from './load.js';

const HOST = 'http://127.0.0.1:8000/'

const executionConditions = [
    {text:"команда", value:'command-trigger'},
    {text:"представление", value:'view-trigger'},
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
        this.state = {options: [], selectedId: null, isLoaded: false};
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
                                options: result.map((item) => { return {text: item.value, value: item.id} }),
                                isLoaded: true
                            });
                        } else {
                            console.log(result);
                        }
                        }
                    )


    }

    render() {
        if (this.state.isLoaded) {
            return (<div>
                    <Select items={this.state.options} text={this.state.options[0].text} value={this.state.options[0].value} />
                    {/*<select onChange={this.handleChangeSelectedCommand}>*/}
                    {/*    {this.state.options}*/}
                    {/*</select>*/}
                    <button onClick={this.props.handleChange}>🛠️</button>
                </div>
            )
        } else {
            return (<Load />)
        }
    }
}
    

function SelectCommand(props) {
    return (<div className="row-select">
                <span className="title">Комманда:</span>
                <div>
                    <CommandOptions setSelectedCommand={props.setSelectedCommand} handleChange={props.handleChange}/>
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
        const url = `${HOST}commands/`;
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
            <textarea className="textview-input"></textarea>
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
                    <span className="title">Представление:</span>
                </div>
            </div>
    )
}

class AddButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className="tgbutton addbutton" onClick={this.props.setStatusCreate}>Добавить кнопку</div>)
    }
}


class Button extends  React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
                    <button className="tgbutton" disabled="disabled">{this.props.btnText}</button>
                </div>)
    }

}

class  ButtonFieldView extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let buttons = this.props.buttons.map((button) => <Button btnText={button}/>);
        return (<div>
                    {buttons}
                </div>)
    }

}


class ButtonField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {status: 'add', buttons: []};
        this.setStatusCreate = this.setStatusCreate.bind(this);
        this.cancelCreate = this.cancelCreate.bind(this);
        this.addButton = this.addButton.bind(this);

    }

    setStatusCreate() {
        this.setState({status: 'create'});
    }

    addButton(text) {
        this.setState({
            buttons: [...this.state.buttons, text]
        });
    }

    cancelCreate() {
        this.setState({status: 'add'});
    }

    render() {
        if (this.state.status == 'add') {
            return  <div>
                        <ButtonFieldView buttons={this.state.buttons} />
                        <AddButton setStatusCreate={this.setStatusCreate} />
                    </div>
        } else {
            return <div>
                        <ButtonFieldView buttons={this.state.buttons} />
                        <ButtonCreater cancelCreate={this.cancelCreate} addButton={this.addButton}/>
                    </div>

        };
    }
}


class ButtonCreater extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: '', type: 'ReplyKeyboard', mode: 'create'};
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.saveButton = this.saveButton.bind(this);
        this.setSelectMode = this.setSelectMode.bind(this);
        this.setCreateMode = this.setCreateMode.bind(this);
    }
    
    
    handleChange(event) {
        this.setState({text: event.target.value});
    }

    handleChangeType(event) {
        this.setState({type: event.target.value});
    }

    setSelectMode() {
        this.setState({mode: 'select'});
    }

    setCreateMode() {
        this.setState({mode: 'create'});
    }


    saveButton() {
        const url = (this.props.typeButtons === 'ReplyKeyboard') ? `${HOST}replybuttons` :  `${HOST}inlinebuttons`;
         fetch(url,
            {
                method: 'POST',
                body: JSON.stringify({
                    value: this.state.text
                    }),
                headers: {"Content-type": "application/json; charset=UTF-8"}})
            .then(async res => {
                let result = await res.json();
                if (!res.ok) {
                    console.log(result.detail);
                } else {
                    this.props.addButton(this.state.text);
                    this.props.cancelCreate();
                }
            })
    }


    render() {
        const inputBlock = (this.state.mode === 'create') ? <input onChange={this.handleChange} type="text" value={this.state.text}/> : <button></button>
        const changeModeBlock = (this.state.mode === 'create') ? <button onClick={this.setSelectMode}>🔎</button> : <button onClick={this.setCreateMode}>✏️</button>
        return (
            <div className="button-creator">
                <Button btnText={this.state.text}/>
                {inputBlock}
                <button onClick={this.saveButton}>💾</button>
                <button onClick={this.props.cancelCreate}>❌</button>
                {changeModeBlock}
            </div>
    )
    }

}


class ButtonView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {typeButtons: 'ReplyKeyboard'}
    }

    render() {
        const button_types = [
            {value: 'ReplyKeyboard', text:'ReplyKeyboard'},
            {value: 'InlineKeyboard', text:'InlineKeyboard'}
        ];
        // const option_types = button_types.map((button_type) => {
        //     let option = (button_type === this.state.typeButtons) ? <option
        //                                                     key={button_type}
        //                                                     value={button_type} selected>
        //                                                     {button_type}
        //                                                 </option>
        //                                                 : <option
        //                                                     key={button_type}
        //                                                     value={button_type}>
        //                                                     {button_type}
        //                                                 </option>;
        //     return option
        // }
        //     );
        return (
            <div>
                <div className="row-select">
                    <span className="title">Тип кнопок: </span>
                    <Select items={button_types} text={button_types[0].text} value={button_types[0].value}/>
                    {/*<select>*/}
                    {/*    {option_types}*/}
                    {/*</select>*/}
                </div>
                <div>
                    <ButtonField typeButtons={this.state.typeButtons} />
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
                                value={executionConditions[0].value} handleChange={this.handleChange} />
                        {/*<select className="form-control" onChange={this.handleChange}>*/}
                        {/*    {options}*/}
                        {/*</select>*/}
                    </div>
                    <Trigger trigger={this.state.trigger}/>
                    <TextView />
                    <ButtonView />
                    <div className="row-save-button">
                        <div className="save-button">
                        <svg id="Floppy-disk" viewBox="0 0 64 64" x="0px" y="0px">
                            <g>
	                            <path d="M35.2673988,6.0411h-7.9999981v10h7.9999981V6.0411z M33.3697014,14.1434002h-4.2046013V7.9387999h4.2046013V14.1434002z"/>
	                            <path d="M41,47.0410995H21c-0.5527992,0-1,0.4472008-1,1c0,0.5527,0.4472008,1,1,1h20c0.5527,0,1-0.4473,1-1C42,47.4883003,41.5527,47.0410995,41,47.0410995z"/>
	                            <path d="M41,39.0410995H21c-0.5527992,0-1,0.4472008-1,1c0,0.5527,0.4472008,1,1,1h20c0.5527,0,1-0.4473,1-1C42,39.4883003,41.5527,39.0410995,41,39.0410995z"/>
	                            <path d="M12,56.0410995h38v-26H12V56.0410995z M14,32.0410995h34v22H14V32.0410995z"/>
	                            <path d="M49.3811989,0.0411L49.3610992,0H7C4.7908001,0,3,1.7909,3,4v56c0,2.2092018,1.7908001,4,4,4h50c2.2090988,0,4-1.7907982,4-4V11.6962996L49.3811989,0.0411z M39.9604988,2.0804999v17.9211006H14.0394001V2.0804999H39.9604988zM59,60c0,1.1027985-0.8972015,2-2,2H7c-1.1027999,0-2-0.8972015-2-2V4c0-1.1027999,0.8972001-2,2-2h5v20.0410995h30V2h6.5099983L59,12.5228996V60z"/>
                            </g>
                        </svg>
                    </div>
                    </div>
                </div>
            </div>);
    }
}


ReactDOM.render(
  <CreateViewMain executionConditions={executionConditions} />,
  document.getElementById('root')
);
