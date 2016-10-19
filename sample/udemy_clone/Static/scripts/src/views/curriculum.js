define(['jquery', 'backbone', 'handlebars'], function ($, backbone, Handlebars) {

    'use strict';

    function init(container, isCreate) {
        //Create the model
        var Section = Backbone.Model.extend();

        //Create collection of Results
        //Set the url property on a collection to reference its location on the server
        var SectionCollection = Backbone.Collection.extend({
            model: Section,
            url: "/Static/data/sections_lectures.json"
        });

        var SectionView = Backbone.View.extend({
            // Set el of the views.
           
        });

        var backboneView = backboneInit(SectionCollection, SectionView);

        if (isCreate)
            return new backboneView({
                el: container
            });
        else
            return [backboneView, HandlerBars];
    }

    function backboneInit(SectionCollection, SectionView) {
        return Backbone.View.extend({
            initialize: function () {
                // Create instance of People Collection
                var sectionCollection = new SectionCollection();
                // Create instances of the views
                var sectionView = new SectionView({
                    collection: sectionCollection
                });

                //Render after fetch data successfully
                sectionCollection.fetch({
                    success: function () {
                        sectionView.render();
                    }
                });
            },

            events: {
                'click .cur-list-row': 'showDetails'
            },
            
            //show details when click on down arrow
            showDetails: function (e) {
                //get closest tr element, it is the parent of clicked down-arrow icon
                var tr = $(e.currentTarget);

                if (tr.next().hasClass("cur-list-row-details")) {
                    //check whether tr element have class 'on', if not we add this class to tr
                    if (tr.hasClass("on")) {
                        tr.removeClass("on");
                    } else {
                        tr.addClass("on");
                    }

                    //get the next sibling of the current tr element
                    tr.next().toggle();
                }
            }
        });
    }

    return {
        init: function (container, isCreate) {
            return init(container, isCreate);
        }
    };
});