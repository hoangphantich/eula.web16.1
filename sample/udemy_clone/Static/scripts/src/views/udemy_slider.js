define(['jquery', 'underscore', 'backbone', 'base/modules/animate'], function ($, _, backbone, animate) {

    'use strict';

    function init(container, isCreate) {
                 $(function () {
                    //$('.el-slider__img img').css("display", "block");
                    $('.el-slider__img img:gt(0)').hide();//hide all pic except first pic
                    setInterval(function () {
                        $('.el-slider__img :first-child').fadeOut(1500)
                        .next('img').fadeIn(1500).end().appendTo('.el-slider__img');//hien thi slide show, cai end cuoi append de chay lai tu dau
                    }
                    , 4000);//time chuyen anh 4s
                })
            
        
        
    }


    return {
        init: function (container, isCreate) {
            return init(container, isCreate);
        }
    };
});