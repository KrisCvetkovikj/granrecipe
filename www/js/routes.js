angular.module('app.routes', [])

	.config(function ($stateProvider, $urlRouterProvider) {

		// Ionic uses AngularUI Router which uses the concept of states
		// Learn more here: https://github.com/angular-ui/ui-router
		// Set up the various states which the app can be in.
		// Each state's controller can be found in controllers.js
		$stateProvider


			.state('app', {
				url: '/app',
				templateUrl: 'templates/tabsController.html',
				abstract: true,
				controller: 'menuCtrl'
			})

			.state('app.yourRecipes', {
				url: '/yourrecipes',
				views: {
					'tab4': {
						templateUrl: 'templates/yourRecipes.html',
						controller: 'yourRecipesCtrl'
					}
				}
			})

			.state('app.otherRecipes', {
				url: '/otherrecipes',
				views: {
					'tab5': {
						templateUrl: 'templates/otherRecipes.html',
						controller: 'otherRecipesCtrl'
					}
				}
			})

			.state('app.yourProfile', {
				url: '/yourprofile',
				views: {
					'tab6': {
						templateUrl: 'templates/yourProfile.html',
						controller: 'yourProfileCtrl'
					}
				}
			})

			.state('createRecipe', {
				url: '/createrecipe',
				templateUrl: 'templates/createRecipe.html',
				controller: 'createRecipeCtrl'
			})

			.state('recipeDetails', {
				url: '/recipedetails',
				templateUrl: 'templates/recipeDetails.html',
				controller: 'recipeDetailsCtrl'
			})

			.state('login', {
				url: '/login',
				templateUrl: 'templates/login.html',
				controller: 'loginCtrl'
			})

			.state('signup', {
				url: '/signup',
				templateUrl: 'templates/signup.html',
				controller: 'signupCtrl'
			})

		$urlRouterProvider.otherwise('/login')


	});
