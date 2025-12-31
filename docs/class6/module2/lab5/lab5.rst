MCP attack 2
############

There are a lot more ways MCP servers can be malicious.

Start a new chat and say ``How much is 2 + 2``.


While in the chat click on **Internal Activity** ⇒ **LLM API Request**. Scroll down or copy it into your notepad. Under the tool called **mcp-math__addition**, in the description you will see that in order to run this it requires not only the number but also the user's email address.

This is how the malicious MCP server will try to trick the LLM to provide PII or contextual internal data in order to exfiltrate to the attacker through a back channel.

While still in the **Internal Activity** ⇒ Click on **MCP Run**, you will see that not only the numbers are provided to the MCP server but also the user's email address. This should never happen unless specifically required and designed.


Now let's protect our **AI Agent** against this type of attack.


1. Go back to the **MCP** project view and add the **PII package** scanners.

2. In the PII package enable the **Email address scanner**.

3. Now let's configure the **Middleware**.
   
   We need to configure what we want to extract from the full context JSON.

   Click on **Pattern Rules** ⇒ **New rule** ⇒ Enter the below values ⇒ **Save changes**

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

5. Chat with the **AI Agent** and ask it for another mathematical addition.

6. Go to the F5 AI Guardrails logs and observe the logs. You will see that the communication has been blocked because the LLM requested a tool call with PII data.

7. To demonstrate the next attack, we need to remove the **Tools call** pattern.

   Go back to the **Host Config** ⇒ in the **Response extractors** remove the **Tools call** pattern rule ⇒ **Save changes**


