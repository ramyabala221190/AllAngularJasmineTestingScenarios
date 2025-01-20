
import { SimpleService } from './simple.service';

describe('SimpleService', () => {
  let service: SimpleService;

  beforeEach(() => {
    service=new SimpleService(); //arrange
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test if initially no messages',()=>{
    expect(service.messages).toEqual([]) //assert
  })

  it('test add method',()=>{
    service.addMessage("Hello World");//act

    expect(service.messages).toEqual(["Hello World"]); //assert
    expect(service.messages.length).toBe(1); //assert
  })

  it('test clear methdo',()=>{
    service.addMessage("Hello World");//arrange
   
    service.clearMessage(); //act

    expect(service.messages).toEqual([]); //assert
    expect(service.messages.length).toBe(0); //assert
  })
});
