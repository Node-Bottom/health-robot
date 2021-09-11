define({ "api": [
  {
    "type": "get",
    "url": "/api/devices",
    "title": "AllDevices An array of all devices",
    "group": "Device",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n  {\n    \"_id\": \"61266a04cf05f72da48b173a\",\n    \"deviceid\": \"2190\",\n    \"device\": \"Sensor\",\n    \"devicebuilding\" : \"LB\",\n    \"deviceroom\" : \"102\",\n    \"sensorData\": [\n      {\n        \"hum\": \"56.9\",\n        \"temp\": \"25.3\"\n      },\n      {\n        \"hum\": \"56.9\",\n        \"temp\": \"25.5\"\n      }\n    ]\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"Device does not exist\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Device",
    "name": "GetApiDevices"
  },
  {
    "type": "get",
    "url": "/api/devices",
    "title": "",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "group": "F:\\IOT\\invidiual project\\api\\api.js",
    "groupTitle": "F:\\IOT\\invidiual project\\api\\api.js",
    "name": "GetApiDevices"
  },
  {
    "type": "post",
    "url": "/api/devices",
    "title": "",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "deviceid",
            "description": "<p>Mandatory Device Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "device",
            "description": "<p>Mandatory Device type.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "devicebuilding",
            "description": "<p>Mandatory Device Building.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "deviceromm",
            "description": "<p>Mandatory Device Room.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "group": "F:\\IOT\\invidiual project\\api\\api.js",
    "groupTitle": "F:\\IOT\\invidiual project\\api\\api.js",
    "name": "PostApiDevices"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./public/generated-docs/main.js",
    "group": "F:\\IOT\\invidiual project\\api\\public\\generated-docs\\main.js",
    "groupTitle": "F:\\IOT\\invidiual project\\api\\public\\generated-docs\\main.js",
    "name": ""
  }
] });
