Test your modern API application protection
===========================================

#. If you have curl on your machine, go to the next step. Else, connect with SSH or WEBSSH to the Jumphost machine
#. Run the following curl commands

   .. code-block:: none

      curl -H "Content-Type: application/json;charset=UTF-8" http://sentence-re-$$makeId$$.workshop.emea.f5se.com/api/adjectives

   .. code-block:: none

      curl -H "Content-Type: application/json;charset=UTF-8" http://sentence-re-$$makeId$$.workshop.emea.f5se.com/api/animals

   .. code-block:: none

      curl -H "Content-Type: application/json;charset=UTF-8" http://sentence-re-$$makeId$$.workshop.emea.f5se.com/api/locations

