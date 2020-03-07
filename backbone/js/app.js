/* ==================================================================
 *
 * View classes used to create the tree views we'll be working with:
 * HomeView : it's the default view to display when index.html with no hash fragment (or with an empty has fragment = '#')
 * FirstView: it's the view that needs to be rendered when the hash fragment is set to '#first'
 * NoRouteView: this view will handle any unrecognized hash fragment
 *
 * ==================================================================
 */
var HomeView = Backbone.View.extend({
	render: function() {
		this.$el.html(
			'<h1>Home page</h1>' +
			'<a href="#first">Go to First View</a>');		
	}
});

var FirstView = Backbone.View.extend({
	render: function() {
		this.$el.html(
			'<h1>First View</h1>' +
			'<a href="#">Go back to the Home page</a>');		
	}
});

var NoRouteView = Backbone.View.extend({
	render: function() {
		this.$el.html(
			'<h1>Oops, you typed the wrong URL?</h1>' +
			'<a href="#">Go to the Home page</a>');		
	}
});

//this variable will hold the current view displayed in the page
var view;

//This is the class (constructor function) for the Router.
//When extending Backbone.Router we pass the usual configuration object
//providing the property "routes" that contains the hash fragments that we
//want to support and the function names that will be called in our Router object
//when those fragments appear on the URL
var AppRouter = Backbone.Router.extend({
	routes: {
		'': 'home',
		'first': 'routeToFirst',
		'*default' : 'noRoute'
	}, 
	
	home: function() {
		console.log("Home Route");
		
		//if there's already a view rendered in the page, first
        //we need to tell it to stop listening to events from the HTML elements,
        //since we're going to re-create the html elements within the #content div
        //with the new view
		if(view) {
			view.undelegateEvents();
		}
		view = new HomeView({el: '#content'});
		view.render();
	},
	
	routeToFirst: function() {
		console.log("First Route");
		if(view) {
			view.undelegateEvents();
		}
	    view = new FirstView({el: '#content'});
		view.render();
	},
	
	noRoute: function() {
		console.log("No Route");
		if(view) {
			view.undelegateEvents();
		}
		view = new NoRouteView({el: '#content'});
		view.render();
	}
});

//here we create a new object for the type AppRouter (using AppRouter as a constructor function)
//our new object then will have the functions 'home', 'routeToFirst', 'noRoute' that we specified
//in the configuration object used with the Backbone.Router.extend() function
var router = new AppRouter();

//the function "start" present in the object Backbone.history is fundamental.
//it tells Backbone to start listening to any change in the URL hash fragment and call
//the router when this happens.. Backbone will immediately start looking at the URL and will
//call the router immediately (triggering the call to one of the router functions and so, the display of a view).
Backbone.history.start();

