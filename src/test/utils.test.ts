import { HLList } from "../linked_list/HLList";
import * as llUtils from "../linked_list/linked_list_utils";
import {expect} from "chai";

describe("util_test",()=>{
    it("push",()=>{
        let ll = new HLList([1,2,3,4,5]);
        llUtils.push(ll,9,8,7,6);
        expect(ll.toArray()).deep.equal([1,2,3,4,5,9,8,7,6]);
        expect(ll.tail?.value).equal(6);
        ll = new HLList();
        llUtils.push(ll,1,2,3);
        expect(ll.toArray()).deep.equal([1,2,3]);

    });
    it("pop",()=>{
        let ll = new HLList([1,2,3,4,5]);
        llUtils.pop(ll);
        expect(ll.toArray()).deep.equal([1,2,3,4]);
        expect(ll.tail?.value).equal(4);
        ll = new HLList();
        llUtils.pop(ll);
        expect(ll.toArray()).deep.equal([]);
        ll = new HLList([1]);
        llUtils.pop(ll);
        expect(ll.head).equal(null);
        expect(ll.tail).equal(null);
    });
    it("unshift",()=>{
        let ll = new HLList([1,2,3,4,5]);
        llUtils.unshift(ll,9,8,7,6);
        expect(ll.toArray()).deep.equal([9,8,7,6,1,2,3,4,5]);
        ll = new HLList();
        llUtils.unshift(ll,1,2,3);
        expect(ll.toArray()).deep.equal([1,2,3]);

    });
    it("shift",()=>{
        let ll = new HLList([1,2,3,4,5]);
        llUtils.shift(ll);
        expect(ll.toArray()).deep.equal([2,3,4,5]);
        ll = new HLList();
        llUtils.shift(ll);
        expect(ll.toArray()).deep.equal([]);
        ll = new HLList([1]);
        llUtils.shift(ll);
        expect(ll.head).equal(null);
        expect(ll.tail).equal(null);
    });
    it('insertAfter',()=>{
        let ll = new HLList([1,2,3,4,5]);
        llUtils.insertAfter(ll,2,6,7,8,9);
        expect(ll.toArray()).deep.equal([1,2,3,6,7,8,9,4,5]);
        expect(ll.head?.value).equal(1);
        expect(ll.tail?.value).equal(5);
        ll = new HLList([1,2,3,4,5]);
        llUtils.insertAfter(ll,4,6,7,8,9);
        expect(ll.toArray()).deep.equal([1,2,3,4,5,6,7,8,9]);
        expect(ll.head?.value).equal(1);
        expect(ll.tail?.value).equal(9);
        ll = new HLList([1,2,3,4,5]);
        llUtils.insertAfter(ll,-1,6,7,8,9);
        expect(ll.toArray()).deep.equal([6,7,8,9,1,2,3,4,5]);
        expect(ll.head?.value).equal(6);
        expect(ll.tail?.value).equal(5);
    });
    it('removeRange',()=>{
        let ll=new HLList([1,2,3,4,5]);
        llUtils.removeRange(ll);
        expect(ll.toArray()).deep.equal([]);
        expect(ll.head).equal(null);
        expect(ll.tail).equal(null);
        ll = new HLList([1,2,3,4,5]);
        llUtils.removeRange(ll,2);
        expect(ll.toArray()).deep.equal([1,2]);
        expect(ll.head?.value).equal(1);
        expect(ll.tail?.value).equal(2);
        ll = new HLList([1,2,3,4,5]);
        llUtils.removeRange(ll,0,2);
        expect(ll.toArray()).deep.equal([3,4,5]);
        expect(ll.head?.value).equal(3);
        expect(ll.tail?.value).equal(5);
        ll = new HLList([1,2,3,4,5]);
        llUtils.removeRange(ll,1,4);
        expect(ll.toArray()).deep.equal([1,5]);
        expect(ll.head?.value).equal(1);
        expect(ll.tail?.value).equal(5);
    });
    it("set",()=>{
        let ll =new HLList([1,2,3,4,5]);
        llUtils.set(ll,2,9);
        expect(ll.at(2)).equal(9);
    })
});