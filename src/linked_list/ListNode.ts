export class ListNode<T>{

    constructor(value:T,prev:ListNode<T>|null,next:ListNode<T>|null){
        [this.value,this.prev,this.next] = [value,prev,next];
    }

    prev:ListNode<T>|null;
    next:ListNode<T>|null;
    value:T;
    
}