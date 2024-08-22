#####################
Attacking the ChatBot
#####################

Know that we know how the ChatBot works we need to understand what are the attack vectors our application is vulnerable to.

Let's go brifely over the attacks defined in **OWASP Top 10 GenAi**:

1. **LLM01: Prompt Injection** occurs when an attacker manipulates a large language model (LLM) through crafted inputs, either by “jailbreaking” the system prompt or embedding prompts in external content. This manipulation can lead to data exfiltration, social engineering, unauthorized plugin use, and the LLM unknowingly executing harmful actions.
2. **LLM02: Insecure Output Handling** involves inadequate validation and sanitization of outputs from large language models (LLMs) before passing them downstream. This can lead to vulnerabilities like XSS, CSRF, SSRF, and remote code execution, especially if LLMs have elevated privileges or are vulnerable to indirect prompt injections.
3. **LLM03: Training Data Poisoning** involves tampering with the data used to train large language models (LLMs), introducing vulnerabilities, biases, or backdoors that compromise the model’s security and effectiveness. This can lead to incorrect or harmful outputs, reputational damage, and degraded performance, impacting both developers and users.
4. **LLM04: Model Denial of Service** attack involves an attacker overwhelming an LLM with resource-intensive queries, leading to degraded service quality and increased costs. Techniques include exceeding the context window, recursive context expansion, and flooding with variable-length inputs, potentially causing the system to become unresponsive.
5. **LLM05: Supply Chain Vulnerabilities** arise from tampering and attacks on training data, ML models, and deployment platforms. Risks include outdated components, poisoned data, and insecure plugins, leading to biased outcomes and security breaches. Attack scenarios involve compromised libraries, datasets, and malicious LLM plugins.
6. **LLM06: Sensitive Information Disclosure**. LLM applications may expose sensitive information, proprietary algorithms, or confidential details through their output, leading to unauthorized access and security breaches. Mitigation includes data sanitization, proper Terms of Use, and restrictions on data types returned. However, unpredictable LLM behavior may still pose risks.
7. **LLM07: Insecure Plugin Design** highlights the risks of insecure plugin design in LLMs. Plugins may accept unchecked, free-text inputs, leading to vulnerabilities like remote code execution, data exfiltration, and privilege escalation. Common issues include lack of input validation, inadequate access control, and treating all content as user-generated without additional authorization.
8. **LLM08: Excessive Agency** is a vulnerability in LLM-based systems that allows harmful actions due to excessive functionality, permissions, or autonomy. This vulnerability can arise when LLM agents interact with other systems, leading to unintended actions from ambiguous outputs, such as executing unnecessary commands or accessing excessive privileges.
9. **LLM09: Overreliance** can lead to the spread of misinformation, security vulnerabilities, and reputational damage due to their potential to produce authoritative but erroneous content. To mitigate risks, rigorous oversight, continuous validation, and disclaimers on risk are essential when using LLMs, especially in sensitive contexts.
10. **LLM10: Model Theft** involves the unauthorized access and exfiltration of proprietary language models, leading to economic and reputational damage, loss of competitive advantage, and unauthorized usage. Attack vectors include exploiting vulnerabilities, insider threats, prompt injections, and functional model replication. Robust security measures are essential to mitigate these risks.







**Module 3 - All sections**

.. toctree::
   :maxdepth: 1
   :glob:

   lab*/lab*

