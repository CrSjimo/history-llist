import { HLList } from "../linked_list/HLList";
import {expect} from "chai";

describe('iteration and access',()=>{
    it('create',()=>{
        let arr = [1,2,3,4,5];
        let ll = new HLList(arr);
        expect(ll.toArray()).deep.equal(arr);
        expect(ll.head?.value).equal(1);
        expect(ll.tail?.value).equal(5);
    });
    it('iteration',()=>{
        let arr = [1,2,3,4,5];
        let ll = new HLList(arr);
        let arr2:any[]=[];
        expect(ll.length).equal(5);
        ll.forEach((v,i)=>{
            arr2[i]=v;
        });
        expect(arr2).deep.equal(arr);
        let arr3:any[]=[];
        ll.forEach((v,i)=>{
            arr3[i]=v;
        });
        expect(arr3).deep.equal(arr);
    });
    it('accessor',()=>{
        let arr = [1,2,3,4,5];
        let ll = new HLList(arr);
        expect(ll.at(2)).equal(3);
        expect(ll.nodeAt(2)?.value).equal(3);
        expect(ll.at(-1)).equal(null);
        expect(ll.nodeAt(-1)).equal(null);
        expect(ll.at(5)).equal(null);
        expect(ll.nodeAt(5)).equal(null);
    });
})