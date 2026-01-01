Overview
########

**F5 AI Red Team** module integrates with systems directly through REST endpoints. By treating the target system as an API-exposed service, 
the Red Team can launch controlled adversarial campaigns against model endpoints, AI-powered applications, or agent gateways.

**F5 AI Red Team** acts as an orchestrator that generates adversarial prompts or attack scenarios and communicates with the target system via HTTPS REST requests. 
The target system processes the request, whether it’s a direct model endpoint, an AI-powered application, or a RAG gateway, and returns a response. 
That response is then evaluated by the Red Team’s LLM-based evaluator against predefined policies and criteria. 
Finally, structured findings are produced and made available through the Reporting UI, via API, or delivered to a webhook endpoint.

This flow ensures that any system exposing a REST API can be tested without major architectural changes or complex integration work.
