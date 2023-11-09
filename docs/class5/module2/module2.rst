##################
Virtual Kubernetes
##################

F5 XC can provide a distributed Virtual Kubernetes environment where we can deploy our application containers in any of the F5 XC Regional Edges or Customer Edges.

This allows us to run our application code very close to the client and provide very fast responses.

For our application the Stocks service is providing the current price of the crypto currency.

To ensure that the price that the client is seeing is the same as the backend and is not different due to latency issues we are exposing the Stocks service both in the on prem Kubernetes cluster for use by the local services and at the same time deploy it on the London Regional Edge.

.. image:: ./pictures/Slide1.png
   :align: center


**Module 1 - All sections**

.. toctree::
   :maxdepth: 1
   :glob:

   lab*/lab*

