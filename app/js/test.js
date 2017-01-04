function changeCity(id){
  var html = "";
  $.get("/api/data/district?city="+id, function(obj){
    var result = obj.result;
    for(i=0; i < result.length; i++){
      html += "<option value='"+result[i].dis_id+"'>"+result[i].dis_name+"</option>";
    }
    $("#district").html(html);
  });
}
$(function(){
  $.get('/api/checkout', function(obj){
  	console.log(obj)
    document.getElementById("total").innerHTML = "Rp "+ numeral(obj.result.total).format("0,000");
    document.getElementById("shippingCost").innerHTML = "Rp "+numeral(obj.result.shippingCost).format("0,000");
    document.getElementById("grandTotal").innerHTML = "Rp "+numeral(obj.result.grandTotal).format("0,000");
  });
  $("#city").on("change", function(){
    var id = $(this).val();
    changeCity(id);
  });
});
