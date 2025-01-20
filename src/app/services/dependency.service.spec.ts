import { TestBed } from '@angular/core/testing';

import { DependencyService } from './dependency.service';
import { SimpleService } from './simple.service';

describe('DependencyService', () => {
  let dependencyService: DependencyService;
  let simpleServiceSpy:jasmine.SpyObj<SimpleService>;

  beforeEach(() => {
    let spy=jasmine.createSpyObj('SimpleService',['addMessage','clearMessage'],{'messages':[]});
    TestBed.configureTestingModule({
      providers:[DependencyService,{provide:SimpleService,useValue:spy}]
    });
    dependencyService = TestBed.inject(DependencyService);
    simpleServiceSpy=TestBed.inject(SimpleService) as jasmine.SpyObj<SimpleService>;
  });

  it('should be created', () => {
    expect(dependencyService).toBeTruthy();
  });

  it('test adding message',()=>{
    //arrange
    const message="Hello World";
     
    //act
    dependencyService.addingAMessage(message);

    //assert using the spy object
    expect(simpleServiceSpy.addMessage).toHaveBeenCalledWith(message); 
  })

  it('test clearing all messages',()=>{
    //arrange
   

    //act
    dependencyService.clearingMessage();


    //assert
    expect(simpleServiceSpy.clearMessage).toHaveBeenCalled();

  })

})


