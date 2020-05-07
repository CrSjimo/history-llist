import { HLList } from "./HLList";
import { ListNode } from "./ListNode";

function _push<T>(linkedList:HLList<T>,value:T){
    let tail = new ListNode(value,linkedList.tail,null);
    if(linkedList.tail){
        linkedList.tail.next = tail;
    }else{
        linkedList.head = tail;
    }
    linkedList.tail = tail;
}

export function push<T>(linkedList:HLList<T>,...values:T[]){
    for(let value of values){
        _push(linkedList,value);
    }
}

export function pop<T>(linkedList:HLList<T>){
    if(linkedList.tail){
        linkedList.tail = linkedList.tail.prev;
        if(linkedList.tail){
            linkedList.tail.next = null;
        }else{
            linkedList.head = null;
        }
    }
}

function _unshift<T>(linkedList:HLList<T>,value:T){
    let head = new ListNode(value,null,linkedList.head);
    if(linkedList.head){
        linkedList.head.prev = head;
    }else{
        linkedList.tail = head;
    }
    linkedList.head = head;
}

export function unshift<T>(linkedList:HLList<T>,...values:T[]){
    for(let value of values.reverse()){
        _unshift(linkedList,value);
    }
}

export function shift<T>(linkedList:HLList<T>){
    if(linkedList.head){
        linkedList.head = linkedList.head.next;
        if(linkedList.head){
            linkedList.head.prev = null;
        }else{
            linkedList.tail = null;
        }
    }
}

export function insertAfter<T>(linkedList:HLList<T>,destination:number,...values:T[]){
    if(destination==-1){
        unshift(linkedList,...values);
        return;
    }
    let nodeStart = linkedList.nodeAt(destination);
    if(nodeStart == null){
        throw new RangeError('Index overflowed.');
    };
    let nodeEnd = nodeStart.next;
    let ptr = nodeStart;
    for(let value of values){
        let node = new ListNode(value,ptr,null);
        ptr.next = node;
        ptr=node;
    }
    if(nodeEnd!=null){
        ptr.next = nodeEnd;
        nodeEnd.prev = ptr;
    }else{
        linkedList.tail = ptr;
    }
}

export function removeRange<T>(linkedList:HLList<T>,start:number,end:number){
    let nodeStart = linkedList.nodeAt(start-1);
    let nodeEnd = linkedList.nodeAt(end);
    if(start < 0 || end > linkedList.length || start>end){
        throw new RangeError(`Index overflowed.`);
    }
    if(nodeStart != null){
        nodeStart.next = nodeEnd;
    }else{
        linkedList.head = nodeEnd;
    }
    if(nodeEnd != null){
        nodeEnd.prev = nodeStart;
    }else{
        linkedList.tail = nodeStart;
    }
}

export function set<T>(linkedList:HLList<T>,index:number,value:T){
    let node = linkedList.nodeAt(index);
    if(node!=null){
        node.value = value;
    }else{
        throw new RangeError('Index overflowed.');
    }
}