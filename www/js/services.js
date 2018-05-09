angular.module('app.services', ['ngFileUpload'])

	.factory('BlankFactory', [function () {

	}])
	.factory('Recipe', ['$http', '$window', function ($http, $window) {
		return {
			loadRecipes: function () {
				return $http.get("http://localhost:4567/recipes", {
					headers: {
						'Authorization': $window.localStorage.getItem('token')
					}
				});
			},

			saveRecipe: function (data) {
				return $http.post('http://localhost:4567/recipes', data, {
					headers: {
						'Authorization': $window.localStorage.getItem('token'),
						'Content-Type': 'application/json'
					}
				});
			},

			loadOther: function () {
				return $http.get('http://localhost:4567/recipes?other=yes', {
					headers: {
						'Authorization': $window.localStorage.getItem('token')
					}
				});
			},

			deleteRecipe: function (data) {
				return $http.delete('http://localhost:4567/recipes/' + data._id, {
					headers: {
						'Authorization': $window.localStorage.getItem('token')
					}
				});
			}
		}
	}])

	.factory('User', ['$http', '$window', function ($http, $window) {
		return {
			getUserData: function () {
				return $http.get("http://localhost:4567/users/me", {
					headers: {
						'Authorization': $window.localStorage.getItem('token')
					}
				});
			},
			uploadPhoto: function (data) {
				return $http.post("http://localhost:4567/users/me", data, {
					headers: {
						'Authorization': $window.localStorage.getItem('token')
					}
				});

			}
		}
	}])

	.factory('AuthService', ['$http', '$window', function ($http, $window) {
		return {
			loginUser: function (data) {
				return $http.post('http://localhost:4567/auth/login', data, {
					headers: {
						'Content-Type': 'application/json'
					}
				});
			},

			signupUser: function (data) {
				return $http.post('http://localhost:4567/users', data, {
					headers: {
						'Content-Type': 'application/json'
					}
				});
			}
		}
	}])

	.service('BlankService', [function () {
	}])
