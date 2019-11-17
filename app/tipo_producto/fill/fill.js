var miControlador = miModulo.controller(
    "tipo_productoFillController",
    ['$scope', '$http', '$routeParams', 'auth', 'promesasService', '$location',

        function ($scope, $http, $routeParams, auth, promesasService, $location) {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message;
            //--
            $scope.controller = "tipo_productoFillController";
            //--
            $scope.mensaje = "";
            $scope.fallo = false;
            $scope.hecho = false;
            //--
            $scope.crear = function (numero) {
                promesasService.ajaxFill('tipo_producto', numero).then(function (response) {
                    if (response.data.status == 200) {
                        $scope.fallo = false;
                        $scope.hecho = true;
                        $scope.mensaje = "Se han insertado todos los registros.";
                    } else {
                        $scope.fallo = true;
                        $scope.hecho = true;
                        $scope.mensaje = "No se ha podido realizar la operación.";
                    }
                }, function () {
                    $scope.fallo = true;
                    $scope.hecho = true;
                    $scope.mensaje = "No se ha podido realizar la operación.";
                });
            }
            //--
            $scope.volver = function () {
                window.history.back();
            };
            $scope.cerrar = function () {
                $location.path('/home');
            };
        }
    ]
);