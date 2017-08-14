
var pickedOrders = {};

$.ajax({
  type: 'GET',
  dataType: 'json',
  url: "/data/picked.json",
  error: function(data, textStatus, jqXHR) {
    console.log(textStatus);
  },
  success: function(data) {
    pickedOrders = data;
    loadPickedOrders();
  }
});

function loadPickedOrders(){
  console.log("loadPickedOrders");
  var pickedOrdersCount = 0;
  var html = "";

  for (var idOrder in pickedOrders){
    var order = pickedOrders[idOrder];


    html += "<li id='"+idOrder+"'>";
    html += "  <a href='javascript:selectPickedOrder(\""+idOrder+"\")' class='item-link item-content'>";
    html += "    <div class='item-media'>";
    html += "      <img src='/assets/img/box.png' width='64px'/>";
    html += "    </div>";
    html += "    <div class='item-inner'>";
    html += "      <div class='item-title-row'>";
    html += "        <div class='item-title'>"+idOrder+"</div>";
    html += "      </div>";
    html += "      <div class='item-subtitle'>"+order.picked+"</div>";
    html += "      <div class='item-subtitle'>"+order.shipping.name+"</div>";
    html += "      <div class='address-text'>";
    html += "        <small>"+order.shipping.address+"<br/>"+order.shipping.city+"<br/>"+order.shipping.state+" "+order.shipping.postcode+"</small>";
    html += "      </div>";
    html += "      <div class='item-subtitle'>"+order.linesCount+" Productos</div>";
    html += "    </div>";
    html += "  </a>";
    html += "</li>";
    pickedOrdersCount+=1;
  }
  if(pickedOrdersCount>0){
    $("#tabbar-picked-order-count").html("("+pickedOrdersCount+")");
    $("#picked-list").html(html);
    $("#page-picked .loading").addClass("hidden");
    $("#page-picked .content-empty").addClass("hidden");
    $("#page-picked .content").removeClass("hidden");
  }else{
    $("#tabbar-picked-order-count").html("");
    $("#page-picked .loading").addClass("hidden");
    $("#page-picked .content").addClass("hidden");
    $("#page-picked .content-empty").removeClass("hidden");
  }

  $(".picked-count").html("("+pickedOrdersCount+")");
  console.log("loadPickedOrders END");

}

var selectedPickedOrderIdOrder = "";
function selectPickedOrder(idOrder){
  console.log("selectPickedOrder: "+idOrder);
  selectedPickedOrderIdOrder = idOrder;
  pickedView.router.loadPage('/orders/PICKED/order/index.html');
}

var selectedPickedOrderLineImage = "";
var selectedPickedOrderLinesPicked = [];

function selectPickedOrderLineImage(imageSrc){
  selectedPickedOrderLineImage = imageSrc;
  pickedView.router.loadPage('/orders/picked/order/image/index.html');
}

function loadPickedOrderLineImage(){
  var html = "";
  html += "<img src='"+selectedPickedOrderLineImage+"' width='100%'/>";

  $("#page-picked-order-line-image .content").html(html);

  $("#page-picked-order-line-image .loading").addClass("hidden");
  $("#page-picked-order-line-image .content").removeClass("hidden");

}

function forcePickedOrderUpdate(){
  $("#page-picked .content").addClass('hidden');
  $("#page-picked .content-empty").addClass('hidden');
  $("#page-picked .loading").removeClass('hidden');
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: "/data/picked.json",
    error: function(data, textStatus, jqXHR) {
      console.log(textStatus);
    },
    success: function(data) {
      pickedOrders = data;
      loadPickedOrders();
    }
  });


}



function loadPickedOrder(){

  if(pickedOrders[selectedPickedOrderIdOrder] != undefined){
    var order = pickedOrders[selectedPickedOrderIdOrder];


    var pickinMinutesLeft = parseInt((moment(order.pickinLimit,'D/M/Y H:m') - moment()) / (1000 * 60));
    var pickinPercent = 100;
    var pickinColor = 'green';
    if(order.pickingMaxMinutes > 0){
      pickinPercent = 0;
      var pickinColor = 'red';
      if(pickinMinutesLeft > 0){
        pickinPercent = parseInt((pickinMinutesLeft / order.pickingMaxMinutes)*100);
      }
      if (pickinPercent > 33){
        var pickinColor = 'orange';
      }
      if (pickinPercent > 66){
        var pickinColor = 'green';
      }
    }
    var pickinPercentLeft = 100 - pickinPercent;

    if(pickinPercentLeft<0){
      pickinPercentLeft = 0;
    }else if(pickinPercentLeft > 100){
      pickinPercentLeft = 100;
    }


    var html = "";
    html += "<div class='content-block text-center'>";
    html += "  <img src='/assets/img/box-success.png' width='94px'>";
    html += "  <h1 class='m-b-0'>"+order.shipping.name+"</h1>";
    html += "  <p class='m-t-10'>";
    html += "   "+order.shipping.address+"<br/>"+order.shipping.city+"<br/>"+order.shipping.state+" "+order.shipping.postcode+"";
    html += "  </p>";
    html += "</div>";
    html += "<div class='content-block-title'>Fecha del servicio</div>";
    html += "<div class='content-block'>";
    html += " <p>"+order.picked+"</p>";
    html += "</div>";
    html += "<div class='content-block-title'>";
    html += "  Productos";
    html += "  <span class='pull-right'>"+order.linesCount+"</span>";
    html += "</div>";
    html += "<div class='list-block media-list order-list'>";
    html += "  <ul>";
    selectedPickedOrderLinesPicked = [];
    for (var i in order.lines){
      var line = order.lines[i];
      selectedPickedOrderLinesPicked[i] = false;

      html += "    <li>";
      html += "      <label class=' item-content'>";
      html += "        <div class='item-media'>";
      html += "          <a href='javascript:selectPickedOrderLineImage(\""+line.image+"\")'>";
      html += "            <img src='"+line.thumbnail+"' width='74px'/>";
      html += "          </a>";
      html += "        </div>";
      html += "        <div class='item-inner'>";
      html += "          <div class='item-title'>"+line.name+"</div>";
      html += "          <div class='item-subtitle'>"+line.reference+"</div>";
      html += "          <div class='item-title'>"+line.price+"</div>";
      html += "          <div class='item-subtitle'>"+line.details+"</div>";
      html += "        </div>";
      html += "      </label>";
      html += "    </li>";
    }
    html += "  </ul>";
    html += "</div>";
    html += "<div class='content-block'>";
    html += "  <a href='#' class='back button'>Volver</a>";
    html += "</div>";

    $("#page-picked-order .content").html(html);

    $("#page-picked-order .loading").addClass("hidden");
    $("#page-picked-order .content").removeClass("hidden");
  }else{
    $("#page-picked-order .content").html("");

    $("#page-picked-order .content").addClass("hidden");
    $("#page-picked-order .loading").removeClass("hidden");

  }

}

function cancelPickedOrderUpdate(){
  loadPickedOrders();
}
