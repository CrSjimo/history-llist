import { CreateLinkedListOptions } from "../declaration/CreateLinkedListOptions";
import { Command } from "../declaration/Command";
import { ListNode } from "./ListNode";
import { Step } from "../declaration/Step";
import * as llUtils from "./linked_list_utils";

/**
 * History Linked List
 */
export class HLList<T>{

    constructor(fromArray?:T[],options?:CreateLinkedListOptions){
        this.maxHistory = options?.maxHistory||10;
        if(fromArray){
            llUtils.push(this,...fromArray);
        }
    }

    maxHistory:number;
    head:ListNode<T>|null = null;
    tail:ListNode<T>|null = null;
    protected _length = -1;
    get length(){
        if(this._length!=-1){
            return this._length;
        }
        let index=0;
        for(let value of this){
            index++;
        }
        this._length = index;
        return index;
    }


    /*========iteration========*/
    
    /**
     * Call a function on each item in the linked list.
     * @param fn A function to call.
     * @param thisArg An object to which the this keyword can refer in the fn function. If thisArg is omitted, undefined is used.
     */
    forEach(fn:(value:T,index:number,list:this)=>void,thisArg?:any){
        let ptr:ListNode<T>|null = this.head;
        let index = 0;
        while(ptr!=null){
            fn.call(thisArg,ptr.value,index++,this);
            ptr = ptr.next;
        }
    }

    /**
     * Call a function on each item in the linked list.(in reverse order)
     * @param fn A function to call.
     * @param thisArg An object to which the this keyword can refer in the fn function. If thisArg is omitted, undefined is used.
     */
    forEachReverse(fn:(value:T,index:number,list:this)=>void,thisArg:any=fn){
        let ptr:ListNode<T>|null = this.tail;
        let index = this.length;
        while(ptr!=null){
            fn.call(thisArg,ptr.value,--index,this);
            ptr = ptr.prev;
        }
    }

    toArray(){
        let arr:T[] = [];
        for(let value of this){
            arr.push(value);
        }
        return arr;
    }

    *[Symbol.iterator](){
        let ptr = this.head;
        while(ptr!=null){
            yield ptr.value;
            ptr = ptr.next;
        }
    }

    /*========accessor========*/

    /**
     * Get the i-th item.
     * @param index index
     * @returns the i-th item or null
     */
    at(index:number){
        if(index<0){
            return null;
        }
        for(let value of this){
            if(index==0){
                return value;
            }
            index--;
        }
        return null;
    }

    nodeAt(index:number){
        for(let ptr=this.head,i=0;ptr!=null;ptr=ptr.next,i++){
            if(i==index){
                return ptr;
            }
        }
        return null;
    }

    /**
     * Returns the index of the first occurrence of a value in an array.
     * @param target The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
     */
    indexOf(target:T,fromIndex:number = 0){
        let index = 0;
        for(let value of this){
            if(index<fromIndex){
                index++;
                continue;
            }
            if(value==target){
                return index;
            }
            index++;
        }
        return -1;
    }

    /**
     * Returns the index of the last occurrence of a value in an array.
     * @param target The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index.
     */
    lastIndexOf(target:T,fromIndex:number = this.length){
        let index = this.length-1;
        for(let ptr = this.tail;ptr!=null;ptr = ptr.prev,index--){
            if(index>fromIndex)continue;
            if(ptr.value == target){
                return index;
            }
        }
        return -1;
    }

    slice(start:number = 0,end:number = Infinity){
        let ret:T[] = [];
        for(let ptr=this.head,i=0;ptr!=null&&i<end;ptr=ptr.next,i++){
            if(i<start){
                continue;
            }
            ret.push(ptr.value);
        }
        return ret;
    }

    protected undoStack: Step<T>[] = [];
    protected redoStack: Step<T>[] = [];

    execute(...commands:Command<T>[]){
        this._length = -1;
    }

}