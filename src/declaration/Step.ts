import { Command } from "./Command";

export interface Step<T>{
    label?:string;
    commands:Command<T>[];
}