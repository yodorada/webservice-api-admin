# webservice-api-admin

This is some basic Administration Backend for Yodorada RESTful API webservice, see: [PHP-Webservice-REST-API](https://github.com/yodorada/PHP-Webservice-REST-API). 

This project is based on the awesome [admin-on-rest](https://github.com/marmelab/admin-on-rest), 
and was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Please refer to their respective documentations for detailed information.  

*Note: This repo comes in a basic setup which is designed to work with the webservice as it is in it's current state when cloned from GitHub.*

## How to use

Set the two variables the .env file and then go and check your admin area with `yarn start` or `yarn build`

```env
REACT_APP_YODORADA_WEBSERVICE_API_HOST=insert here the absolute path to your restful api  
REACT_APP_YODORADA_WEBSERVICE_API_KEY=insert here the unique api key 
```

You can also create a .env.development.local file for a different setup when developing on your local machine. see [Adding Custom Environment Variables](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables)

