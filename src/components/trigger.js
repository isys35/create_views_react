import { Select } from './selects/select/select.js';
import { SelectCommand } from './command'
import './trigger.css'


function ViewTrigger(props) {
    return (<div>
                <div className="trigger-view">
                    <span className="title">Представление:</span>
                </div>
            </div>
    )
}


export function SelectTrigger(props) {
    return (
        <div className="select-trigger">
            <span className="title">Условие выполнения:</span>
            <Select items={props.executionConditions}
                    text={props.executionConditions[0].text}
                    value={props.executionConditions[0].value}
                    handleChange={props.handleChange}
            />
        </div>
    )
}


export function Trigger(props) {
    const trigger = props.trigger
    const component = (trigger === 'command-trigger') ?   <SelectCommand setSelectedCommand={props.setSelectedCommand}/>
                                                       :   <ViewTrigger />
    return component
}