define({ "api": [
  {
    "type": "get",
    "url": "/api/users",
    "title": "AllDevices An array of all users",
    "group": "Device",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n  {\n    \"_id\": \"611f954f8312cb38bcce9816\",\n    \"email\": \"jainkinshuk112@gmail.com\",\n    \"mobile\" : \"0480243821\",\n    \"access\" : \"admin\",\n    \"pass\": \"Kinshu@123\"\n  }\n]",
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
    "name": "GetApiUsers"
  }
] });
