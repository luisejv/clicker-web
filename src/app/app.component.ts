import { OnInit, Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import * as ScrollReveal from 'scrollreveal';
/* import objectFitImages = require('object-fit-images');
import objectFitImages from 'object-fit-images';
import * as $ from jQuery; */
declare var $: any;
declare const window: any;
declare const sr: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
/* @ViewChild('spinner') spinner! : ElementRef; */
  
  constructor(private renderer: Renderer2, private el: ElementRef) { };

  title = 'client';
  visible = true;
  ngOnInit(){
    /* "use strict";
    setTimeout(() => { this.visible = false; }, 2500); */
    var $preloader = $('#page-preloader'),
    $spinner = $preloader.find('.spinner-loader');
    $spinner.fadeOut();
    $preloader.delay(1000).fadeOut('slow');

    if ($('.scrollreveal').length) {
      window.sr = ScrollReveal({
          reset:true,
          duration: 1000,
          delay: 200
      });
      sr.reveal('.scrollreveal');
    }

    /* if ($('.img-scale').length) {
      $(() => { objectFitImages('.img-scale') });
    } */

    if ($('body').length) {
      $(window).on('scroll', () => {
          var winH = $(window).scrollTop();
          $('.b-progress-list').waypoint(() => {
              $('.js-chart').each(() => {
                  this.CharsStart();
              });
          }, {
              offset: '80%'
          });
      });
    }

    $('.js-scroll-next').on("click", () => {
      var hiddenContent =  $( ".js-scroll-next + .js-scroll-content") ;
      $(".js-scroll-next").hide() ;
      hiddenContent.show() ;
      hiddenContent.addClass("animated");
      hiddenContent.addClass("animation-done");
      hiddenContent.addClass("bounceInUp");
    });

    if ($('.js-zoom-gallery').length) {
      $('.js-zoom-gallery').each(() => { // the containers for all your galleries
        $(this).magnificPopup({
          delegate: '.js-zoom-gallery__item', // the selector for gallery item
          type: 'image',
          gallery: {
            enabled:true
          },
          mainClass: 'mfp-with-zoom', // this class is for CSS animation below

          zoom: {
            enabled: true, // By default it's false, so don't forget to enable it
            duration: 300, // duration of the effect, in milliseconds
            easing: 'ease-in-out', // CSS transition easing function
            // The "opener" function should return the element from which popup will be zoomed in
            // and to which popup will be scaled down
            // By defailt it looks for an image tag:
            opener: (openerElement: any) => {
              // openerElement is the element on which popup was initialized, in this case its <a> tag
              // you don't need to add "opener" option if this code matches your needs, it's defailt one.
              return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
          }
        });
      });
    }

    if ($('.js-zoom-images').length) {
      $('.js-zoom-images').magnificPopup({
        type: 'image',
        mainClass: 'mfp-with-zoom', // this class is for CSS animation below
        zoom: {
          enabled: true, // By default it's false, so don't forget to enable it
          duration: 300, // duration of the effect, in milliseconds
          easing: 'ease-in-out', // CSS transition easing function
          // The "opener" function should return the element from which popup will be zoomed in
          // and to which popup will be scaled down
          // By defailt it looks for an image tag:
          opener: (openerElement: any) => {
            // openerElement is the element on which popup was initialized, in this case its <a> tag
            // you don't need to add "opener" option if this code matches your needs, it's defailt one.
            return openerElement.is('img') ? openerElement : openerElement.find('img');
          }
        }
      });
    }

    if ($('.popup-youtube').length) {
      $('.popup-youtube').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
      });
    }

    if ($('.selectpicker').length) {
      $('.selectpicker').selectpicker();
    }

    if ($('#main-slider').length) {

      var sliderWidth = $("#main-slider").data("slider-width");
      var sliderHeigth = $("#main-slider").data("slider-height");
      var sliderArrows = $("#main-slider").data("slider-arrows");
      var sliderButtons = $("#main-slider").data("slider-buttons");

      $( '#main-slider' ).sliderPro({
          width:  sliderWidth,
          height: sliderHeigth,
          arrows: sliderArrows,
          buttons: sliderButtons,
          fade: true,
          fullScreen: true,
          touchSwipe: false,
          autoplay: true
      });
    }

    if ($('.js-slider').length) {
      $('.js-slider').slick();
    }

    if ($('.js-slider-for').length) {
      $('.js-slider-for').slick({
        arrows: false,
        fade: true,
        asNavFor: '.js-slider-nav'
      });
      $('.js-slider-nav').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.js-slider-for',
        focusOnSelect: true
      });
    }

    /* if ($('#filterPrice').length) {

      var keypressSlider = document.getElementById('filterPrice');
      var input0 = document.getElementById('input-with-keypress-0');
      var input1 = document.getElementById('input-with-keypress-1');
      var inputs = [input0, input1];

      noUiSlider.create(keypressSlider, {
          start: [5000, 35000],
          connect: true,
          step: 100,
          format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
          }),
          range: {
              'min': 1000,
              'max': 50000
          }
      });

      keypressSlider.noUiSlider.on('update', function (values: any, handle: number) {
          inputs[handle].value = values[handle];
      });
    }

    if ($('#sliderRange').length) {
      var keypressSliderRange = document.getElementById('sliderRange');
      var inputRange = document.getElementById('input-range');
      var inputsRange = [inputRange];

      noUiSlider.create(keypressSliderRange, {
            start: 100,
            connect: true,
            step: 10,
            format: wNumb({
              decimals: 0,
              prefix: 'within ',
              suffix: 'km',
              thousand: ','
            }),
            range: {
                'min': 0,
                'max': 200
            }
      });


      keypressSliderRange.noUiSlider.on('update', function (values, handle) {
          inputsRange[handle].value = values[handle];
      });
    } */

    if ($('.player').length) {
      $(".player").flowplayer();
    }

    $('.btns-switch__item').on( 'click', () => {
      $('.btns-switch').find('.active').removeClass('active');
      $( this ).addClass('active');
    });

    $('.js-view-th').on( 'click', () => {
      $('.b-goods-group > .col-12').removeClass('col-12').addClass('col-lg-4 col-md-6');
      $('.b-goods').removeClass('b-goods_list');
      $('.b-filter-goods').addClass('b-filter-goods_brd');
    });

    $('.js-view-list').on( 'click', () => {
      $('.b-goods-group > .col-lg-4').addClass('col-12').removeClass('col-lg-4 col-md-6');
      $('.b-goods').addClass('b-goods_list');
      $('.b-filter-goods').removeClass('b-filter-goods_brd');
    });


    $('.flip-btn').on( 'click', () => {
      $( this ).parent().toggleClass('flip-active');
    });


    $('.flip-btn-hide').on( 'click', () => {
      $(this).parents('.b-goods').removeClass('flip-active');
    });


    if ($(window).width() < 768) {
      $('.b-goods-group > .col-12').removeClass('col-12').addClass('col-lg-4 col-md-6');
      $('.b-goods').removeClass('b-goods_list');
    }
  }

  CharsStart() {
    $('.js-chart').easyPieChart({
        barColor: false,
        trackColor: false,
        scaleColor: false,
        scaleLength: false,
        lineCap: false,
        lineWidth: false,
        size: false,
        animate: 5000,
        onStep: (from: any, to: any, percent: any) => {
          let elements = this.el.nativeElement.querySelectorAll('.js-percent');
          elements.text(Math.round(percent));
        }
    });
  }
}