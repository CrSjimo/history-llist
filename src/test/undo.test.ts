import { HLList } from "../linked_list/HLList"
import { cmd } from "../linked_list/command_utils";
import { Commands } from "../declaration/Command";
import {expect} from 'chai';

function randInt(l:number,r:number){
    return Math.round(Math.random()*19260817)%(r-l)+l;
}

describe('undo',()=>{
    it('execute',()=>{
        let ll=new HLList([1,2,3,4,5]);
        ll.execute([cmd(Commands.push)(6,7,8,9,0)]);
        expect(ll.toArray()).deep.equal([1,2,3,4,5,6,7,8,9,0]);
        ll.execute([cmd(Commands.pop)(),cmd(Commands.pop)()]);
        expect(ll.toArray()).deep.equal([1,2,3,4,5,6,7,8]);
    });
    it('undo redo',()=>{
        let ll=new HLList([1,2,3,4,5]);
        ll.execute([cmd(Commands.push)(6,7,8,9,0),cmd(Commands.removeRange)(6,9)]);
        expect(ll.toArray(),'#1').deep.equal([1,2,3,4,5,6,0]);
        ll.undo();
        expect(ll.toArray(),'#2').deep.equal([1,2,3,4,5]);
        ll.execute([cmd(Commands.unshift)(6,7,8,9,0),cmd(Commands.insertAfter)(2,10,11,12)]);
        expect(ll.toArray(),'#3').deep.equal([6,7,8,10,11,12,9,0,1,2,3,4,5]);
        ll.undo();
        expect(ll.toArray(),'#4').deep.equal([1,2,3,4,5]);
    });
    it('random undo redo',()=>{
        let ll=new HLList([1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0],{maxHistory:Infinity});
        for(let i=0;i<100;i++){
            let randCmd = randInt(0,6);
            if(randCmd==5)randCmd=6;
            let len = ll.length;
            let p = [];
            for(let j=0;j<16;j++)p.push(randInt(0,len));
            ll.execute([cmd(randCmd)(...p)]);
        }
        let a=ll.toArray();
        for(let i=0;i<100;i++){
            ll.undo();
        }
        expect(ll.toArray()).deep.equal([1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0]);
        for(let i=0;i<100;i++){
            ll.redo();
        }
        expect(ll.toArray()).deep.equal(a);
    });
})