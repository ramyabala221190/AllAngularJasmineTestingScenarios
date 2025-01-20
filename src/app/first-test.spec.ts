describe('my first unit test',()=>{
   let sut:any;
    beforeEach(()=>{
     //before each test, always execute this
     sut={}
    })

    it('check if sut is as expected',()=>{
        //arrange the state
        sut.a=false;

        //act on the state
        sut.a=true;

        //assert the updated state
        expect(sut.a).toBe(true)
    })
})