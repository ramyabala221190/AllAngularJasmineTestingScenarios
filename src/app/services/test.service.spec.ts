import { TestBed } from '@angular/core/testing';

import{HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { SimpleService } from './simple.service';
import { TestService } from './test.service';

describe('TestService', () => {
  let testService: TestService;
  let httpTestingController:HttpTestingController;
  let simpleServiceSpy:jasmine.SpyObj<SimpleService>; //we have created a mock of the SimpleService dependency

  beforeEach(() => {
    const spy = jasmine.createSpyObj(['addMessage','clearMessage'],{'messages':[]});
    //creating a mock of the SimpleService with addMessage methid and messages property

    //The TestBed creates a dynamically-constructed Angular test module 
    TestBed.configureTestingModule({
      /**
       * As for any external dependency, you must mock the HTTP backend so your tests can simulate interaction with a remote server. 
       * The @angular/common/http/testing library provides tools to capture requests made by the application, make assertions about them, 
       * and mock the responses to emulate your backend's behavior.
       */
      imports:[HttpClientTestingModule],
      //To test a testService, you set the providers metadata property with an array of the services that you'll test or mock.
      providers:[TestService,{provide:SimpleService,useValue:spy}]
    });

    //Then inject it inside a test by calling TestBed.inject() with the testService class to be tested and also the dependency mock as the argument.
    testService = TestBed.inject(TestService);
    simpleServiceSpy=TestBed.inject(SimpleService) as jasmine.SpyObj<SimpleService>;
    httpTestingController=TestBed.inject(HttpTestingController);
  });


  it('should be created', () => {
    expect(testService).toBeTruthy();
  });

  it('test addMessageForUser',()=>{
   //arrange
   const message="Hello World";
  //act
   testService.addMessageForUser(message);
   //assert
   expect(simpleServiceSpy.addMessage).toHaveBeenCalledWith(message);
  })

  it('clearing all messages',()=>{
    //act
    testService.clearMessages();

    //assert
    expect(simpleServiceSpy.clearMessage).toHaveBeenCalled();
  })

  it('testing if the URL for GET request is correct',()=>{
    //call the method. A get request should be made to the test backend
    testService.getUsers().subscribe(
      (result:any)=>{
        //the result here will be what you provided to the flush()
        //we are asserting different things about the response
        expect(result["id"]).toBe(1)
      }
    );

    //assert
   const req= httpTestingController.expectOne('https://jsonplaceholder.typicode.com/users/1') //we are expecting that 1 call is made to this url
  
    req.flush({
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
    }) //flush method decides what data needs to be sent back when the call is made
    
    expect(req.request.method).toBe("GET") // you can assert different attributes of the request
    
    httpTestingController.verify(); //ensure that we sending only 1 http request and not additional

  })

it('testing other errors',()=>{
  testService.getUsers().subscribe(
    result=>{console.log(result)},
    (err:HttpErrorResponse)=>{
      expect(err.status).toBe(0);
      expect(err.error.type).toBe("network error!");
    },
    ()=>{}
   )
   let req=httpTestingController.expectOne("https://jsonplaceholder.typicode.com/users/1");

   req.error(new ProgressEvent('network error!'));


   httpTestingController.verify();
})

it('testing backend errors',()=>{
   let expectedStatusCode=500;
   let expectedStatusText="Server Error";
   let expectedUrl="https://jsonplaceholder.typicode.com/users/1";

   let error={
    error: {},
    status: 500,
    statusText: "Server Error",
    name: 'HttpErrorResponse',
    message: '',
  }

   testService.getUsers().subscribe(
    result=>{console.log(result)},
    (err:HttpErrorResponse)=>{
      console.log(err)
      expect(err.status).toBe(expectedStatusCode);
      expect(err.statusText).toBe(expectedStatusText);
    },
    ()=>{}
   )
//checks if a single request has been made with this url
  let req=httpTestingController.expectOne(expectedUrl);
  req.flush(error); // flush requests with an error response that emulates what your backend would return when a request fails.
httpTestingController.verify();

  })

  it('should execute post request',()=>{

  let expectedUrl='https://jsonplaceholder.typicode.com/todos/1';
   let expectedResponse= {
    "userId": 1,
    "id": 20,
    "title": "Shopping",
    "completed": false
  }

  testService.createToDo().subscribe(
    result=>{
      expect(result).toEqual(expectedResponse);
    }
  );
  //checks if a single request has been made with this u
  const request=httpTestingController.expectOne(expectedUrl);
   // Answer the request so the Observable emits a value.
   request.flush(expectedResponse) //We are resolving the request by providing a successful response
   expect(request.request.method).toBe("POST");
   httpTestingController.verify();
  })

});
