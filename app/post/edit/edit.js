var miControlador = miModulo.controller(
    "postEditController",
    ['$scope', '$http', '$routeParams', '$window', '$location', 'promesasService', 'auth', '$filter',
        function ($scope, $http, $routeParams, $window, $location, promesasService, auth, $filter) {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message;
            if ($scope.authStatus != 200) {
                $location.path('/login');
            }
            //--
            $scope.fecha = new Date();
            //$scope.isOpen = false;
            //--
            $scope.id = $routeParams.id;
            //--
            $scope.controller = "postEditController";
            //--
            $scope.fallo = false;
            $scope.hecho = false;
            $scope.falloMensaje = "";
            //--
            promesasService.ajaxGet('post', $scope.id)
                .then(function (response) {
                    $scope.id = response.data.message.id;
                    $scope.titulo = response.data.message.titulo;
                    $scope.cuerpo = response.data.message.cuerpo;
                    $scope.etiquetas = response.data.message.etiquetas;
                    $scope.fecha = moment(response.data.message.fecha, 'DD/MM/YYYY HH:mm').toDate();
                }, function (error) {
                    $scope.fallo = true;
                });

            $scope.modificar = function () {
                const datos = {
                    id: $routeParams.id,
                    titulo: $scope.titulo,
                    cuerpo: $scope.cuerpo,
                    etiquetas: $scope.etiquetas,
                    fecha: $scope.fecha
                }
                var jsonToSend = {
                    data: JSON.stringify(datos)
                };
                $http.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
                $http.get('http://localhost:8081/trolleyes/json?ob=post&op=update', {
                        params: jsonToSend
                    })
                    .then(function (response) {
                        if (response.data.status != 200) {
                            $scope.fallo = true;
                            $scope.falloMensaje = response.data.message;
                        } else {
                            $scope.fallo = false;
                        }
                        $scope.hecho = true;
                    }, function (error) {
                        $scope.hecho = true;
                        $scope.fallo = true;
                        $scope.falloMensaje = error.message + " " + error.stack;
                    });
            }
            $scope.volver = function () {
                window.history.back();
            };
            $scope.cerrar = function () {
                $location.path('/home');
            };
        }
    ]

)