// Create application service
var controllerService = SYMPHONY.services.register("symphonyAnalytics:controller");

SYMPHONY.remote.hello().then(function(data) {

    SYMPHONY.application.register("symphonyAnalytics", ["modules", "applications-nav"], ["symphonyAnalytics:controller"]).then(function(response) {

        // Subscribe to Symphony services
        var modulesService = SYMPHONY.services.subscribe("modules");
        var navService = SYMPHONY.services.subscribe("applications-nav");

        // Add item to left nav for Symphony Analytics app
        navService.add("symphonyAnalytics-nav", "Symphony Analytics", "symphonyAnalytics:controller");

        controllerService.implement({

            // When Symphony Analytics left nav item is clicked on, focus the nav item, open and focus module containing app.html which contains the Domo iframe
            select: function(id) {
                if (id == "symphonyAnalytics-nav") {
                    navService.focus("symphonyAnalytics-nav"); 
                }
                
                modulesService.show("symphonyAnalytics-module", {title: "Symphony Analytics"}, "symphonyAnalytics:controller", "https://anjanadasu.github.io/symphony-analytics-app/app.html", {
                    "canFloat": true,
                });
                modulesService.focus("symphonyAnalytics-module");
            },
        });
    }.bind(this))
}.bind(this));
