"use strict";

function durationSimplifier(duration){
  let i = duration.search(/[1-9]/g);
  let out = duration.slice(i).toLowerCase();
  if (out.includes("t")){
    return out.split("t").join("");
  }
  return out;
}

function moneyFormatter(value){
  let valueArr = value.split(".");
  if (valueArr[1].length < 2) valueArr[1]+= "0";
  return valueArr.join(".");
}

function getActualShippingPrice(shippingType, shippingPrice){
  //console.log(`shippingType:"${shippingType}" ,shippingPrice:"${shippingPrice}" `);
  return (shippingPrice) ? moneyFormatter(shippingPrice[0]["__value__"]) : "?";
}

function parseSearchResult(resultObject){
  let itemArray = resultObject.findItemsByKeywordsResponse[0].searchResult[0].item;
  let out = [];
  if (itemArray) {
  itemArray.forEach((item)=>{
    out.push({title:item.title[0] || "",
              img:(item.galleryURL) ? item.galleryURL[0] : "http://ir.ebaystatic.com/pictures/aw/pics/nextGenVit/imgNoImg.gif",
              url:item.viewItemURL[0] || "" ,
              price:moneyFormatter(item.sellingStatus[0].convertedCurrentPrice[0]["__value__"]) || "",
              shippingType:item.shippingInfo[0].shippingType[0] || "",
              shippingPrice:getActualShippingPrice(item.shippingInfo[0].shippingType[0], item.shippingInfo[0].shippingServiceCost),
              timeLeft: durationSimplifier(item.sellingStatus[0].timeLeft[0]) || ""
            });
  });
  }
  return out;
}

module.exports.parseSearchResult = parseSearchResult;
