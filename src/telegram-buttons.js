import React from 'react';
import { HOST } from './settings';
import { Select } from './select.js';
import { SelectWithSettings } from './select-with-settings';

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
        this.props.changeWithButtonsStatus();
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


// class ButtonCreater extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {text: '', type: 'ReplyKeyboard', mode: 'create'};
//         this.handleChange = this.handleChange.bind(this);
//         this.handleChangeType = this.handleChangeType.bind(this);
//         this.saveButton = this.saveButton.bind(this);
//         this.setSelectMode = this.setSelectMode.bind(this);
//         this.setCreateMode = this.setCreateMode.bind(this);
//     }
//
//
//     handleChange(event) {
//         this.setState({text: event.target.value});
//     }
//
//     handleChangeType(event) {
//         this.setState({type: event.target.value});
//     }
//
//     setSelectMode() {
//         this.setState({mode: 'select'});
//     }
//
//     setCreateMode() {
//         this.setState({mode: 'create'});
//     }
//
//
//     saveButton() {
//         const url = (this.props.typeButtons === 'ReplyKeyboard') ? `${HOST}replybuttons` :  `${HOST}inlinebuttons`;
//          fetch(url,
//             {
//                 method: 'POST',
//                 body: JSON.stringify({
//                     value: this.state.text
//                     }),
//                 headers: {"Content-type": "application/json; charset=UTF-8"}})
//             .then(async res => {
//                 let result = await res.json();
//                 if (!res.ok) {
//                     console.log(result.detail);
//                 } else {
//                     this.props.addButton(this.state.text);
//                     this.props.cancelCreate();
//                 }
//             })
//     }
//
//
//     render() {
//         const inputBlock = (this.state.mode === 'create') ? <input onChange={this.handleChange} type="text" value={this.state.text}/> : <button></button>
//         const changeModeBlock = (this.state.mode === 'create') ? <button onClick={this.setSelectMode}>🔎</button> : <button onClick={this.setCreateMode}>✏️</button>
//         return (
//             <div className="button-creator">
//                 <Button btnText={this.state.text}/>
//                 {inputBlock}
//                 <button onClick={this.saveButton}>💾</button>
//                 <button onClick={this.props.cancelCreate}>❌</button>
//                 {changeModeBlock}
//             </div>
//     )
//     }
//
// }


class ButtonCreater extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <SelectWithSettings
                mainTitle="Выберите кнопку"
                changeTitle="Редактировать кнопки"
                changeTextTitle="Изменить текст кнопки"
                createTitle="Создать кнопку"
                deleteTitle="Удалить кнопку"
                restURLpath="replybuttons"
                />
    }
}


class SelectButtonType extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const selectType = <Select
                                items={this.props.buttonTypes}
                                text={this.props.buttonTypes[0].text}
                                value={this.props.buttonTypes[0].value}
                                handleChange = {this.props.onChangeType}
                                inactive={this.props.inactiveStatus}
                            />
        return <div className="row-select">
                    <span className="title">Тип кнопок: </span>
                        {selectType}
                </div>

    }

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
        console.log(this.state.typeButtons);
        const buttonField = (this.state.typeButtons == 'ReplyKeyboard')
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