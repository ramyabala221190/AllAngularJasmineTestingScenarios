TestBed

The Angular team provides the TestBed to ease unit testing. The TestBed creates and configures an Angular environment so you can test particular application parts like Components and Services safely and easily.
The TestBed comes with a testing Module that is configured like normal Modules in your application: You can declare Components, Directives and Pipes, provide Services and other Injectables as well as import other Modules. TestBed has a static method configureTestingModule that accepts a Module definition

TestBed.configureTestingModule({
  imports: [ /*… */ ],
  declarations: [ /*… */ ],
  providers: [ /*… */ ],
});

In a unit test, add those parts to the Module that are strictly necessary: the code under test, mandatory dependencies and fakes. 

First we need to compile all declared Components, Directives and Pipes:
TestBed.compileComponents();
This instructs the Angular compiler to translate the template files into JavaScript code.

Finally, we can render the Component under test using createComponent.

ComponentFixture holds the Component and provides a convenient interface to both the Component instance and the rendered DOM.

The fixture references the Component instance via the componentInstance property. 


Identifying the DOM Element:

Type and class selectors introduce a tight coupling between the test and the template. HTML elements are picked for semantic reasons. Classes are picked mostly for styling. Both change frequently when the Component template is refactored. Should the test fail if the element type or class changes?

Sometimes the element type and the class are crucial for the feature under test. But most of the time, they are not relevant for the feature. The test should better find the element by a feature that never changes and that bears no additional meaning: test ids.

A test id is an identifier given to an element just for the purpose of finding it in a test. The test will still find the element if the element type or unrelated attributes change.

The preferred way to mark an HTML element is a data attribute. In contrast to element types, class or id attributes, data attributes do not come with any predefined meaning. Data attributes never clash with each other.

It is worth noting that triggerEventHandler does not dispatch a synthetic DOM event. The effect stays on the DebugElement abstraction level and does not touch the native DOM.

 Technically, Outputs are Component instance properties. A unit test must inspect the Outputs thoroughly to proof that the Component plays well with other Components.


---------------------------------------------------------------------------------------------------------
Testing Parent Components with nested Components

PRESENTATIONAL COMPONENTS
So far, we have tested an independent Component that renders plain HTML elements, but no child Components. Such low-level Components are the workhorses of an Angular application.

They directly render what the user sees and interacts with.
They are often highly generic and reusable.
They are controlled through Inputs and report back using Outputs.
They have little to none dependencies.
They are easy to reason about and therefore easy to test.
The preferred way of testing them is a unit test.
These Components are called presentational Components since they directly present a part of the user interface using HTML and CSS. Presentational Components need to be combined and wired to form a working user interface.

CONTAINER COMPONENTS
This is the duty of container Components. These high-level Components bring multiple low-level Components together. They pull data from different sources, like Services and state managers, and distribute it to their children.

Container Components have several types of dependencies. They depend on the nested child Components, but also Injectables. These are classes, functions, objects, etc. provided via dependency injection, like Services. These dependencies make testing container Components complicated.

SHALLOW VS. DEEP RENDERING
There are two fundamental ways to test Components with children:

A unit test using shallow rendering. The child Components are not rendered.
An integration test using deep rendering. The child Components are rendered.
Again, both are valid approaches we are going to discuss.

A unit test of AppComponent does not render these children. The host elements are rendered, but they remain empty. You might wonder, what is the point of such a test? What does it do after all?

From AppComponent’s perspective, the inner workings of its children are not relevant. We need to test that the template contains the children. Also, we need to check that HomeComponent and its children are wired up correctly using Inputs and Outputs.

From Angular 9 on, the spec passes but produces a bunch of warnings on the shell:

'app-counter' is not a known element:
1. If 'app-counter' is an Angular component, then verify that it is part of this module.
2. If 'app-counter' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.

What do these warnings mean? Angular does not recognize the custom elements app-counter, because we have not declared Components that match these selectors. The warning points at two solutions:

Either declare the child Components in the testing Module. This turns the test into an integration test.
Or tell Angular to ignore the unknown elements. This turns the test into a unit test.

Since we plan to write a unit test, we opt for the second.

When configuring the testing Module, we can specify schemas to tell Angular how to deal with elements that are not handled by Directives or Components.

The warning suggests CUSTOM_ELEMENTS_SCHEMA, but the elements in question are not Web Components. We want Angular to simply ignore the elements. Therefore we use the NO_ERRORS_SCHEMA, “a schema that allows any property on any element”.

First of all, we need to test the presence of app-counter, the independent counter.
Next we need to test the inputs and outputs of the child component

-------------------------------------------------------------------------------
Testing Services:

The HttpClientTestingModule provides a fake implementation of HttpClient. It does not actually send out HTTP requests. It merely intercepts them and records them internally.

In the test, we inspect that record of HTTP requests. We respond to pending requests manually with fake data.

Our test will perform the following steps:

Call the method under test that sends HTTP requests
Find pending requests using HttpTestingController
Respond to these requests with fake data
Check the result of the method call
Verify that all requests have been answered


The HttpTestingController has methods to find requests by different criteria. The simplest is expectOne. It finds a request matching the given criteria and expects that there is exactly one match.
expectOne returns the found request, that is an instance of TestRequest.

We use the request’s flush method to respond with fake data. This simulates a successful “200 OK” server response.

Finally, we call:

controller.verify();
This fails the test if there are any outstanding requests.

verify guarantees that the code under test is not making excess requests. But it also guarantees that your spec checks all requests, for example by inspecting their URLs.
