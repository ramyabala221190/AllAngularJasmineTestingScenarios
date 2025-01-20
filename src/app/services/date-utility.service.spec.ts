import { DateUtilityService } from './date-utility.service';

describe('DateUtilityService', () => {
  let service: DateUtilityService;

  beforeEach(() => {
    service=new DateUtilityService(); //didnt add TestBed because no dependencies
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

   it('test past date',()=>{
    const result=service.isItToday("2024-12-16");

    expect(result).toBe("past")
   })

   it('test today date',()=>{
    const result=service.isItToday("2024-12-29");

    expect(result).toBe("today")
   })


   it('test future date',()=>{
    const result=service.isItToday("2024-12-30");

    expect(result).toBe("future")
   })
});
