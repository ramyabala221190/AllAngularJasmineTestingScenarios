import { TestBed } from '@angular/core/testing';

import { TestService } from './test.service';
import{HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import { HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';

describe('TestService', () => {
  let service: TestService;
  let controller:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[TestService]
    });
    service = TestBed.inject(TestService);
    controller=TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should call users api correctly',()=>{
const expectedResponse={
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}

let  fakeApiResponse:any;

service.getUsers().subscribe(
  user=>{
  fakeApiResponse=user;
},
err=>console.log(err),
()=>console.log("Completed")

)
//checks if a single request has been made with this url
const request:TestRequest=controller.expectOne("https://jsonplaceholder.typicode.com/users/1");

// Answer the request so the Observable emits a value.
request.flush(expectedResponse) //We are resolving the request by providing a successful response

//verify that there are no pending requests
controller.verify();

// Now verify emitted valued.
expect(fakeApiResponse).toEqual(expectedResponse);

  })


  it('testing errors',()=>{
   let expectedError=new ErrorEvent("Request errored out");
   let expectedStatusCode=500;
   let expectedStatusText="Server Error";

   let actualError:HttpErrorResponse={
     error: {},
     status: 0,
     statusText: "",
     name: 'HttpErrorResponse',
     message: '',
     ok: false,
     headers: new HttpHeaders(),
     url: null,
     type: HttpEventType.ResponseHeader
   };

   service.getUsers().subscribe(
    user=>{
      console.log(user);
  },
  (err:any)=>{
    actualError=err;
    }
    ,
  ()=>console.log("Completed")

  )
//checks if a single request has been made with this url
  const request:TestRequest=controller.expectOne("https://jsonplaceholder.typicode.com/users/1");

  //resolve the request by returning an error event
  request.error(expectedError,{status:expectedStatusCode,statusText:expectedStatusText})

expect(actualError["error"]).toBe(expectedError);
expect(actualError.status).toBe(expectedStatusCode);
expect(actualError.statusText).toBe(expectedStatusText);

  })


});
