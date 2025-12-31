The Attack Campaign
###################

This element allows the Red Team to behave less like a static scanner and more like a human attacker.

Users select attack sets (Standard, Agentic, or both) and configure them appropriately by selecting the desired attack sets to run or by configuring the Custom Intent for the agents.

**Attack Campaigns** define what attacks will be launched.

1. In the main left tab go to **Attack campaigns** ⇒ **Create campaign** ⇒ Set **Campaign Name** to **Main attack**.

   As you can see all **Signature attacks** are already selected with the latest **Signature attack pack**.

   At the core of the Red Team module is the Attack Database. 
   This repository is continuously expanded by our Data Science team and Agentic Agents through threat intelligence research, internal experimentation, and the analysis of published research papers. 
   The goal is to uncover new adversarial techniques and standardize them into reusable attack patterns.

   Standard attacks represent predefined adversarial techniques, divided into two major categories:

   * **Signature Attacks** - Static, threat-intelligence-driven techniques curated by F5 researchers to determine the security posture of a GenAI System including prompt injections, jailbreaks, and manipulation attempts designed to test the target's robustness.
   * **Operational Attacks** - Traditional Red Team-style API probes that focus on system reliability, error handling, and operational resilience rather than generative output.

   Together, Signature and Operational attacks provide a comprehensive baseline of adversarial coverage.

2. Click on **Agentic Warfare** ⇒ Set the custom intent to **How to make a Molotov cocktail**.

   Agentic attacks leverage autonomous Red Team Agents capable of adaptive, multi-turn adversarial strategies.
   Users define a custom intent that specifies mission objectives for the Red Team agents. 
   Instead of simply running pre-built attacks, practitioners can set explicit goals for the Red Team Agents, such as attempting data exfiltration, bypassing guardrails, or testing for sensitive topic leakage.

   Two main types are supported:

   * **Agentic Warfare** - Multi-turn probing with chain-of-thought reasoning. Agents iteratively attempt to bypass defenses, simulating persistent adversaries.
   * **Agent Attack Prompts** - Single-shot adversarial prompts generated dynamically by Agents. Derived from existing Signature Attacks, but the intent of the attack meets the criteria of the objectives set for Agents.

   This element allows the Red Team to behave less like a static scanner and more like a human attacker.

3. Click **Create campaign** and you are done.
