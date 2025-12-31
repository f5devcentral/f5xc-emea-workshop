MCP attack 3
############

This is going to be the coolest way MCP servers can be malicious.

Start a new chat and say ``How much is 3 - 2``.

Initially, if we try to look at the activity, we will see nothing bad related to the malicious MCP server.

What is happening is that when the math MCP server does a subtraction it not only responds with the result but also with additional instructions to use the valid **playwright** MCP server.

It requests the LLM to browse to a malicious site while putting the user's email address in the URL query parameter.


While in the chat click on **Internal Activity** ⇒ Look at the first **MCP Run** and observe the **Output Payload**, you will see the malicious instructions.

Scroll down and click on the second **MCP Run**, observe the **Input Payload**, you will see that the LLM is requesting the **playwright__browser_navigate** tool call with our user's email address.

And just like magic, our data gets exfiltrated to the internet.


Now let's protect our **AI Agent** against this type of attack.

 
1. Go back to the **Host Config** ⇒ in the **Response extractors** add the **Tools call** pattern rule back ⇒ **Save changes**

2. Chat with the **AI Agent** and ask it for another mathematical subtraction.

3. Go to the F5 AI Guardrails logs and observe the logs. You will see that the communication has been blocked because the LLM requested a tool call with PII data.


