// Initialize app
var myApp = new Framework7();

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});

var pickedView = myApp.addView('.view-picked', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});
myApp.addView('.view-account', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});


function login(){
  myApp.closeModal(".login-screen");
}

myApp.onPageBeforeInit("new-order", function(){
  $("#page-new-order .loading").removeClass('hidden');
  $("#page-new-order .content").addClass('hidden');
});
myApp.onPageInit("new-order", function(){
  loadNewOrder();
});
myApp.onPageBeforeInit("new-order-line-image", function(){
  $("#page-new-order-line-image .loading").removeClass('hidden');
  $("#page-new-order-line-image .content").addClass('hidden');
});
myApp.onPageInit("new-order-line-image", function(){
  loadNewOrderLineImage();
});

myApp.onPageBeforeInit("picked-order", function(){
  $("#page-picked-order .loading").removeClass('hidden');
  $("#page-picked-order .content").addClass('hidden');
});
myApp.onPageInit("picked-order", function(){
  loadPickedOrder();
});
myApp.onPageBeforeInit("picked-order-line-image", function(){
  $("#page-picked-order-line-image .loading").removeClass('hidden');
  $("#page-picked-order-line-image .content").addClass('hidden');
});
myApp.onPageInit("picked-order-line-image", function(){
  loadPickedOrderLineImage();
});

myApp.onPageInit("new-order-picking", function(){
  proccessNewOrder();
});


myApp.onPageInit("new", function(){
  loadNewOrders();
});
myApp.onPageInit("picked", function(){
  loadPickedOrders();
});


moment.locale('es');


$(document).ready(function(){
  $('#login-screen .loading').addClass('hidden');
  $('#login-screen .content').removeClass('hidden');
});
