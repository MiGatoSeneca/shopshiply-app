
var newOrders = {};

$.ajax({
  type: 'GET',
  dataType: 'json',
  url: "/data/new.json",
  error: function(data, textStatus, jqXHR) {
    console.log(textStatus);
  },
  success: function(data) {
    newOrders = data;
    loadNewOrders();
  }
});

function loadNewOrders(){
  console.log("loadNewOrders");
  var newOrdersCount = 0;
  var html = "";

  for (var idOrder in newOrders){
    var order = newOrders[idOrder];

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

    html += "<li id='"+idOrder+"'>";
    if(pickinMinutesLeft>0){
      html += "  <a href='javascript:selectNewOrder(\""+idOrder+"\")' class='item-link item-content'>";
    }else{
      html += "  <a href='#' class='item-link item-content item-block'>";

    }
    html += "    <div class='item-media'>";
    html += "      <img src='/assets/img/box.png' width='64px'/>";
    html += "    </div>";
    html += "    <div class='item-inner'>";
    html += "      <div class='item-title-row'>";
    html += "        <div class='item-title'>"+idOrder+"</div>";
    html += "      </div>";
    html += "      <span class='progressbar color-"+pickinColor+"'><span style='transform: translate3d(-"+pickinPercentLeft+"%, 0px, 0px);'></span></span>";
    html += "      <div class='progresstext text-"+pickinColor+"'>"+moment(order.pickinLimit,'D/M/Y H:m').fromNow()+"</div>";
    html += "      <div class='item-subtitle'>"+order.shipping.name+"</div>";
    html += "      <div class='address-text'>";
    html += "        <small>"+order.shipping.address+"<br/>"+order.shipping.city+"<br/>"+order.shipping.state+" "+order.shipping.postcode+"</small>";
    html += "      </div>";
    html += "      <div class='item-subtitle'>"+order.linesCount+" Productos</div>";
    html += "    </div>";
    html += "  </a>";
    html += "</li>";
    newOrdersCount+=1;
  }
  if(newOrdersCount>0){
    $("#tabbar-new-order-count").html("("+newOrdersCount+")");
    $("#new-list").html(html);
    $("#page-new .loading").addClass("hidden");
    $("#page-new .content-empty").addClass("hidden");
    $("#page-new .content").removeClass("hidden");
  }else{
    $("#tabbar-new-order-count").html("");
    $("#page-new .loading").addClass("hidden");
    $("#page-new .content").addClass("hidden");
    $("#page-new .content-empty").removeClass("hidden");
  }

  $(".new-count").html("("+newOrdersCount+")");
  console.log("loadNewOrders END");

}

var selectedNewOrderIdOrder = "";
function selectNewOrder(idOrder){
  selectedNewOrderIdOrder = idOrder;
  mainView.router.loadPage('/orders/new/order/index.html');
}

var selectedNewOrderLineImage = "";
var selectedNewOrderLinesPicked = [];

function selectNewOrderLineImage(imageSrc){
  selectedNewOrderLineImage = imageSrc;
  mainView.router.loadPage('/orders/new/order/image/index.html');
}

function loadNewOrderLineImage(){
  var html = "";
  html += "<img src='"+selectedNewOrderLineImage+"' width='100%'/>";

  $("#page-new-order-line-image .content").html(html);

  $("#page-new-order-line-image .loading").addClass("hidden");
  $("#page-new-order-line-image .content").removeClass("hidden");

}

function forceNewOrderUpdate(){
  $("#page-new .content").addClass('hidden');
  $("#page-new .content-empty").addClass('hidden');
  $("#page-new .loading").removeClass('hidden');
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: "/data/new.json",
    error: function(data, textStatus, jqXHR) {
      console.log(textStatus);
    },
    success: function(data) {
      newOrders = data;
      loadNewOrders();

    }
  });


}
function cancelNewOrderUpdate(){
  loadNewOrders();
}



function loadNewOrder(){

  if(newOrders[selectedNewOrderIdOrder] != undefined){
    var order = newOrders[selectedNewOrderIdOrder];


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
    html += "  <img src='/assets/img/box.png' width='94px'>";
    html += "  <h1 class='m-b-0'>"+order.shipping.name+"</h1>";
    html += "  <p class='m-t-10'>";
    html += "   "+order.shipping.address+"<br/>"+order.shipping.city+"<br/>"+order.shipping.state+" "+order.shipping.postcode+"";
    html += "  </p>";
    html += "</div>";
    html += "<div class='content-block-title'>Límite de servicio</div>";
    html += "<div class='content-block'>";
    html += " <span class='progressbar color-"+pickinColor+"'><span style='transform: translate3d(-"+pickinPercentLeft+"%, 0px, 0px);'></span></span>";
    html += " <div class='progresstext text-"+pickinColor+"'>"+moment(order.pickinLimit,'D/M/Y H:m').fromNow()+"</div>";
    html += "</div>";
    html += "<div class='content-block-title'>";
    html += "  Productos";
    html += "  <span class='pull-right'>"+order.linesCount+"</span>";
    html += "</div>";
    html += "<div class='list-block media-list order-list'>";
    html += "  <ul>";
    selectedNewOrderLinesPicked = [];
    for (var i in order.lines){
      var line = order.lines[i];
      selectedNewOrderLinesPicked[i] = false;

      html += "    <li>";
      html += "      <label class=' item-content'>";
      html += "        <div class='item-media'>";
      html += "          <a href='javascript:selectNewOrderLineImage(\""+line.image+"\")'>";
      html += "            <img src='"+line.thumbnail+"' width='74px'/>";
      html += "          </a>";
      html += "        </div>";
      html += "        <div class='item-inner'>";
      html += "          <div class='item-title'>"+line.name+"</div>";
      html += "          <div class='item-subtitle'>"+line.reference+"</div>";
      html += "          <div class='item-title'>"+line.price+"</div>";
      html += "          <div class='item-subtitle'>"+line.details+"</div>";
      html += "        </div>";
      html += "        <div class='item-media m-r-10'>";
      html += "         <a class='' id='button-pick-"+i+"' href='javascript:pickNewOrderLine(\""+i+"\")'><img src='assets/img/icon-to-pick.png' width='54px'/></a>";
      html += "         <a class='hidden' id='button-return-"+i+"' href='javascript:returnNewOrderLine(\""+i+"\")'><img src='assets/img/icon-picked.png' width='54px'/></a>";
      html += "        </div>";
      html += "      </label>";
      html += "    </li>";
    }
    html += "  </ul>";
    html += "</div>";
    html += "<div class='block-step'>";
    html += " <div class='content-block text-center small'>ES NECESARIO QUE MARQUES TODOS LOS PRODUCTOS<br/>ANTES DE PULSAR CONTINUAR</div>";
    html += " <div class='content-block'>";
    html += "   <a href='#' class='button button-inactive'>Siguiente</a>";
    html += " </div>";
    html += "</div>";
    html += "<div class='next-step hidden'>";
    html += " <div class='content-block text-center small'>PULSA EL BOTÓN CONFIRMAR PARA ENVIAR<br/>LA CONFIRMACIÓN DEL PEDIDO</div>";
    html += " <div class='content-block'>";
    html += "   <a href='javascript:newOrderPick()' class='button'>Siguiente</a>";
    html += " </div>";
    html += "</div>";

    $("#page-new-order .content").html(html);

    $("#page-new-order .loading").addClass("hidden");
    $("#page-new-order .content").removeClass("hidden");
  }else{
    $("#page-new-order .content").html("");

    $("#page-new-order .content").addClass("hidden");
    $("#page-new-order .loading").removeClass("hidden");

  }

}


function pickNewOrderLine(index){
  $("#button-pick-"+index).addClass("hidden");
  $("#button-return-"+index).removeClass("hidden");
  selectedNewOrderLinesPicked[index] = true;
  checkLinesPicked();
}

function returnNewOrderLine(index){
  $("#button-pick-"+index).removeClass("hidden");
  $("#button-return-"+index).addClass("hidden");
  selectedNewOrderLinesPicked[index] = false;
  checkLinesPicked();
}

function checkLinesPicked(){
  var allLinesPicked = true;
  for (var i in selectedNewOrderLinesPicked){
    if(!selectedNewOrderLinesPicked[i]){
      allLinesPicked = false;
    }
  }
  if(allLinesPicked){
    $("#page-new-order .content .next-step").removeClass('hidden');
    $("#page-new-order .content .block-step").addClass('hidden');
  }else{
    $("#page-new-order .content .next-step").addClass('hidden');
    $("#page-new-order .content .block-step").removeClass('hidden');
  }
}


function newOrderPick(){
  mainView.router.loadPage('/orders/new/order/pick/index.html');
}


function proccessNewOrder(){
  var order = newOrders[selectedNewOrderIdOrder];
  delete newOrders[selectedNewOrderIdOrder];
  pickedOrders[selectedNewOrderIdOrder] = order;
  pickedOrders[selectedNewOrderIdOrder].picked = moment().format('D/M/Y H:m');
  console.log(pickedOrders[selectedNewOrderIdOrder].picked);
  loadNewOrders();
  loadPickedOrders();
  $("#page-new-order-picking .loading").addClass('hidden');
  $("#page-new-order-picking .success").removeClass('hidden');

}
