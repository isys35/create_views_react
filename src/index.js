import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MainSaveButton } from './components/buttons/edit_buttons/edit-buttons';
import { CancelButton } from './components/buttons/edit_buttons/edit-buttons';
import { ButtonView } from  './components/buttons/tg_buttons/telegram-buttons';
import { TextView } from './components/text-view'
import { SelectTrigger } from  './components/trigger';
import { Trigger } from  './components/trigger';

const executionConditions = [
    {text:"команда", value:'command-trigger'},
    {text:"представление", value:'view-trigger'},
]





class CreateViewMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger: executionConditions[0].value,
            selected_command: null,
            text: null,
            textError: false,
            buttons: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.setSelectedCommand = this.setSelectedCommand.bind(this);
        this.setInputedText = this.setInputedText.bind(this);
        this.addButton = this.addButton.bind(this);
        this.createStep = this.createStep.bind(this);
    }

    handleChange(value) {
        this.setState({trigger: value});
    }
    
    setSelectedCommand(command_id) {
        this.setState({selected_command: command_id});
    };
    
    setInputedText(text) {
        this.setState({text: text});
    }
    
    addButton(id) {
        this.setState({
            buttons: [...this.state.buttons, id]
        });
    }

    validate() {
        if (!this.state.text) {
            this.setState({textError: true})
            return
        } 
    }

    createStep() {
        this.validate();
    }

    render() {
        const executionConditions = this.props.executionConditions;
        console.log(this.state.buttons);
        return (
            <div className="container">
                <h1>Cоздание шага</h1>
                <div className="create-view">
                    <SelectTrigger executionConditions={executionConditions} handleChange={this.handleChange} />
                    <Trigger trigger={this.state.trigger} setSelectedCommand={this.setSelectedCommand}/>
                    <TextView textError={this.state.textError} setInputedText={this.setInputedText} />
                    <ButtonView addButton={this.addButton}/>
                    <div className="row-save-button">
                        <MainSaveButton onClick={this.createStep}/>
                    </div>
                </div>
            </div>);
    }
}


ReactDOM.render(
  <CreateViewMain executionConditions={executionConditions} />,
  document.getElementById('root')
);
