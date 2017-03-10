// Importing Angular
import angular from 'angular';
import 'angular-route';
import 'angular-sanitize';
import 'angular-aria';
import 'angular-animate';
import 'angular-material';
    // <script src="/node_modules/angular-animate/angular-animate.js"></script>
    // <script src="/node_modules/angular-material/angular-material.js"></script>


// main scss
import '../sass/app.scss';
// main portfolio app
import app from './app';
// Controllers
import IndexController from './controllers/IndexController';
// Tempates
import IndexTpl from '../templates/index.tpl.html';


app.config(function($locationProvider, $routeProvider, $compileProvider) {

    'ngInject';

    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('');
    console.log('ajskdbaidjbkad');

    $routeProvider.when('/', {
        templateUrl: IndexTpl,
        controller: IndexController
    })

});


// initial run + setup
app.run(($rootScope) => {
    'ngInject';

});
