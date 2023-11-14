function c5m1l3a() {        
    const config = {
        "metadata": {
          "name": "arcadia-hc",
          "disable": false
        },
        "spec": {
          "http_health_check": {
            "use_origin_server_name": {},
            "path": "/healthz",
            "use_http2": false,
            "expected_status_codes": [
              "200"
            ]
          },
          "timeout": 3,
          "interval": 15,
          "unhealthy_threshold": 1,
          "healthy_threshold": 3,
          "jitter_percent": 30
        }
    }
    displayJSON(config,'Multi-Cloud App Connect -> Manage -> Load Balancers -> Health Checks -> Add Health Check -> JSON -> Copy paste the JSON config -> Save and Exit');    
}