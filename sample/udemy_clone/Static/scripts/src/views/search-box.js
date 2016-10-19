define(['jquery', 'underscore', 'backbone', 'handlebars'], function ($, _, backbone, Handlebars) {

    'use strict';

    function init(container, isCreate) {
        
        //Create the model
        var Result = Backbone.Model.extend();

        //Create collection of Results
        //Set the url property on a collection to reference its location on the server
        var ResultCollection = Backbone.Collection.extend({
            model: Result,
            url: "/Static/data/suggestive_data.json"
        });

        var ResultView = Backbone.View.extend({
            // Set el of the views.
            el: "#suggestive-box",
            render: function (eventName) {
                // This is method that can be called
                // once an object is init. You could 
                // also do this in the initialize event
                var tempEl = this.$el;
                
                //render li elements
                this.collection.each(function(result) {
                    var liHtml = '<li href="#" class="brand-item-7">';
                    var spanHtml = '<span>&nbsp&nbsp</span>';

                    spanHtml += '<span class="' + result.attributes.icon + '"></span>&nbsp';
                    spanHtml += '<span>' + result.attributes.text + '</span>';
                    spanHtml += '<span class="suggestive-data-type">' + result.attributes.type + '</span>';

                    liHtml += spanHtml + '</li>';
                    tempEl.append(liHtml);
                });

                return this;
            }
        });

        var backboneView = backboneInit(ResultCollection, ResultView);

        if (isCreate)
            return new backboneView({
                el: container
            });
        else
            return backboneView;
    }

    function backboneInit(ResultCollection, ResultView) {
        return Backbone.View.extend({
            initialize: function () {
                // Create instance of People Collection
                var resultCollection = new ResultCollection();
                // Create instances of the views
                var resultView = new ResultView({
                    collection: resultCollection
                });

                //Render after fetch data successfully
                resultCollection.fetch({
                    success: function () {
                        resultView.render();
                    }
                });
            },

            events: {
                'input .home-search-field__item': 'suggestiveData'
            },

            //handle input from user
            suggestiveData: function (e) {
                console.log("Hello");
                var value = $(e.currentTarget).val();

                //Show suggtive data box when input length more than 1 characters
                if (value.length >= 2) {
                    $('.suggestive-box').show();
                } else if (value.length < 1) {
                    $('.suggestive-box').hide();
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
                //<span>{{this.text}}</span>
                //<span class="suggestive-data-type">{{this.type}}</span>
