/**
* Licensed to the Symphony Software Foundation (SSF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The SSF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
**/

// Create our own local controller service.
// We have namespaced local services with "SymphonyAnalyticsApp:"
var analyticsControllerService = SYMPHONY.services.register("SymphonyAnalyticsApp:controller");

// All Symphony services are namespaced with SYMPHONY
SYMPHONY.remote.hello().then(function(data) {

    // Register our application with the Symphony client:
    // Subscribe the application to remote (i.e. Symphony's) services
    // Register our own local services
    SYMPHONY.application.register("SymphonyAnalyticsApp", ["modules", "applications-nav", "ui", "share"], ["SymphonyAnalyticsApp:controller"]).then(function(response) {

        // The userReferenceId is an anonymized random string that can be used for uniquely identifying users.
        // The userReferenceId persists until the application is uninstalled by the user. 
        // If the application is reinstalled, the userReferenceId will change.
        var userId = response.userReferenceId;

        // Subscribe to Symphony's services
        var modulesService = SYMPHONY.services.subscribe("modules");
        var navService = SYMPHONY.services.subscribe("applications-nav");


        // LEFT NAV: Add an entry to the left navigation for our application
        navService.add("SymphonyAnalyticsApp-nav", "Symphony Analytics", "SymphonyAnalyticsApp:controller");


        // Implement some methods on our local service. These will be invoked by user actions.
        analyticsControllerService.implement({

            // LEFT NAV & MODULE: When the left navigation item is clicked on, invoke Symphony's module service to show our application in the grid
            select: function(id) {
                console.log("left nav selected");
                if (id == "SymphonyAnalyticsApp-nav") {
                   // Focus the left navigation item when clicked
                    navService.focus("SymphonyAnalyticsApp-nav"); 
                }
                
                modulesService.show("SymphonyAnalyticsApp", {title: "Symphony Analytics"}, "SymphonyAnalyticsApp:controller", "https://localhost:4000/app.html", {
                    // You must specify canFloat in the module options so that the module can be pinned
                    "canFloat": true,
                });
                // Focus the module after it is shown
                modulesService.focus("SymphonyAnalyticsApp");
            },
        });
    }.bind(this))
}.bind(this));
