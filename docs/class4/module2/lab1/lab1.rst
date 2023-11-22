Enable API Validation
=====================

In the previous section, we enabled API Protection. API Protection is based on rules (allow, deny), but API Validation goes deeper into the validation.

API Validation validates the requests and the responses, but also the content (JSON payload) based on the OpenAPI Specifications.

As a reminder, this is the difference between Protection and API Validation. 

.. image:: ../pictures/slide-api-protection.png
   :align: center
   :scale: 40%

.. note:: As an example, API Validation validates if the value of a JSON key matches the specifications (integer, string, array ...)

Example below

.. code-block:: YAML
   :emphasize-lines: 24, 36, 38

    /adjectives:
    get:
      description: List all adjectives
      tags:
        - adjectives
      responses:
        '200':
          description: a list of adjectives with their index
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Adjectives"
    post:
      description: create an adjective
      tags:
        - adjectives
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                name:
                  type: string
            example:
              name: worried
      responses:
        '201':
          description: adjective created
          content:
            application/json:
              schema:
                type: object
                properties: 
                  id:
                    type: integer
                  name:
                    type: string
              example:
                id: 4
                name: worried

Having said, let's enable API Validation, and disable API Protection. It does not make sense to use both at the same time except if you need a specific rule for a specific endpoint.

Update your API Load Balancer
-----------------------------

.. warning:: This section can't be done if you are not part of an official F5 Workshop training. It requires a specific license (API Protection), and this license is provisionned only during official F5 events.
  You can bypass this section if you are not part of an official F5 training, and continue to the API Discovery lab.

.. note:: Please don't open support ticket to increase this quota. This is done by F5ers in charge of the trainings (Matthieu Dierick, Sorin Boiangiu)

* Edit your Load Balancer and remove all API Protection rules (click on Reset Configuration and confirm)
* Enable API Validation for ``All Endpoints``

   .. image:: ../pictures/enable-api-validation.png
      :align: left
      :scale: 50%

* Click on ``View Configuration`` to customize the settings
* Enable the ``Validation`` for ``Request`` and ``Response`` and select all the properties
* Keep the setting ``Fall Through Mode`` to ``Allow``

   .. image:: ../pictures/api-validation-settings.png
      :align: left
      :scale: 50%

.. note:: The ``Fall Through Mode`` to ``Allow`` tells the system to let unknwon endpoints to pass. In a nutshell, any unknown API endpoint will not be blocked and it is the API Discovery process which will take care of it.

.. warning:: Why not to block unknown endpoint ? Because this endpoint can be legitimate from Dev Teams, but SecOps are not aware "yet". And it is better to have a visilibity on what is unknown instead of breaking the business

* SAVE your Load Balancer

Make a quick test of API Validation
-----------------------------------

* The OpenAPI Spec file, specify the type of data expected by the API Endpoint. Let's say we want to delete an entry for /adjectives.
* The OAS spec file specify the type is ``integer``

   .. code-block:: yaml
      :emphasize-lines: 11
      
      delete:
         description: delete an adjective
         tags:
           - adjectives
         parameters:
           - name: id
             in: path
             required: true
             description: id of the adjective to retrieve
             schema:
               type: integer

* Let send a wrong request where we replace the ID (integer) by a string

   .. code-block:: bash

      curl --location --request DELETE 'http://sentence-re-$$makeId$$.workshop.emea.f5se.com/api/adjectives/beautiful'

   .. note:: Here we replace the ID such as ``4``, by a string ``beautiful``

* Don't expect to see any outcome from the command as we did not set ``Block`` in our settings. We set ``Report``.
* Go to Security Dashboard and check your logs (can take up to 1min to be displayed). You can see a violation ``Request Path Parameter Violation``

   .. image:: ../pictures/validation-log.png
      :align: center

   .. note:: We sent an ID with a string instead of an integer. F5XC can validate Request and Response body payload.