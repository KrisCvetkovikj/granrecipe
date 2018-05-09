angular.module('app.controllers', ['ngFileUpload'])

	.controller('menuCtrl', ['$scope', '$stateParams', '$window', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
		function ($scope, $stateParams, $window, $state) {
			$scope.logout = function () {
				$window.localStorage.clear();
				$state.go('login');
			};

			$scope.hideMenu = function () {
				return $window.localStorage.getItem('token') !== '';
			}

			if (!$window.localStorage.getItem('token')) {
				$state.go('login');
			}
		}])

	.controller('yourRecipesCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'Recipe', '$window', '$ionicModal', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
		function ($scope, $rootScope, $state, $stateParams, Recipe, $window, $ionicModal) {
			$scope.recipes = [];
			/*$scope.recipe = {
			 ingredients: []
			 };*/
			$scope.recipe = {};
			// $scope.ingredient = {};

			$scope.getRecipes = function () {
				Recipe.loadRecipes().then(function (response) {
					console.log(response);
					$scope.recipes = response.data.filter(function (item) {
						return item._user.username === $window.localStorage.getItem('username');
					});
				});
			};

			/*$scope.addIngredient = function () {
			 $scope.recipe.ingredients.push(angular.copy($scope.ingredient));
			 $scope.ingredient = {};
			 };*/

			$scope.viewDetails = function (data) {
				$rootScope.recipe = data;
				console.log(data);
				$state.go('recipeDetails');
			};

			$ionicModal.fromTemplateUrl('my-modal.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function (modal) {
				$scope.modal = modal;
			});
			$scope.openModal = function () {
				// $scope.recipe = {ingredients: []};
				$scope.modal.show();
			};
			$scope.closeModal = function () {
				$scope.modal.hide();
			};
			// Cleanup the modal when we're done with it!
			$scope.$on('$destroy', function () {
				$scope.modal.remove();
			});
			// Execute action on hide modal
			$scope.$on('modal.hidden', function () {
				// Execute action
			});
			// Execute action on remove modal
			$scope.$on('modal.removed', function () {
				// Execute action
			});

			$scope.createRecipe = function () {
				Recipe.saveRecipe($scope.recipe).then(function (response) {
					console.log(response);
					$scope.closeModal();
					$scope.getRecipes();
					//$rootScope.recipe = {};
					//$ionicHistory.goBack();
				})
			}

			$scope.getRecipes();
		}])

	.controller('otherRecipesCtrl', ['$scope', '$stateParams', 'Recipe', '$rootScope', '$state', '$window', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
		function ($scope, $stateParams, Recipe, $rootScope, $state, $window) {
			$scope.loadData = function () {
				Recipe.loadOther().then(function (response) {
					$scope.recipes = response.data.filter(function (item) {
						return item._user.username !== $window.localStorage.getItem('username');
					});
					console.log(response);
				}).catch(function (err) {
					console.error(err);
				})
			};
			$scope.recipes = [];
			$scope.loadData();

			$scope.viewDetails = function (data) {
				$rootScope.recipe = data;
				console.log(data);
				$state.go('recipeDetails');
			};
		}])

	.controller('yourProfileCtrl', ['$scope', '$stateParams', '$window', 'User', 'Upload', '$ionicPopup', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
		function ($scope, $stateParams, $window, User, Upload, $ionicPopup, $timeout) {
			$scope.requestConfirmed = false;

			$scope.loadUserData = function () {
				$scope.requestConfirmed = true;
				User.getUserData().then(function (response) {
					console.log(response);
					$scope.user = response.data;
					$window.localStorage.setItem("username", $scope.user.username);
					if ($scope.user.photo !== undefined) {
						$window.localStorage.setItem("photo", $scope.user.photo);
					}
					$scope.requestConfirmed = false;
				});
			};

			// upload on file select or drop
			$scope.upload = function (file) {
				$scope.requestConfirmed = true;
				if (file !== undefined) {
					Upload.base64DataUrl(file).then(function (urls) {
						User.uploadPhoto({
							username: $scope.user.username,
							photo: urls
						}).then(function (response) {
							$scope.file = '';
							file = '';
							$window.localStorage.setItem('photo', urls);
							$scope.storagePhoto = urls;
							$scope.showPopup("Success!", "Image has been updated!");
							$scope.requestConfirmed = false;
						}).catch(function (err) {
							console.log(err);
							$scope.requestConfirmed = false;
						});
					});
				} else {
					$scope.showPopup("Upload failed!", "Select an image first!");
					$scope.requestConfirmed = false;
				}
			};

			// Triggered on a button click, or some other target
			$scope.showPopup = function (title, subTitle) {
				$scope.data = {};

				// An elaborate, custom popup
				var myPopup = $ionicPopup.show({
					title: title,
					subTitle: subTitle
				});

				$timeout(function () {
					myPopup.close(); //close the popup after 3 seconds for some reason
				}, 2000);
			};

			$scope.loadUserData();
			$scope.storagePhoto = $window.localStorage.getItem('photo');
		}])
	.controller('createRecipeCtrl', ['$scope', '$stateParams', 'Recipe', '$ionicHistory', '$window', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
		function ($scope, $stateParams, Recipe, $ionicHistory, $window, $rootScope) {
			$scope.recipe = {};

			$scope.createRecipe = function () {
				Recipe.saveRecipe($scope.recipe).then(function (response) {
					console.log(response);
					$rootScope.recipe = {};
					//$ionicHistory.goBack();
				})
			}
		}])
	.controller('recipeDetailsCtrl', ['$scope', '$rootScope', '$stateParams', 'Recipe', '$ionicHistory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
		function ($scope, $rootScope, $stateParams, Recipe, $ionicHistory) {
			$scope.recipe = $rootScope.recipe;

			$scope.removeRecipe = function (data) {
				Recipe.deleteRecipe(data).then(function (response) {
					$ionicHistory.goBack();
				});
			}
		}])

	.controller('loginCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicPopup', 'AuthService', '$window', '$ionicSideMenuDelegate',
		// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
		// You can include any angular dependencies as parameters for this function
		// TIP: Access Route Parameters for your page via $stateParams.parameterName
		function ($scope, $rootScope, $state, $stateParams, $ionicPopup, AuthService, $window, $ionicSideMenuDelegate) {
			$scope.data = {};
			$ionicSideMenuDelegate.canDragContent(false);

			$scope.login = function () {
				$window.localStorage.clear();
				$window.localStorage.setItem('username', $scope.data.username);

				AuthService.loginUser($scope.data).success(function (data) {
					$window.localStorage.setItem('token', data.token);
					$state.go('app.yourRecipes');
				}).error(function (data) {
					var alertPopup = $ionicPopup.alert({
						title: 'Login failed!',
						template: 'Please check your credentials!'
					});
				})
			}
		}
	])
	.controller('signupCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$ionicPopup', 'AuthService', '$window', '$ionicSideMenuDelegate',
		// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
		// You can include any angular dependencies as parameters for this function
		// TIP: Access Route Parameters for your page via $stateParams.parameterName
		function ($scope, $rootScope, $state, $stateParams, $ionicPopup, AuthService, $window, $ionicSideMenuDelegate) {
			$scope.data = {};
			$ionicSideMenuDelegate.canDragContent(false);

			$scope.signup = function () {
				AuthService.signupUser($scope.data).success(function (data) {
					$state.go('login');
				}).error(function (data) {
					var alertPopup = $ionicPopup.alert({
						title: 'Signup failed!',
						template: 'Please try again!'
					});
				})
			}
		}])
