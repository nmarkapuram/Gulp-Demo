(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*Action Bar controller code*/
app.controller("actionBarCtrl",['$scope',function($scope){
    $scope.actionBar = 'sample';  
	$scope.actionBarlist = [ 
        {'name': 'Manage License Keys', 'icon': 'icon_license_keys.png','notification': 1},
        {'name': 'Get Support', 'icon': 'icon_get_support.png','notification': 0 },
        {'name': 'View notifications', 'icon': 'alerts_icon.png','notification': 3},
        {'name': 'Manage Users & Permissions', 'icon': 'users_icon.png','notification': 0},
        {'name': 'Subscription Services', 'icon': 'subscription_services_icon.png','notification': 0}
    ];

    }
]);
app.directive('vmfActionBar', ['$compile', function($compile){
return{
	restrict: 'EA',
    scope: {
        title: '@',
        name:'@',
        options:'='
    },

    link: function(scope, element, attrs ) {
         var temp ;
         temp = '<div class="vmf-action"> <ul>';
        var len = scope.options.length;
        var notifications;
        angular.forEach(scope.options,function(option,index){ 
            if(option.notification > 0) {
                notifications='<span class="vmf-notification"><span class="totalAlerts">'+option.notification+'</span></span>';
            }
            temp += '<li><a href="javascript: void(0)"><span class="bordRt">'+notifications+'<img src="/dev/assets/img/'+ option.icon +'" /><span class="labelText">' + option.name + '</span></span></a></li>'; 
            notifications="";
        });
        temp += '</ul></div>';
        
        element.append(temp);
        $compile(element.contents())(scope);

        /*scope.clickme = function(){
            console.log('i am being clicked');
        };*/

    }
    
};
}]);

describe('Unit Testing vmfActionBar', function() {
  var elm, scope;

  beforeEach(module('vmfModule'));

  beforeEach(inject(function($rootScope, $compile) {
    elm = angular.element(
      '<div>' +
        '<vmf-action-bar options=\"actionBarlist\">' +
        '</vmf-action-bar>' +
      '</div>');
    scope = $rootScope;
  }));
// start of tests 
  it('should have 5 objects', inject(function($compile, $rootScope) {
    scope.actionBarlist = [ 
        {'name': 'Manage License Keys', 'icon': 'actionButtonDownload.png','notification': 1},
        {'name': 'Get Support', 'icon': 'actionButtonDownload.png','notification': 0 },
        {'name': 'View notifications', 'icon': 'actionButtonDownload.png','notification': 3},
        {'name': 'Manage Users & Permissions', 'icon': 'actionButtonDownload.png','notification': 0},
        {'name': 'Subscription Services', 'icon': 'actionButtonDownload.png','notification': 0}
    ];
    elm = $compile(elm)(scope);
    scope.$digest();
    var titles = $(elm).find('ul li a');
    expect(titles.length).toBe(5);     
  }));

  it('should have class', inject(function($compile, $rootScope) {
    scope.actionBarlist = [ 
        {'name': 'Manage License Keys', 'icon': 'actionButtonDownload.png','notification': 1},
        {'name': 'Get Support', 'icon': 'actionButtonDownload.png','notification': 0 },
        {'name': 'View notifications', 'icon': 'actionButtonDownload.png','notification': 3},
        {'name': 'Manage Users & Permissions', 'icon': 'actionButtonDownload.png','notification': 0},
        {'name': 'Subscription Services', 'icon': 'actionButtonDownload.png','notification': 0}
    ];
    elm = $compile(elm)(scope);
    scope.$digest();
    expect(elm.find('div').hasClass('vmf-notification'));
  })); 

});
},{}]},{},[1])