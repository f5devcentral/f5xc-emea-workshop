function c3m1l1a() {        
    const config = {
      "metadata": {
        "name": "arcadia-stocks",
        "disable": false
      },
      "spec": {
        "service": {
          "num_replicas": 1,
          "containers": [
            {
              "name": "stocks",
              "image": {
                "name": "registry.hub.docker.com/sorinboiaf5/arcadia-stocks:ocp",
                "public": {},
                "pull_policy": "IMAGE_PULL_POLICY_DEFAULT"
              },
              "init_container": false,
              "flavor": "CONTAINER_FLAVOR_TYPE_TINY"
            }
          ],
          "deploy_options": {
            "deploy_re_sites": {
              "site": [
                {
                  "tenant": "ves-io",
                  "namespace": "system",
                  "name": "tn2-lon",
                  "kind": "site"
                }
              ]
            }
          },
          "advertise_options": {
            "advertise_in_cluster": {
              "port": {
                "info": {
                  "port": 80,
                  "protocol": "PROTOCOL_TCP",
                  "target_port": 8080
                }
              }
            }
          }
        }
      }
    }
    displayJSON(config,'Distributed Apps -> Applications -> Virtual K8s -> Click on vk8s-....-..... -> Workloads -> Add VK8s Workload -> JSON -> Copy paste the JSON config -> Save and Exit');    
}

