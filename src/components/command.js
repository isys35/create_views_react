import { SelectWithSettings } from './selects/select-with-settings'

export function SelectCommand(props){
    return <SelectWithSettings
                mainTitle="Комманда"
                changeTitle="Редактировать комманды"
                changeTextTitle="Изменить текст комманды"
                createTitle="Создать комманду"
                deleteTitle="Удалить комманду"
                restURLpath = "commands"
            />
}