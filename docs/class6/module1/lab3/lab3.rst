Out-of-Band implementation
##########################

The **Out-of-Band** implementation is the most flexible, but it requires the AI application to call **F5 AI Guardrails** programmatically for scanning without altering its primary flow.

The AI application developers will need to integrate into their logic to send the required content to **F5 AI Guardrails** for inspection. This is relevant for both the request and the response.




The out-of-band scanning can be implemented as follows:

1. Implementing an API call that follows the following spec :ext_link:`https://docs.calypsoai.com/operations/post_scans.html`

2. Using the F5 AI Guardrails Python SDK :ext_link:`https://docs.calypsoai.com/api-docs/sending-scan-request-specific-project.html`




**Traffic Flow**

1. The user sends a prompt to the orchestrator.

2. The orchestrator sends the user prompt to **F5 AI Guardrails** for inspection.

3. **F5 AI Guardrails** responds to the orchestrator after scanning the user prompt with a verdict of allow/block/redact.

4. The orchestrator forwards the full context to the inference endpoint.

5. The LLM sends back the response to the orchestrator.
   
6. The orchestrator sends the LLM response to **F5 AI Guardrails** for inspection.

7. **F5 AI Guardrails** responds to the orchestrator after scanning the LLM response with a verdict of allow/block/redact.

8. The orchestrator sends the LLM response to the client.



.. image:: ../pictures/outofband.PNG
   :align: center
