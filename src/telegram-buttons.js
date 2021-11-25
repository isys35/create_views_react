import React from 'react';
import { Select } from './select.js';
import { SelectWithSettings } from './select-with-settings';


function AddButton(props) {
    return (<div className="tgbutton addbutton" onClick={props.setStatusCreate}>Добавить кнопку</div>)
}


function Button(props) {
    return (<div>
                <button className="tgbutton" disabled="disabled">{props.btnText}</button>
            </div>)
}

function  ButtonFieldView(props) {
        let buttons = props.buttons.map((button) => <Button btnText={button}/>);
        return (<div>
                    {buttons}
                </div>)
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
        this.props.changeWithButtonsStatus();
    }

    addButton(text) {
        this.setState({
            buttons: [...this.state.buttons, text]
        });
    }

    cancelCreate() {
        this.setState({status: 'add'});
        this.props.changeWithButtonsStatus();
    }

    render() {
        if (this.state.status === 'add') {
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


function ButtonSelectWithSettings(props) {
    return <SelectWithSettings
                mainTitle="Выберите кнопку"
                changeTitle="Редактировать кнопки"
                changeTextTitle="Изменить текст кнопки"
                createTitle="Создать кнопку"
                deleteTitle="Удалить кнопку"
                restURLpath="replybuttons"
                onEditStatus={props.onEditStatus}
                onSelectStatus={props.onEditStatus}
           />
}


class ButtonCreater extends React.Component {
    constructor(props) {
        super(props);
        this.state = {status: 'select'};
        this.changeStatus = this.changeStatus.bind(this);
    }

    changeStatus() {
        this.setState(
            {status: (this.state.status === "select") ? "edit" : "select"}
        )
    }

    render() {
        const selectButton = (this.state.status === 'select') ? <div className="create-button-field">
                                                                    <ButtonSelectWithSettings
                                                                        onEditStatus={this.changeStatus}
                                                                        onSelectStatus={this.changeStatus}
                                                                    />
                                                                    <div className="row-select">
                                                                        <div>
                                                                            Подтвердить
                                                                        </div>
                                                                        <div onClick={this.props.cancelCreate}>
                                                                            Отменить
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                              :  <div className="create-button-field">
                                                                    <ButtonSelectWithSettings
                                                                        onEditStatus={this.changeStatus}
                                                                        onSelectStatus={this.changeStatus}
                                                                    />
                                                                </div>
        return selectButton
    }
}


function SelectButtonType(props) {

    const selectType = <Select
                            items={props.buttonTypes}
                            text={props.buttonTypes[0].text}
                            value={props.buttonTypes[0].value}
                            handleChange = {props.onChangeType}
                            inactive={props.inactiveStatus}
                        />
    return <div className="row-select">
                <span className="title">Тип кнопок: </span>
                    {selectType}
            </div>


}


export class ButtonView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {typeButtons: 'ReplyKeyboard', withButtons: false}
        this.changeType = this.changeType.bind(this);
        this.changeWithButtonsStatus = this.changeWithButtonsStatus.bind(this);
    }

    changeType(type) {
        this.setState(
            {typeButtons: type}
        )
    }

    changeWithButtonsStatus() {
        this.setState(
            {withButtons: !this.state.withButtons}
        )
    }

    render() {
        const buttonTypes = [
            {value: 'ReplyKeyboard', text:'ReplyKeyboard'},
            {value: 'InlineKeyboard', text:'InlineKeyboard'}
        ];
        const buttonField = (this.state.typeButtons === 'ReplyKeyboard')
            ? <div>
                <ButtonField
                    typeButtons={this.state.typeButtons}
                    changeWithButtonsStatus={this.changeWithButtonsStatus}
                />
              </div>
            : <div><span>Inline кнопки недоступны</span></div>;
        return (
            <div>
                <SelectButtonType
                    buttonTypes={buttonTypes}
                    onChangeType={this.changeType}
                    inactiveStatus={this.state.withButtons}
                />
                { buttonField }
            </div>
    )
    }
}