import app from '../app';


export default class IndexController {
    constructor ($scope) {
        console.log('$scope ', $scope);


        $scope.navigationLinks = [
            { label: 'About Me', value: 'bio'},
            { label: 'Portfolio', value: 'work'},
            { label: 'Contact', value: 'contact'},
        ];



    };

}

app.controller('IndexController', IndexController)
