import { HLList } from "../linked_list/HLList";

export interface ListUtil{
    <T>(linkedList:HLList<T>,...parameter:any[]):void;
}