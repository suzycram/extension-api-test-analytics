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

// Create our own local service pertaining to the application module
// We have namespaced local services with "1854a949f53b49039b4a1a5038629922:"
var 1854a949f53b49039b4a1a5038629922AppService = SYMPHONY.services.register("1854a949f53b49039b4a1a5038629922:app");

SYMPHONY.remote.1854a949f53b49039b4a1a5038629922().then(function(data) {

    // Set the theme of the app module
    var themeColor = data.themeV2.name;
    var themeSize = data.themeV2.size;
    // You must add the symphony-external-app class to the body element
    document.body.className = "symphony-external-app " + themeColor + " " + themeSize;

    SYMPHONY.application.connect("1854a949f53b49039b4a1a5038629922", ["modules", "applications-nav", "ui", "share"], ["1854a949f53b49039b4a1a5038629922:app"]).then(function(response) {

        // The userReferenceId is an anonymized random string that can be used for uniquely identifying users.
        // The userReferenceId persists until the application is uninstalled by the user. 
        // If the application is reinstalled, the userReferenceId will change.
        var userId = response.userReferenceId;
        
        // Subscribe to Symphony's services
        var modulesService = SYMPHONY.services.subscribe("modules");
        var navService = SYMPHONY.services.subscribe("applications-nav");
        var uiService = SYMPHONY.services.subscribe("ui");
        var shareService = SYMPHONY.services.subscribe("share");

        // UI: Listen for theme change events
        uiService.listen("themeChangeV2", function() {
            SYMPHONY.remote.1854a949f53b49039b4a1a5038629922().then(function(data) {
                themeColor = data.themeV2.name;
                themeSize = data.themeV2.size;
                document.body.className = "symphony-external-app " + themeColor + " " + themeSize;
            });
        });

        // MODULE: Add a menu item to our module
        modulesService.addMenuItem("1854a949f53b49039b4a1a5038629922", "About 1854a949f53b49039b4a1a5038629922 World App", "1854a949f53b49039b4a1a5038629922-menu-item");
        modulesService.setHandler("1854a949f53b49039b4a1a5038629922", "1854a949f53b49039b4a1a5038629922:app");

       
        // Implement methods on the application module service
        1854a949f53b49039b4a1a5038629922AppService.implement({
            // If the menu item is selected, display the About text 
            menuSelect: function(itemId) {
                if (itemId == "1854a949f53b49039b4a1a5038629922-menu-item") {
                    document.getElementById("about-1854a949f53b49039b4a1a5038629922-world-app").className = "";
                }
            }
        });

    }.bind(this))
}.bind(this));
