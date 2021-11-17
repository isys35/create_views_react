import React from 'react';
import { HOST } from './settings';
import { SettingsButton, EditButton, CancelButton, SaveButton } from './action-buttons';
import { Select } from './select';
import { Load } from './load';

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



function MainMenuChangeCommands(props) {
    return (
        <div className="row-select">
            <span className="title">Редактировать комманды:</span>
            <div>
                <CommandOptions
                    setSelectedCommand={props.setSelectedCommand}
                    handleCancelChange={props.handleCancelChange}
                    handleEdit={props.handleEdit}
                    commandId={props.commandId}
                    type='edit'
                />
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
                <span className="title">Изменить текст комманды:</span>
                <div className="command-field">
                    <input type="text" value={this.state.commandName} onChange={this.handleChange}/>
                </div>
                <div className="buttons">
                        <SaveButton onClick={this.handleSaveChange} />
                        <CancelButton  onClick={this.props.handleCancel}/>
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

class CommandOptions extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {options: [], selectedId: null, selectedText:null, isLoaded: false};
        this.handleChangeSelectedCommand = this.handleChangeSelectedCommand.bind(this);
    }
    
    handleChangeSelectedCommand(value) {
        this.props.setSelectedCommand(value);
    }

    componentDidMount() {
        fetch(HOST + 'commands')
            .then(res => res.json())
                .then(
                    (result) => {
                        if (result.length !== 0) {
                            let selectedCommandid = result[0].id;
                            let selectedText = result[0].value;
                            if (this.props.commandId) {
                                selectedCommandid = this.props.commandId;
                                for (let i = 0; i < result.length; i++) {
                                    if (selectedCommandid == result[i].id) {
                                        selectedText = result[i].value;
                                        break
                                    }
                                }
                            }
                            this.props.setSelectedCommand(selectedCommandid);
                            this.setState({
                                options: result.map((item) => { return {text: item.value, value: item.id} }),
                                selectedId: selectedCommandid,
                                selectedText: selectedText,
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
            const buttons = (this.props.type == 'select') ?
                <SettingsButton onClick={this.props.handleChange}/> :
                <div className="buttons">
                    <EditButton  onClick={this.props.handleEdit}/>
                    <CancelButton onClick={this.props.handleCancelChange}/>
                </div>;
            return (<div className="command-field">
                    <Select items={this.state.options}
                            text={this.state.selectedText}
                            value={this.state.selectedId}
                            handleChange={this.handleChangeSelectedCommand} />
                    {buttons}
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
                    <CommandOptions setSelectedCommand={props.setSelectedCommand} handleChange={props.handleChange} type='select'/>
                </div>
            </div>
            )
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
                return <MainMenuChangeCommands
                            setSelectedCommand={this.props.setSelectedCommand}
                            handleDelete={this.handleDelete}
                            handleCancelChange={this.props.handleCancelChange}
                            handleEdit = {this.handleEdit}
                            handleAdd = {this.handleAdd}
                            commandId={this.props.commandId}
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

export class CommandTrigger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {action: 'select', selectedCommandId: null};
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
                setSelectedCommand={this.setSelectedCommand}
            /> :
            <ChangeCommands
                handleCancelChange={this.handleCancelChange}
                handleDelete={this.handleDelete}
                setSelectedCommand={this.setSelectedCommand}
                commandId={this.state.selectedCommandId}
            />
    }

}