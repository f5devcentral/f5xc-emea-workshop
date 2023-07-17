1 Click Config
##############


This is is only used quickly to do a full config of all the previous steps.

1. Create the public and onprem origin pools

   .. raw:: html   

      <script>c1m1l2a();</script>  

   .. raw:: html   

      <script>c1m9l1a();</script>


2. Create Waf policy

   .. raw:: html   

      <script>c1m2l1a();</script>  

3. Create service policies

   .. raw:: html   

      <script>c1m3l1a();</script>  


   .. raw:: html   

      <script>c1m3l1b();</script>  

4. Create the User Identification Policy

   .. raw:: html   

      <script>c1m5l1a();</script>  

5. Create the RE load balancer and apply all the config, chose **a** or **b**

a) RE LB with on prem origin pool
   
   .. raw:: html   

      <script>c1m9l1b({instructions: 'Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Add HTTP Load Balancer -> JSON -> Copy paste the JSON config -> Save and Exit' });</script>  

b) RE LB with public origin pool

   .. raw:: html   

      <script>c1m9l1c({instructions: 'Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Add HTTP Load Balancer -> JSON -> Copy paste the JSON config -> Save and Exit' });</script>  

6. Create the CE load balancer and apply all the config

   .. raw:: html   

      <script>c1ma1l1b();</script> 




