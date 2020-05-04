export enum Commands{
    push,pop,unshift,shift,insertAfter,removeRange,set
}
export interface ParamTypeMap<T>{
    [Commands.push]: [...T[]];
    [Commands.pop]: [];
    [Commands.unshift]: [...T[]];
    [Commands.shift]: [];
    [Commands.insertAfter]: [number, ...T[]];
    [Commands.removeRange]: [number?,number?];
    [Commands.set]: [number,T];
}
export interface CorrespondingCommandMap{
    [Commands.push]: Commands.pop;
    [Commands.pop]: Commands.push;
    [Commands.unshift]: Commands.shift;
    [Commands.shift]: Commands.unshift;
    [Commands.insertAfter]: Commands.removeRange;
    [Commands.removeRange]: Commands.insertAfter;
    [Commands.set]: Commands.set;
}
export interface Command<T,K extends Commands = any>{
    name: K;
    parameter: ParamTypeMap<T>[K];
}
export function assertCommandType<T,K extends Commands>(command:Command<T,any>,name: K):command is Command<T,K>{
    return command.name == name;
}