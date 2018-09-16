
$.getJSON("js/cats.json", function (data) {
	initialCats = data;
	// now that's what apply the bindeings
	//it's here to run after we get our data
	ko.applyBindings(new ViewModel());
})
	.fail(function () {
		alert("can't get the cats data json file relode the app")
	});

// add data parameter to be ready to make defrant cats -27
// and build on it
var Cat = function (data) {
	this.clickCount = ko.observable(data.clickCount);
	this.name = ko.observable(data.name);
	this.imgSrc = ko.observable(data.imgSrc);
	this.imgAttributtion = ko.observable(data.imgAttributtion);
	this.nicknames = ko.observableArray(data.nicknames);

	//the cat level based on clicks
	this.title = ko.computed(function() {
		var titels = ["new cat", "teen cat", "old cat", "other cat"];
		var num = (Math.floor(this.clickCount()/4));
		return (num >= 3 ? titels[3]:titels[num]);
	},this)
}


// ViewModel is just a function that's you must tell knouckout to apply your bindings or nothing will hapen
var ViewModel = function () {

	// the other way to deal with the binding context line 29
	var self = this;
	// self or that is a great way th keeping the accessint to the outer this
	// and not geting confused bt our inner this
	// the two ways are right no one better than the other

	// here we didin't need to enter initial value
	this.catsList = ko.observableArray();

	//now we creating our cats here 
	initialCats.forEach(function (catObj) {
		self.catsList().push(new Cat(catObj));
	});

	// now no need to creat current cat. just get the 0th cat in the cats list
	this.currentCat = ko.observable(self.catsList()[0])

	this.incrementCounter = function() {
		//get clickCount ad one resine clickCount
		//we removed the currentCat() becase with in the HTML we now in the binidig conxext 
		//of currentCat() -scope- in -25Course
		// -this- now reference to currentCat()
		this.clickCount(this.clickCount() + 1);
		//now self reference to ViewModel context
		// self.currentCat().clickCount(self.currentCat().clickCount + 1);
	};
	// cat passed from the click binding
	this.changeCurrentCat = function (clickedCat) {
		// update the currentCat.
		// don't use self.currentCat(self.catsList()[self.catsList().indexOf(cat)]);
		// whe click on an item and it runs a func it passes in the object you clicked on. specifically the model we're talking about.
		self.currentCat(clickedCat);
	} 

	
}


