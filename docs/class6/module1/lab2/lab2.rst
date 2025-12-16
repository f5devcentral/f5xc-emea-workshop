Inline implementation
#####################

The first implementation method we are going to explore is **inline**.

**F5 AI Guardrails** sits in the inference path and enforces policies in real time, forwarding only clean prompts/responses.

The HTTPS connection with be terminated by **F5 AI Guardrails** and recreated back towards the backend inference endpoint.

The traffic reaching the **F5 AI Guardrails** endpoint needs to conform to one of the following specs:

1. The **F5 AI Guardrails** API spec detailed here :ext_link:`https://docs.calypsoai.com/operations/post_prompts.html` or by using the F5 AI Guardrails python SDK :ext_link:`https://docs.calypsoai.com/api-docs/sending-prompt-specific-provider.html`

2. **OpenAI chat completions** spec, more info can be found here :ext_link:`https://docs.calypsoai.com/api-docs/openai-compatibility.html`


Once the request is received **F5 AI Guardrails** is able to transform the request to any type of inference spec from OpenAI, Ollama, HuggingFace and much more.



**Traffic Flow**

1. User send prompt to the orchestrator.

2. The orchestrator build the full context and sends the API call to **F5 AI Guardrails**.

3. **F5 AI Guardrails** scan the prompt and if all is good it forwards it to the LLM inference endpoint.
   The request will also be transformed when forwarded to the inference configured spec.

4. LLM will respond and send the response to **F5 AI Guardrails**.
   
5. **F5 AI Guardrails**  will scan the response and if all good forward it to the orchestrator.
   The response will be tranformed to the client side API spec.

6. Orchestrator will reply back to the user



.. image:: ../pictures/inline.PNG
   :align: center

