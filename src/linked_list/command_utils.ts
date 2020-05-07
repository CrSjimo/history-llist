import { ParamTypeMap, Commands, Command, CorrespondingCommandMap, assertCommandType } from "../declaration/Command";
import * as llUtils from "./linked_list_utils";
import { HLList } from "./HLList";

export function cmd<K extends Commands>(name: K){
    return function<T>(...parameter: ParamTypeMap<T>[K]):Command<T,K>{
        return {
            name,parameter
        }
    }
}

export const commandHandlers = {
    [Commands.push]: llUtils.push,
    [Commands.pop]: llUtils.pop,
    [Commands.unshift]: llUtils.unshift,
    [Commands.shift]: llUtils.shift,
    [Commands.insertAfter]: llUtils.insertAfter,
    [Commands.removeRange]: llUtils.removeRange,
    [Commands.set]: llUtils.set,
}

export function getCorrespondingCommand<T,K extends Commands>(linkedList:HLList<T>,command:Command<T,K>): Command<T, CorrespondingCommandMap[K]>[]{
    let commandList:Command<T,Commands>[] = [];
    if(assertCommandType(command,Commands.push)){
        for(let i = 0;i<command.parameter.length;i++){
            commandList.push({
                name: Commands.pop,
                parameter: [],
            });
        }
    }else if(assertCommandType(command,Commands.pop)){
        if(linkedList.tail!=null){
            commandList.push({
                name: Commands.push,
                parameter: [linkedList.tail.value],
            });
        }
    }else if(assertCommandType(command,Commands.unshift)){
        for(let i = 0;i<command.parameter.length;i++){
            commandList.push({
                name: Commands.shift,
                parameter: [],
            });
        }
    }else if(assertCommandType(command,Commands.shift)){
        if(linkedList.head!=null){
            commandList.push({
                name: Commands.unshift,
                parameter: [linkedList.head.value],
            });
        }
    }else if(assertCommandType(command,Commands.insertAfter)){
        commandList.push({
            name: Commands.removeRange,
            parameter: [command.parameter[0]+1,command.parameter[0]+command.parameter.length],
        });
    }else if(assertCommandType(command,Commands.removeRange)){
        commandList.push({
            name: Commands.insertAfter,
            parameter: [command.parameter[0]-1,...linkedList.slice(command.parameter[0],command.parameter[1])],
        });
    }else if(assertCommandType(command,Commands.set)){
        commandList.push({
            name: Commands.set,
            parameter: [command.parameter[0], linkedList.at(command.parameter[0])!],
        })
    }
    return commandList as any;  //Type already declared in function declaration
}