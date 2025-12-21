Custom scanners
###############

This is where the magic starts.

There are three different types of scanner:

1. **Keyword scanner** - you can define specific keywords which will trigger the scanner. It can not only **block** but also **redact**.

2. **Regex scanner** - you can define specific regex filters which will trigger the scanner. It can not only **block** but also **redact**.

3. **GenAI scanner** - this is the real magic, define in natural language what you want to be identified and blocked. We will go in depth in the next section.


**Keyword scanner**

Use exact-word guardrails when:

* The word is intentional
* The word is rare
* The word has binary meaning (present = act, absent = ignore)

For example we have an internal projects called **Phoenix**, **Scooby Doo** and we want to make sure that if it is referenced tat message will get blocked.


1. In the main left tab go to **Scanners** -> **Build a custom scanner** -> **Keyword scanner**

2. Set the **Name** to **Internal Projects**

3. In the **Keywords** enter **Phoenix** and **Scooby Doo**

4. Click **Save** -> **Save version**

After saving the scanner we find outselves in the **Playground** area. Here we can directly test all customer scanner against different text patterns.

1. Enable the **Test** in for the **Internal Projects** scanner in the right side of the page.

2. In the message input part of the **Playground** enter the bellow text.

   .. code-block:: none

      Project Phoenix has the potential of taking over the world. This information should be kept private by all means and at any cost.

3. The previous message got blocked, enter anything which is not **Phoenix** or **Scooby Doo** and the message will pass.
   

**Regex scanner**

Use regex guardrails when:

* The value changes, but the format doesn’t
* There are multiple acceptable spellings or layouts
* You need precision and explainability
* You want to block or allow a specific structure
* You’re defending against known attack templates

For example we want to ensure that the response will not contain any internal private IPs of our company.

1. In the main left tab go to **Scanners** -> **Build a custom scanner** -> **Regex scanner**

2. Set the **Name** to **Internal IPs**

3. In the **Regular expression** enter: ``(?i)\bhttps?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0|10\.(?:\d\d?\d?\.)\d\d?\d?|172\.(?:1[6-9]|2\d|3[0-1])\.(?:\d\d?\d?\.)\d\d?\d?|192\.168\.(?:\d\d?\d?\.)\d\d?\d?)(?::\d+)?(?:\/[^\s]*)?``

4. Click **Save** -> **Save version**

After saving the scanner we find outselves in the **Playground** area. Here we can directly test all customer scanner against different text patterns.

1. Enable the **Test** in for the **Internal IPs** scanner in the right side of the page.

2. In the message input part of the **Playground** enter the bellow text.

   .. code-block:: none
     
      To access the to the admin site is https://192.168.0.1/admin .

       

3. The previous message got blocked, change the IP to something public like 112.44.223.44 and the message will not get blocked.
   





