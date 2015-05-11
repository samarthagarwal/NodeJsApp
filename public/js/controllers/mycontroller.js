var app = angular.module("myapp", []);

app.controller("mycontroller", function($scope, $http){

	var refresh = function(){
		$scope.contact = {name:'',email:'', number:''};
		$http.get('/contactlist')
		.success(function(response)
		{	
			$scope.contactlist = response;
		});
	};

	refresh();
	$scope.addcontact = function(){

		console.log("ADDING a new contact for " + $scope.contact.name);
		$http.post('/contactlist', $scope.contact).
			success(function(data, status, headers, config) {
				console.log("success");
				refresh();

			}).
			error(function(data, status, headers, config) {
				console.log("error");
			});
	};

	$scope.deletecontact = function(id){

		console.log("Sending request to DELETE contact with _id "+id);

		$http.delete('/contactlist/'+ id)
			.success(function(response){
				console.log(response);
				refresh();
		});
	};

	$scope.editcontact = function(id){

		console.log("EDITING contact with id "+ id);

		$http.get('/contactlist/'+id).success(function(response)
		{	
			$scope.contact = response[0];
			console.log(response[0].name);
		});
	};

	$scope.updatecontact = function()
	{
		console.log("Sending request to UPDATE contact with _id "+ $scope.contact._id);

		$http.put('/contactlist/'+ $scope.contact._id, $scope.contact)
			.success(function(response){
				console.log(response);
				refresh();
			});
	};
});