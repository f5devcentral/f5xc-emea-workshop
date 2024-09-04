Prompt Security
###############

Prompt Security is a platform designed to protect organizations from the various risks associated with Generative AI (GenAI). It addresses several critical security concerns that arise from the use of AI technologies, particularly those involving large language models (LLMs).

Key Functions of Prompt Security:

* **Protection Against Prompt Injection**: Prompt injection is a technique where attackers manipulate AI inputs to produce unintended or harmful outputs. Prompt Security helps prevent this by inspecting prompts and model responses to block harmful content and secure against GenAI-specific attacks
* **Data Privacy and Intellectual Property Protection**: The platform aims to prevent data leaks and the unauthorized disclosure of proprietary information embedded in system prompts. This is crucial in maintaining data privacy and protecting intellectual property.
* **Denial of Wallet/Service Mitigation**: These attacks involve excessive engagement with LLM-based applications, leading to resource overuse and potential financial costs. Prompt Security helps mitigate these risks by monitoring and managing resource consumption.
* **Privilege Escalation Prevention**: By monitoring for and blocking prompts that could lead to unauthorized access, Prompt Security helps prevent privilege escalation, ensuring that AI systems do not grant more access than intended.
* **Comprehensive Visibility and Governance**: The platform provides enterprise leaders with visibility and governance over AI tools used within their organizations, ensuring that AI adoption is secure and compliant with internal policies and regulations.

Accessing the **Prompt Security** UI
------------------------------------

1. Browse to https://prompt-security.workshop.emea.f5se.com/ and login into the system

2. Click on the **gear** icon in the top right corner → **Create homegrown applications connector**

3. Give the connector a name, this will represent your AI Security Policy config. When viewing or making changes allways make sure that you are using this connector.

4. The policy has been created with best practices configuration. In order for us to explore the configuration and capabilities we will uncheck all the boxes, **do that now** and click **Save**

5. Go to the **Deployment** tab and copy the **API key** when traffic will be sent to Prompt Security for inspection you will use this API Key to enable the policy you just created.

6. Replace the **api-key** in the bellow curl command and run it

   .. code-block:: none

      curl -s -k -X POST https://$$hostArcadia$$/v1/ai/security-config \
        -H "Content-Type: application/json" \
        -d '{"llmSecurityHost":"prompt-security.workshop.emea.f5se.com", "llmSecurityAppId":"api-key"}'