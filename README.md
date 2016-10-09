# Beitech Frontnd Project

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

The project has a node.js server to host the FrontEnd Application, 

- `server.js` is the main file of the project, you can run it with `node server.js`
- Do not forget to generate the node modules, use `node install`
- Do not forget to generate the bower components, use `bower install` and then put them in the app folder
- Do not forget to set properly `serverPath` in `common.services.js` in order to point correctly to the REST services

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.
