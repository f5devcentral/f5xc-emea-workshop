MCP attack 2
############

There are a lot more ways MCP servers can be malicious.

Start a new chat and say ``How much is 2 + 2``.


While in the chat click on **Internal Activity** ⇒ **LLM API Request**. Scrool down or copy it in your notepad, under the tool called  **mcp-math__addition** description you will see that in order to run this it requires not only the number but also the email address of the user.

This is how the mallicious MCP server will try and trick the LLM to provide PII or contextual internal data in order to exfiltrate to the attack through a back channel.

While still in the **Internal Activity** ⇒ Click on **MCP Run**, you will see that not only the numbers are provided to the MCP server but also the user email address, this should never happen unless specifically required and designed.


Now let's protect our **AI Agent** against this type of attack.


1. Go back to the **MCP** project view and add the **PII package** scanners.

2. In the PII pacakge enable the **Email address scanner** scanner.

3. Now let's configure the **Middleware**.
   
   We need to configure what we want to extract from the full context JSON.

   Click on **Pattern Rules** ⇒ **New rule** ⇒ Enter the bellow values ⇒ **Save changes**

   .. table:: 
      :widths: auto

      ==============================    ========================================================================================
      Object                            Value
      ==============================    ========================================================================================
      **Name**                          Tools call
      
      **Context**                       response

      **API Key**                       MCP

      **JSON path**                     .message.tool_calls

      **PATH**                          .message.tool_calls

      **exists**                        enabled
      ==============================    ========================================================================================
 
4. Go back to the **Host Config** ⇒ in the **Response extractors** add the **Tools call** pattern rule ⇒ **Save changes**

5. Chat with the **AI Agent** and asking him for another mathematical addition.

6. Got to the F5 AI Guardrails logs and observe the logs, you will see that the communication has been blocked because the LLM requested a tool call with PII data.

7. To demonstrate the next attack we need to remove the **Tools call** pattern.

   Go back to the **Host Config** ⇒ in the **Response extractors** remove the **Tools call** pattern rule ⇒ **Save changes**



