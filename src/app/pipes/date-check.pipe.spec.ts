import { TestBed } from '@angular/core/testing';
import { DateCheckPipe } from './date-check.pipe';
import { DateUtilityService } from '../services/date-utility.service';

describe('DateCheckPipe', () => {

  let pipe: DateCheckPipe;
  let dateUtilityServiceSpy:jasmine.SpyObj<DateUtilityService>;
  
  beforeEach(()=>{
    const spy=jasmine.createSpyObj('DateUtilityService',['isItToday'])
    TestBed.configureTestingModule({
      //the service is a spy because we are just checking if the method in the service is getting called.
      //because the pipe just calls the method. We are not checking if the service gives the correct result
      //the result checking will be done in the service spec.
      providers:[DateCheckPipe,{provide:DateUtilityService,useValue:spy}]
    })
    pipe=TestBed.inject(DateCheckPipe);
    dateUtilityServiceSpy=TestBed.inject(DateUtilityService) as jasmine.SpyObj<DateUtilityService>;
  })
  
  
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

   it('test if service is called',()=>{
    //arrange
    const givenDate="2024-12-20";

    //act
    pipe.transform(givenDate);

    //assert
    expect(dateUtilityServiceSpy.isItToday).toHaveBeenCalledWith(givenDate)
   })


});
 