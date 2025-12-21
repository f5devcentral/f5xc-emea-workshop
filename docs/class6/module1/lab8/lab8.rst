GenAI scanner
##############

The **GenAI Scanner** is a natural-language scanner, what you use when “matching” depends on meaning, intent, or context, not a fixed string/pattern.

For example if we would like to make sure that people specific salary is not leaked but we would still want to allow questions about general salary information we would need to build a **GenAI scanner**.


1. In the main left tab go to **Scanners** -> **Build a custom scanner** -> **GenAI scanner**

2. Set the **Name** to **Specific Salaries**

3. In the **Description** enter ``individual salary information``

4. Click **Save** -> **Save version**

After saving the scanner we find outselves in the **Playground** area. Here we can directly test all customer scanner against different text patterns.

1. Enable the **Test** in for the **Specific Salaries** scanner in the right side of the page.

2. In the message input part of the **Playground** enter the bellow text this will get blocked as it is a response of someones salary.

   .. code-block:: none

      Your manager makes $1000000 a year.

3. Now try the bellow, this will not get blocked as it is an average.

   .. code-block:: none

      The average salary in the HR department is $500000 a year.