Out-of-Band implementation
##########################

The **Out-of-Band** implementation is the most flexible and it requires the AI application to call **F5 AI Guardrails** programmatically for scanning without altering its primary flow.

The AI application developers will need to integrate within their logic to first send the required content that requires inspection to **F5 AI Guardrails**. This is relevant for both the request and the response.




The out of band scanning can be implemented as folowing:

1. Implemting an API call that follows the following spec :ext_link:`https://docs.calypsoai.com/operations/post_scans.html`

2. Using the F5 AI Guardrails python SDK :ext_link:`https://docs.calypsoai.com/api-docs/sending-scan-request-specific-project.html`




**Traffic Flow**

1. User send prompt to the orchestrator.

2. The orchestrator sends the user prompt to **F5 AI Guardrails** for inspection.

3. **F5 AI Guardrails** responds to the orchestrator after scaning the user prompt with a verdict allow/block/redact.

4. The orchestrator forwards the full context to the inference endpoint.

5. LLM send back the response to the orchestrator.
   
6. The orchestrator sends the LLM response to **F5 AI Guardrails** for inspection.

7. **F5 AI Guardrails** responds to the orchestrator after scaning the LLM response with a verdict allow/block/redact.

8. The orchestrator sends the LLM response back to the client



.. image:: ../pictures/outofband.PNG
   :align: center

