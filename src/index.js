import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MainSaveButton } from './components/buttons/edit_buttons/edit-buttons';
import { CancelButton } from './components/buttons/edit_buttons/edit-buttons';
import { ButtonView } from  './components/buttons/tg_buttons/telegram-buttons';
import { TextView } from './components/text-view'
import { SelectTrigger } from  './components/trigger';
import { Trigger } from  './components/trigger';
import { HOST } from './settings';
import { BotSettings } from './components/bot-settings/bot-settings'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

const executionConditions = [
    {text:"команда", value:'command-trigger'},
    {text:"представление", value:'view-trigger'},
]


class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="main-menu">
                <h2 className="main-menu__header">Меню</h2>
                <ul className="main-menu__list">
                    <li className="main-menu__list-item"><a href="/">Главное меню</a></li>
                    <li className="main-menu__list-item"><a href="/create-step">Создание шага</a></li>
                    <li className="main-menu__list-item"><a href="/bot-settings">Настройка ботов</a></li>
                </ul>
            </nav>
        )
    }
}



class CreateViewMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger: executionConditions[0].value,
            selected_command: null,
            input_id: null,
            text: null,
            textError: false,
            buttons: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.setSelectedCommand = this.setSelectedCommand.bind(this);
        this.setInputedText = this.setInputedText.bind(this);
        this.addButton = this.addButton.bind(this);
        this.createStep = this.createStep.bind(this);
        this.clearTextError = this.clearTextError.bind(this);
        this.updateInputOnCommandSelect = this.updateInputOnCommandSelect.bind(this);
    }

    updateInputOnCommandSelect(command_id) {
        const url = `${HOST}inputs/?type=command&command_id=${command_id}`;
        fetch(url,
            {
                method: 'GET',
            })
            .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({input_id: result['id']});
                        }
                    )

    }

    handleChange(value) {
        if (value == 'view-trigger') {
            this.setState({trigger: value, input_id: null, selected_command: null});
        } else {
            this.setState({trigger: value});
        }
    }
    
    setSelectedCommand(command_id) {
        this.setState({selected_command: command_id});
        this.updateInputOnCommandSelect(command_id);
    };
    
    setInputedText(text) {
        this.setState({text: text});
    }
    
    addButton(id) {
        this.setState({
            buttons: [...this.state.buttons, id]
        });
    }

    clearTextError() {
        this.setState({textError: false});
    }

    validate() {
        if (!this.state.text) {
            this.setState({textError: true})
            return false
        }
        return true
    }

    createStep() {
        if (this.validate()) {
            console.log(this.state.input_id);
            console.log(this.state.text);
        }
    }


    render() {
        const executionConditions = this.props.executionConditions;
        console.log(this.state.input_id);
        return (
            <div className="container">
                <h1>Cоздание шага</h1>
                <div className="create-view">
                    <SelectTrigger executionConditions={executionConditions} handleChange={this.handleChange} />
                    <Trigger trigger={this.state.trigger} setSelectedCommand={this.setSelectedCommand}/>
                    <TextView textError={this.state.textError} clearTextError={this.clearTextError} setInputedText={this.setInputedText} />
                    <ButtonView addButton={this.addButton}/>
                    <div className="row-save-button">
                        <MainSaveButton onClick={this.createStep}/>
                    </div>
                </div>
            </div>);
    }
}


class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path="create-step" element={<CreateViewMain executionConditions={executionConditions}/>}></Route>
                    <Route path="bot-settings" element={<BotSettings />}></Route>
                </Routes>
            </BrowserRouter>
        )
    }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
