# API documentation

## /complaints/get

| PARAMETER        | VALUE           | DESCRIPTION  |
| ------------- |:-------------:| -----:|
| apikey      | string | API key user got after registration (**required**) |
| type      | string      |   The type of complaint (optional) |
| agency | string      |    The agency that reported the complaint (optional) |
| descriptor | string      |    The description of the complaint; must be lower case. (optional) |
| limit | integer      |    The maximum number of results to be returned. Will return all results if none specified. (optional) |

## /complainttypes/get

| PARAMETER        | VALUE           | DESCRIPTION  |
| ------------- |:-------------:| -----:|
| apikey      | string | API key user got after registration (**required**) |
| limit | integer      |    The maximum number of results to be returned. Will return all results if none specified. (optional) |

## /agencies/get

| PARAMETER        | VALUE           | DESCRIPTION  |
| ------------- |:-------------:| -----:|
| apikey      | string | API key user got after registration (**required**) |
| limit | integer      |    The maximum number of results to be returned. Will return all results if none specified. (optional) |
