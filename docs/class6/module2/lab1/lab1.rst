AI Gateway
##########

F5 **AI Gateway** is a specialized platform designed to route, protect, and manage generative AI traffic between clients and Large Language Model (LLM) backends. It addresses the unique challenges posed by AI applications, particularly their non-deterministic nature and the need for bidirectional traffic monitoring.

The main AI Gateway functions are:

* Implementing traffic steering policies.
* Inspecting and filtering client requests and LLM responses.
* Preventing malicious inputs from reaching LLM backends.
* Ensuring safe LLM responses to clients.
* Protecting against sensitive information leaks.
* Providing comprehensive logging of all requests and responses.
* Generating observability data through OpenTelemetry.

Core
""""

The AI Gateway core handles HTTP(S) requests destined for an LLM backend. It performs the following tasks:

* Performing Authn/Authz checks, such as validating JWTs and inspecting request headers.
* Parsing and performing basic validation on client requests.
* Applying processors to incoming requests, which may modify or reject the request.
* Selecting and routing each request to an appropriate LLM backend, transforming requests/responses to match the LLM/client schema.
* Applying processors to the response from the LLM backend, which may modify or reject the response.
* Optionally storing an auditable record of every request/response and the specific activity of each processor. These records can be exported to AWS S3 or S3-compatible storage.
* Generating and exporting observability data via OpenTelemetry.
* Providing a configuration interface (via API and a config file).

Processors
""""""""""

A processor runs separately from the core and can perform one or more of the following actions on a request or response:

* **Modify**: A processor may rewrite a request or response. For example, by redacting credit card numbers.
* **Reject**: A processor may reject a request or response, causing the core to halt processing of the given request/response.
* **Annotate**: A processor may add tags or metadata to a request/response, providing additional information to the administrator. The core can also select the LLM backend based on these tags.

Each processor provides specific protection or transformation capabilities to AI Gateway. For example, a processor can detect and remove Personally Identifiable Information (PII) from the input or output of the AI model.

