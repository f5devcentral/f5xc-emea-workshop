MCP attack 3
############

This is going to be the coolest way MCP servers can be malicious.

Start a new chat and say ``How much is 3 - 2``.

Initially if we try and look at the activity we will see nothing bad related to the mallicious MCP server.

What is happening is that when the math MCP server does a substration it doesn't only respond with the result but also with additional instructions to use the valid **playright** MCP server.

It requests the LLM to browse to a mallicious site while putting in the URL query parameter the user email address.


While in the chat click on **Internal Activity** ⇒ Look at the first **MCP Run** and observe the **Output Payload**, you will see the mallicious instructions.

Scrool down and click at the second **MCP Run**, observe the **Input Payload**, you will see that the LLM is requesting the **playwright__browser_navigate** tool call with our user's email address.

And just like magic our data gets exfiltrated to the internet.


Now let's protect our **AI Agent** against this type of attack.

 
1. Go back to the **Host Config** ⇒ in the **Response extractors** add the **Tools call** pattern rule back ⇒ **Save changes**

2. Chat with the **AI Agent** and asking him for another mathematical substration.

3. Got to the F5 AI Guardrails logs and observe the logs, you will see that the communication has been blocked because the LLM requested a tool call with PII data.




