import React from 'react';
import './bot-settings.css';
import {CancelButton, ConfirmButton} from "../buttons/edit_buttons/edit-buttons";


class BotCreater extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 'add-btn'
        }
        this.toInputDataStep = this.toInputDataStep.bind(this);
        this.cancelCreate = this.cancelCreate.bind(this);
    }

    toInputDataStep() {
        this.setState({step: 'input-data'});
    }


    cancelCreate() {
        this.setState({step: 'add-btn'});
    }

    render() {
        let step;
        // eslint-disable-next-line default-case
        switch (this.state.step) {
            case 'add-btn':
                step = <div className="green-create-btn create-bot" onClick={this.toInputDataStep}>
                                Добавить бота
                            </div>;
            break;
            case 'input-data':
                step = <div className="create-bot input-data">
                            <input className="input-bot" type="text" placeholder="Введите токен бота"/>
                            <ConfirmButton/>
                            <CancelButton onClick={this.cancelCreate}/>
                        </div>;
            break;
        }
        return (
            <div className="add-bot-block">
                {step}
            </div>
        )
    }
}

export class BotSettings extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <h1>Настройки ботов</h1>
                <div className="bot-settings">
                    <BotCreater/>
                </div>
            </div>
            )
    }
}