angular.module('starter.controllers', [])


.controller('LoginCtrl', function($scope) {
})


.controller('ParseCtrl', function($scope, $ionicLoading, $ionicPopup){
	
	Parse.initialize("YIAnmLsSU8H5z65u8Vh4eK9zLHBtrqC64evkOz0M", "djxMlQ6AqOXeFNuj2UaDNVAnPnoXPlwIHlGAyxaS");


	this.parseSave = function(parseSave){
		 // LoaderService.show();
		 $ionicLoading.show({
	       template: 'Sending Report...'
	     });

		var TestObject = Parse.Object.extend("TestObject");
		var testObject = new TestObject();
		var currentTab = document.querySelector('#selectedTab').value;
		var userGeoPoint = document.querySelector('#userLocation').value;

		
		var imageData = document.querySelector('#viewImageData').value;

		
		if (currentTab == 3){
			var statusData = document.querySelector('#tab3status').value;
			var issueData = document.querySelector('#tab3issue').value;
			var commentsData = document.querySelector('#tab3comments').value;
			var streetData = document.querySelector('#tab3streetname').value;

			var saveString = {status: statusData, issue: issueData, comments:commentsData, usergeo:userGeoPoint, reportType:3, street:streetData};
		} else if (currentTab == 2){

			var partyData = document.querySelector('#tab2party').value;
			var commentsData = document.querySelector('#tab2comments').value;
			var streetData = document.querySelector('#tab2streetname').value;

			var saveString = {party: partyData, comments:commentsData, usergeo:userGeoPoint, reportType:2, street:streetData};

		} else if (currentTab == 4){
			var crimeData = document.querySelector('#tab4crime').value;
			var commentsData = document.querySelector('#tab4comments').value;
			var streetData = document.querySelector('#tab4streetname').value;

			var saveString = {crime: partyData, comments:commentsData, crimeData:crimeData, usergeo:userGeoPoint, reportType:4, street:streetData};

		} else{
			var typeData = document.querySelector('#tab1type').value;
			var statusData = document.querySelector('#tab1status').value;
			var issueData = document.querySelector('#tab1issue').value;
			var commentsData = document.querySelector('#tab1comments').value;
			var streetData = document.querySelector('#tab1streetname').value;

			var saveString = {type: typeData, status: statusData, issue: issueData, comments:commentsData, usergeo:userGeoPoint, reportType:1, street:streetData};

		}

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



			   testObject.save(saveString).then(function(object) {
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
			testObject.save(saveString).then(function(object) {

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
			// $ionicLoading.hide();
			
			
		}, function (error) {

			// $ionicLoading.hide();
			 document.querySelector('#errorBar').style = "display: block";
			// alert(error.message);

			
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
