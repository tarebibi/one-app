angular.module('starter.controllers', [])


.controller('LoginCtrl', function($scope) {
})


.controller('ParseCtrl', function($scope, $ionicLoading, $ionicPopup){
	


	this.init = function(){
		// REMOVE THE LOGOUT PUT IN FOR TESTING PURPOSES
		// Parse.User.logOut();

		var currentUser = Parse.User.current();
		if (currentUser) {
		    window.location.href = '#/tab/menu';
		    // alert('currentuser:'+currentUser.id);
		}
	};


	this.logout = function(){
		Parse.User.logOut();
	    window.location.href = '#/tab/login';
	};

	this.resetPassword = function(){
		email = document.querySelector('#resetemail').value;

		if (email != ''){
			Parse.User.requestPasswordReset(email, {
			  success: function() {
			    // Password reset request was sent successfully
			    $ionicPopup.alert({
					title: 'Success!',
					template: 'Your password reset email has been sent to '+email
				}).then(function(res) {
			     window.location.href = '#/tab/login';
			    });
			  },
			  error: function(error) {
			    // Show the error message somewhere
			    $ionicPopup.alert({
					title: 'Error: '+ error.code,
					template: error.message
				});
			  }
			});
		} else {
			$ionicPopup.alert({
				title: 'Error',
				template: 'Please enter an email address'
			});
		}
	};

	this.userLogin = function(){

		var rawusername = document.querySelector('#loginuser').value;
		var password = document.querySelector('#loginpass').value;

		var username = rawusername.toLowerCase();


		if (username != '' && password != ''){
			Parse.User.logIn(username, password, {
			  success: function(user) {
			    window.location.href = '#/tab/menu';
			  },
			  error: function(user, error) {
			    $ionicPopup.alert({
					title: 'Error: '+ error.code,
					template: error.message
				});
			  }
			});
		} else {
			$ionicPopup.alert({
				title: 'Error',
				template: 'Please enter your username and password'
			});
		}

	};


	this.userRegister = function(userRegister){
		var rawusername = document.querySelector('#newuser').value;
		var username = rawusername.toLowerCase();

		var rawemail = document.querySelector('#newemail').value;
		var email = rawemail.toLowerCase();

		var password = document.querySelector('#newpass').value;

		if (username != '' && email != '' && password != ''){
			var user = new Parse.User();
			user.set("username", username);
			user.set("password", password);
			user.set("email", email);
			 
			 
			user.signUp(null, {
			  success: function(user) {
			    // Hooray! Let them use the app now.
			    // go to menu
			    window.location.href = '#/tab/menu';
			  },
			  error: function(user, error) {
			    // Show the error message somewhere and let the user try again.
			    $ionicPopup.alert({
					title: 'Error: '+ error.code,
					template: error.message
				});
			  }
			});
		} else {
			$ionicPopup.alert({
				title: 'Error!',
				template: 'Please fill in all fields.'
			});
		}
	};

	this.parseSave = function(parseSave){
		 // LoaderService.show();
		 $ionicLoading.show({
	       template: 'Sending Report...'
	     });

		var ReportObject = Parse.Object.extend("ReportObject");
		var reportObject = new ReportObject();
		var currentTab = document.querySelector('#selectedTab').value;
		var userGeoPoint = document.querySelector('#userLocation').value;

		var currentUser = Parse.User.current();
		var userID = currentUser.id;

		
		var imageData = document.querySelector('#viewImageData').value;

		
		if (currentTab == 3){
			var statusData = document.querySelector('#tab3status').value;
			var commentsData = document.querySelector('#tab3comments').value;
			var streetData = document.querySelector('#tab3streetname').value;

			var saveString = {status: statusData, comments:commentsData, usergeo:userGeoPoint, reportType:3, street:streetData};
		} else if (currentTab == 2){

			var partyData = document.querySelector('#tab2party').value;
			var commentsData = document.querySelector('#tab2comments').value;
			var streetData = document.querySelector('#tab2streetname').value;

			var saveString = {party: partyData, comments:commentsData, usergeo:userGeoPoint, reportType:2, street:streetData};

		} else if (currentTab == 4){
			var crimeData = document.querySelector('#tab4crime').value;
			var commentsData = document.querySelector('#tab4comments').value;
			var streetData = document.querySelector('#tab4streetname').value;

			var saveString = {crime: crimeData, comments:commentsData, usergeo:userGeoPoint, reportType:4, street:streetData};

		} else{
			var typeData = document.querySelector('#tab1type').value;
			var commentsData = document.querySelector('#tab1comments').value;
			var streetData = document.querySelector('#tab1streetname').value;
			var statusData = document.querySelector('#tab1status').value;

			var saveString = {type: typeData, status: statusData, comments:commentsData, usergeo:userGeoPoint, reportType:1, street:streetData};

		}
		saveString.user = userID;

/*
		var alertPopup = $ionicPopup.alert({
			title: 'Success!',
			template: 'Your report has been sent.'
		});
*/
		if (imageData){
			var parseFile = new Parse.File("mypic.jpg", {base64:imageData});
			 parseFile.save().then(function() {
			  // Save the form and save the url to the results
			   var imageURL = parseFile.url();
			   saveString.url = imageURL;



			   reportObject.save(saveString).then(function(object) {
			 	  $ionicLoading.hide();
			 	  $ionicPopup.alert({
						title: 'Success!',
						template: 'Your report has been sent.'
					}).then(function(res) {
				     // location.reload();
				     document.querySelector('#viewImageData').value = '';
				     window.location.href = '#/tab/menu';
				   });
				},
				function(object){
					$ionicLoading.hide();
					$ionicPopup.alert({
				     title: 'Error!',
				     template: 'Oops....Problem connecting to the internet. Your report was NOT sent. Please try again.'
				   });
				});



			}, function(error) {
				$ionicLoading.hide();
				$ionicPopup.alert({
				     title: 'Error!',
				     template: 'Oops....Your report was NOT sent. Please try again.'
				   });

			  // The file either could not be read, or could not be saved to Parse.
			});


		} else {

			// do regular save
			reportObject.save(saveString).then(function(object) {

				$ionicLoading.hide();
				$ionicPopup.alert({
					title: 'Success!',
					template: 'Your report has been sent.'
				}).then(function(res) {
				 document.querySelector('#viewImageData').value = '';
			     window.location.href = '#/tab/menu';
			    });
			// update some notification div here

			  // $ionicLoading.hide();
/*
			  alertPopup.then(function(res) {
			     location.reload();
			   });

*/			  


			},
			function(object){
				$ionicLoading.hide();
				$ionicPopup.alert({
			     title: 'Error!',
			     template: 'Oops....Problem connecting to the internet. Your report was NOT sent. Please try again.'
			   });
			});

		}
		
		

	};


})

.controller('ReportCtrl', function($scope, $ionicLoading, $ionicPopup) {

	this.infrastructureIndex = 0;
	this.tab = 1;
	

	this.changeSelect = function(changeSelect){
		this.myValue = $scope.selectLevel1;
		this.infrastructureIndex = this.myValue.index;
	};

	this.setTab = function(tabValue){
		this.tab = tabValue;
		document.querySelector('#selectedTab').value = tabValue;
	};

	this.isSelected = function(selectValue){
		return this.tab === selectValue;
	};

	this.infrastructure = [
		{
			index: 0,
			type: 'Road',
			status: ['Tarred', 'Untarred', 'Under Construction'],
			issue: ['Pothole', 'Flood', 'Refuse Dump']
		},
		{
			index: 1,
			type: 'Bridge',
			status: ['Under Construction', 'Wooden', 'Concrete'],
			issue: ['Pothole', 'Flood', 'Damaged']
		},
		{
			index: 2,
			type: 'Rail',
			status: ['Under Construction', 'Completed'],
			issue: ['Track Damage']
		},
		{
			index: 3,
			type: 'Water Pipeline',
			status: ['Functional', 'Non-Functional'],
			issue: ['Damage', 'Leakage']
		},
		{
			index: 4,
			type: 'Cable',
			status: ['Functional', 'Non-Functional'],
			issue: ['Damage']
		},
		{
			index: 5,
			type: 'Transformer',
			status: ['Functional', 'Non-Functional'],
			issue: ['Damage']
		},
		{
			index: 6,
			type: 'Traffic Light',
			status: ['Functional', 'Non-Functional'],
			issue: ['Damage']
		},
		{
			index: 7,
			type: 'Street Light',
			status: ['Functional', 'Non-Functional'],
			issue: ['Damage']
		}
	];

	this.elections = [
		{
			party: 'APGA'
		},
		{
			party: 'PDP'
		},
		{
			party: 'APC'
		},
		{
			party: 'ANPP'
		}
	];

	this.crime = [
		{
			ctype: 'Theft'
		},
		{
			ctype: 'Threat'
		},
		{
			ctype: 'Vandalism'
		},
		{
			ctype: 'Kidnap'
		}
	];

	this.traffic = [
		{
			status: ['Stand Still', 'Slow', 'Moving'],
			issue: ['Accident', 'Flood', 'Pothole', 'Bus-stop']
		}
	];


//	var GPSError = 

	this.getGPS = function () {
		navigator.geolocation.getCurrentPosition(function (position) {
		
			this.userLocation =  position.coords.longitude + ','+ position.coords.latitude;
			document.querySelector('#userLocation').value = this.userLocation;
		}, function (error) {
			 document.querySelector('#errorBar').style = "display: block";			
		},
		{
			enableHighAccuracy: true
		});
		
	};

	this.init = function () {
   // check if there is query in url
	   // and fire search in case its value is not empty
	   
	  document.querySelector('#errorBar').style = "display: none";
	  /* $ionicLoading.show({
	      template: 'Getting GPS Coordinates...'
	    });
	  */
	  this.getGPS();

	   
	};

	// and fire it after definition
	this.init();

})

.controller('MapCtrl', function($scope) {



	


})


/*
.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})
*/

.controller('AccountCtrl', function($scope) {
})


.controller('CamCtrl', ['$scope', '$location', 'GetUU',

	function($scope, $location, GetUU) {
		// init variables
		$scope.data = {};
		$scope.obj;
		var pictureSource;   // picture source
		var destinationType; // sets the format of returned value
		var url;

		ionic.Platform.ready(function() {
		//console.log("ready get camera types");
			if (!navigator.camera){
			// error handling
				return;
			}
		//pictureSource=navigator.camera.PictureSourceType.PHOTOLIBRARY;
		pictureSource=navigator.camera.PictureSourceType.CAMERA;
		// destinationType=navigator.camera.DestinationType.FILE_URI;
		});

		this.takePicture = function() {
			var options =   {
				quality: 50,
				destinationType: 0,
				sourceType: pictureSource,
				correctOrientation: true,
				encodingType: 0,
				targetWidth:500,
				targetHeight:500
			};
			if (!navigator.camera)
				{
				// error handling
				return;
			}
			navigator.camera.getPicture(
				function (imageData) {

					var image = document.querySelector('img#mypicture');
					var link = document.querySelector('a#myPictureLink')

					image.src = "data:image/jpeg;base64," + imageData;
					// link.onclick = function(){ window.open(image.src, '_system', ' '); };
					document.querySelector('#viewImageData').value = imageData;
					
					},
				function (err) {
					console.log("got camera error ", err);
					// error handling camera plugin
					},
				options
			);
		};

		


	}
])

