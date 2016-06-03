(function () {
    'use strict';
    angular.module('MyApp')
        .directive('Maxlength', function() {
            return {
                require: 'ngModel',
                link: function (scope, element, attrs, ngModelCtrl) {
                    var maxlength = Number(attrs.myMaxlength);
                    function fromUser(text) {
                        if (text.length > maxlength) {
                            var transformedInput = text.substring(0, maxlength);
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                            return transformedInput;
                        }
                        return text;
                    }
                    ngModelCtrl.$parsers.push(fromUser);
                }
            };
        });
})();