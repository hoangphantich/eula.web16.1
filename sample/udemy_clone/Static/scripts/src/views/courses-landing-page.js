define(["jquery", "underscore", "backbone"], function ($, _, backbone) {
    "use strict";
    function init(container, isCreate) {
        var backboneView = backboneInit();
        if (isCreate)
            return new backboneView({
                el: container
            });
        else
            return [backboneView, HandlerBars];
    }
    function backboneInit() {
        var widthslider = $(".content-right-inner").width() + 15;
        var numberCourse = ($(".content-right-inner").width() + 15) / 231; //number course to display in-line
        var mql = window.matchMedia("max-width: 767px");
        
        return Backbone.View.extend({
            events: {
                'click .btn-previous': "previouse_slider",
                'click .btn-next': "next_slider",
                'click .view-all': "view_all_course",
                'click .collapse-btn': "view_slide_course"
            },
            previouse_slider: function (e) {
                var totalItems = this.$el.find(".flex-container li").length;
                var currentMarginLeft = parseInt(this.$el.find(".flex-container").css("marginLeft"));
                var doPrevious = currentMarginLeft + widthslider;
                if (currentMarginLeft < 0) {
                    this.$el.find(".flex-container").css("margin-left", doPrevious);
                }
                $.noConflict();

            },
            next_slider: function (e) {                
                var totalItems = this.$el.find(".flex-container li").length; //caculate again 
                var currentMarginLeft = parseInt(this.$el.find(".flex-container").css("marginLeft")); //caculate again 
                var doNext = currentMarginLeft - widthslider;
                var maxMarginLeft = 0;
                var ModuloColumn = totalItems % numberCourse;
                var numberNextSlide = parseInt(totalItems / numberCourse);
                if (ModuloColumn == 0) maxMarginLeft = (numberNextSlide - 1) * widthslider;
                if (ModuloColumn != 0) maxMarginLeft = numberNextSlide * widthslider;
                if (currentMarginLeft > -maxMarginLeft) {
                    this.$el.find(".flex-container").css("margin-left", doNext);                   
                }
                $.noConflict();
            },
            view_all_course: function (e) {
                var widthslider = $(".content-right-inner").width() + 20;  //caculate again 
                var numberCourse = ($(".content-right-inner").width() + 15) / 231; //caculate again 
                var totalItems = this.$el.find(".flex-container li").length; //caculate again  
                this.$el.find(".head-slider-right").css("width", "0");
                this.$el.find(".head-slider-right").css("display", "none");
                this.$el.find(".collapse-btn").css("display", "block");
                this.$el.find(".collapse-btn").css("width", "80px");
                this.$el.find(".flex-container").css("display","block");
                this.$el.find(".flex-container").css("width", widthslider);
                this.$el.find(".flex-container").css("height", "auto");
                var ModuloRow = totalItems % numberCourse;
                var numberRow = parseInt(totalItems / numberCourse);
                var height_Course_Slider = 0;
                if (ModuloRow == 0) height_Course_Slider = numberRow * 293;
                if (ModuloRow != 0) height_Course_Slider = (numberRow + 1) * 293;
                this.$el.find(".course-slider").css("min-height", height_Course_Slider +"px");
                this.$el.find(".course-slider").css("height", "auto");
                this.$el.find(".flex-container").css("margin-left", "0");
                var landing_height = $(".landing-container").height();

                $(".tab-content-left").css("height", landing_height + "px");

            },
            view_slide_course: function (e) {
                var totalItems = this.$el.find(".flex-container li").length;
                var numberCourse = ($(".content-right-inner").width() + 15) / 231; //caculate again 
                var ModuloRow = totalItems % numberCourse;
                var numberRow = parseInt(totalItems / numberCourse);
                var current_height_left = $(".tab-content-left").height();
                if (numberCourse == 5 || numberCourse >= 7) {
                    $(".tab-content-left").css("height", current_height_left - 272 * numberRow + "px");
                }
                if (numberCourse != 5 && numberCourse < 7) {
                    $(".tab-content-left").css("height", current_height_left - 272 * (numberRow - 1) + "px");
                }
                this.$el.find(".head-slider-right").css("width", "160px");
                this.$el.find(".head-slider-right").css("display", "block");
                this.$el.find(".collapse-btn").css("display", "none");
                this.$el.find(".collapse-btn").css("width", "0");
                this.$el.find(".flex-container").css("width", "5000px");
                this.$el.find(".flex-container").css("display", "inline-block");
                this.$el.find(".flex-container").css("min-height", "293px");
                this.$el.find(".course-slider").css("height", "auto");
                this.$el.find(".course-slider").css("min-height", "315px");
            }
        });
    }
    return {
        init: function (container, isCreate) {
            return init(container, isCreate);
        }
    };
})