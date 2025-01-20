import { RiskPipe } from './risk.pipe';

describe('RiskPipe', () => {

  let pipe:RiskPipe;

beforeEach(()=>{
  //no testbed required because no dependencies
    pipe = new RiskPipe(); //arrange
})

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });


  it('test if Low risk returned',()=>{
     let value=pipe.transform(2); //act

     expect(value).toEqual("Low"); //assert
  })

  it('test if Medium risk returned',()=>{
    //act
    let value=pipe.transform(5);

    //assert
    expect(value).toEqual("Medium")
 })

 it('test if High risk returned',()=>{
  let value=pipe.transform(9);

  expect(value).toEqual("High")
})
});
