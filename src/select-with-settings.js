import React from 'react';
import { HOST } from './settings';
import { SettingsButton,
    EditButton,
    CancelButton,
    SaveButton,
    AddButton,
    DeleteButton,
    ConfirmButton } from './action-buttons';
import { Select } from './select';
import { Load } from './load';


export class SelectWithSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {action: 'select', selectedId: null};
        this.handleChange = this.handleChange.bind(this);
        this.handleCancelChange = this.handleCancelChange.bind(this);
        this.setSelectedId = this.setSelectedId.bind(this);
    }

    setSelectedId(id) {
        this.setState(
            {
                selectedId: id,
            }
        );
    }

    handleChange() {
        this.setState({action: 'change'});
        if (this.props.onEditStatus) {
            this.props.onEditStatus();
        }
    }

    handleCancelChange() {
        this.setState({action: 'select'});
        if (this.props.onSelectStatus) {
            this.props.onSelectStatus();
        }
    }

    render() {
        return (this.state.action === 'select') ?
            <SelectMenu
                restURLpath={this.props.restURLpath}
                mainTitle = {this.props.mainTitle}
                handleChange={this.handleChange}
                setSelectedId={this.setSelectedId}
            /> :
            <ChangeMenu
                restURLpath={this.props.restURLpath}
                changeTextTitle={this.props.changeTextTitle}
                changeTitle={this.props.changeTitle}
                deleteTitle={this.props.deleteTitle}
                handleCancelChange={this.handleCancelChange}
                handleDelete={this.handleDelete}
                setSelectedId={this.setSelectedId}
                id={this.state.selectedId}
            />
    }

}

function SelectMenu(props) {
    return (<div className="row-select">
                <span className="title">{props.mainTitle} :</span>
                <div>
                    <Options
                        restURLpath={props.restURLpath}
                        setSelectedId={props.setSelectedId}
                        handleChange={props.handleChange}
                        type='select'/>
                </div>
            </div>
            )
}


class ChangeMenu extends React.Component {
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
                            restURLpath={this.props.restURLpath}
                            changeTitle={this.props.changeTitle}
                            setSelectedId={this.props.setSelectedId}
                            handleDelete={this.handleDelete}
                            handleCancelChange={this.props.handleCancelChange}
                            handleEdit = {this.handleEdit}
                            handleAdd = {this.handleAdd}
                            id={this.props.id}
                        />
            case 'delete':
                return <Delete
                            restURLpath={this.props.restURLpath}
                            deleteTitle={this.props.deleteTitle}
                            handleCancel={this.handleCancel}
                            id={this.props.id}
                        />
            case 'edit':
                return <Edit
                            restURLpath={this.props.restURLpath}
                            changeTextTitle={this.props.changeTextTitle}
                            handleCancel={this.handleCancel}
                            id={this.props.id}
                        />
            case 'add':
                return <Add
                            restURLpath={this.props.restURLpath}
                            handleCancel={this.handleCancel}
                        />
            default:
                // do nothing
        }
    }
}



class Options extends React.Component {

    constructor(props) {
        super(props);
        this.state = {options: [], selectedId: null, selectedText:null, isLoaded: false};
        this.handleChangeSelected = this.handleChangeSelected.bind(this);
    }

    handleChangeSelected(value) {
        this.props.setSelectedId(value);
    }

    updateOptions(data) {
        let selectedId = data[0].id;
        let selectedText = data[0].value;
        if (this.props.id) {
            selectedId = this.props.id;
            for (let i = 0; i < data.length; i++) {
                if (selectedId === data[i].id) {
                    selectedText = data[i].value;
                    break;
                }
            }
        }
        this.props.setSelectedId(selectedId);
        this.setState({
            options: data.map((item) => { return {text: item.value, value: item.id} }),
            selectedId: selectedId,
            selectedText: selectedText,
            isLoaded: true
        });
    }

    componentDidMount() {
        fetch(HOST + this.props.restURLpath)
            .then(
                (response) => {
                    if (response.status !== 200) {
                        console.log("Request problem with status code" + response.status);
                        return
                    }
                    response.json().then(
                        (data) => {
                            this.updateOptions(data);
                        }
                    )
                }
            )
            .catch(
                (error) => {
                    console.log("Error: ", error);
                }
            )
    }

    render() {
        if (this.state.isLoaded) {
            const buttons = (this.props.type === 'select') ?
                <SettingsButton onClick={this.props.handleChange}/> :
                <div className="buttons">
                    <EditButton  onClick={this.props.handleEdit}/>
                    <AddButton onClick={this.props.handleAdd}/>
                    <DeleteButton onClick={this.props.handleDelete}/>
                    <CancelButton onClick={this.props.handleCancelChange}/>
                </div>;
            return (<div className="command-field">
                    <Select items={this.state.options}
                            text={this.state.selectedText}
                            value={this.state.selectedId}
                            handleChange={this.handleChangeSelected} />
                    {buttons}
                </div>
            )
        } else {
            return (<Load />)
        }
    }
}

function MainMenuChange(props) {
    return (
        <div className="row-select">
            <span className="title">{props.changeTitle + ':'}</span>
            <div>
                <Options
                    restURLpath={props.restURLpath}
                    setSelectedId={props.setSelectedId}
                    handleCancelChange={props.handleCancelChange}
                    handleEdit={props.handleEdit}
                    handleAdd={props.handleAdd}
                    handleDelete={props.handleDelete}
                    id={props.id}
                    type='edit'
                />
            </div>
        </div>
    )
}


class Delete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: null};
        this.handleDelete = this.handleDelete.bind(this);
    }

        componentDidMount() {
            fetch(`${HOST}${this.props.restURLpath}/${this.props.id}`)
                .then(
                    (response) => {
                        if (response.status !== 200) {
                            console.log("Request problem with status code" + response.status);
                            return
                        }
                        response.json().then(
                            (data) => {
                                this.setState({name: data.value});
                            }
                        )
                    }
                )
                .catch(
                    (error) => {
                        console.log("Error: ", error);
                    }
                )
    }


    handleDelete() {
        const url = `${HOST}${this.props.restURLpath}/${this.props.id}`;
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
                <span className="title">{this.props.deleteTitle} "{this.state.name}" ?</span>
                <div>
                    <div className="buttons">
                        <ConfirmButton onClick={this.handleDelete} />
                        <CancelButton onClick={this.props.handleCancel} />
                    </div>
                </div>
            </div>
        )
    }

}

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSaveChange = this.handleSaveChange.bind(this);

    }

    componentDidMount() {
        const url = `${HOST}${this.props.restURLpath}/${this.props.id}`
        fetch(url)
            .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({name: result.value});
                        }
                    )
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleSaveChange() {
        const url = `${HOST}${this.props.restURLpath}/${this.props.id}`
        fetch(url,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    value: this.state.name
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
                <span className="title">{this.props.changeTextTitle}:</span>
                <div className="command-field">
                    <input type="text" value={this.state.name} onChange={this.handleChange}/>
                </div>
                <div className="buttons">
                        <SaveButton onClick={this.handleSaveChange} />
                        <CancelButton  onClick={this.props.handleCancel}/>
                </div>
            </div>
        )
    }

}


class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);

    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleCreate() {
        const url = `${HOST}${this.props.restURLpath}/`;
        fetch(url,
            {
                method: 'POST',
                body: JSON.stringify({
                    value: this.state.name
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
                <div className="command-field">
                    <input type="text" value={this.state.name} onChange={this.handleChange}/>
                </div>
                <div className="buttons">
                    <SaveButton onClick={this.handleCreate}/>
                    <CancelButton onClick={this.props.handleCancel}/>
                </div>
            </div>
        )
    }

}