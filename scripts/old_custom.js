	function runSearch(wherego){
		var searchItemText = document.getElementById("searchItemText");
		var searchString = trim(searchItemText.value);
		if (searchString === "") {
			var searchField = document.getElementById("searchField");
			searchField.parentNode.removeChild(searchField);
		} else {
			document.getElementById("searchField").value = searchString;
		}
		if (getZipcode() === "") {
			var zipField = document.getElementById("zipField");
			zipField.parentNode.removeChild(zipField);
		} else {
			document.getElementById("zipField").value = getZipcode();
		}
		var itemSearch = document.getElementById("itemSearch");
		itemSearch.parentNode.removeChild(itemSearch);
		var searchType = document.getElementById("searchType");
		searchType.parentNode.removeChild(searchType);
		goToPage(wherego);
	}
	
	function goToPage(wherego) {
		document.getElementById("searchForm").action = wherego;
		document.getElementById("searchForm").submit();
	}
	
	function processResults(res){
	}
	
	function trim(s){
		return s.replace(/^\s*(.*?)\s*$/,"$1");
	}
	
	function makeSearchString(s){
		while (s.match(/\s/)) {
			s = s.replace(/(\s+)/,"\+");
		}
		return s;
	}
	
	function formatTimeLeft(timeLeftObject){
		var ret = "";
		var seen = false;
		var seconds = true;
		if (timeLeftObject.yr > 0) {
			ret += String(timeLeftObject.yr) + "Y";
			seen = true;
			seconds = false;
		}
		if (seen) {
			seen = false;
			ret += " ";
		}
		if (timeLeftObject.mo > 0) {
			ret += String(timeLeftObject.mo) + "M";
			seen = true;
			seconds = false;
		}
		if (seen) {
			seen = false;
			ret += " ";
		}
		if (timeLeftObject.dy > 0) {
			ret += String(timeLeftObject.dy) + "d";
			seen = true;
			seconds = false;
		}
		if (seen) {
			seen = false;
			ret += " ";
		}
		if (timeLeftObject.hr > 0) {
			ret += String(timeLeftObject.hr) + "h";
			seen = true;
			seconds = false;
		}
		if (seen) {
			seen = false;
			ret += " ";
		}
		if (timeLeftObject.mn > 0) {
			ret += String(timeLeftObject.mn) + "m";
			seen = true;
			if (timeLeftObject.mn > 10) {
				seconds = false;
			}
		}
		if (seconds) {
			if (seen) {
				seen = false;
				ret += " ";
			}
			if (timeLeftObject.sc > 0) {
				ret += String(timeLeftObject.sc) + "s";
			}
		}
		return ret;
	}
	
	function formatTimeLeftRow(timeLeftObject,i){
		if (timeLeftObject.yr > 0 || timeLeftObject.mo > 0 || timeLeftObject.dy > 0 || timeLeftObject.hr > 0 || timeLeftObject.mn > 10) {
			return;
		} else {
			resultTable.setCellStyle(i,5,{"color":"red"});
		}
	}
	
	function getTimeLeft(s){
		s = s.replace(/P(.*?)/,"$1");
		var timeleft = {yr:0,mo:0,dy:0,hr:0,mn:0,sc:0};
		if (s.match(/\d+Y(.*)T/)) {
			timeleft.yr = Number(s.replace(/(\d\d?)Y(?:.*)/,"$1"));
			s = s.replace(/(?:\d\d?)Y(.*)/,"$1");
		}
		if (s.match(/\d+M(.*)T/)) {
			timeleft.mo = Number(s.replace(/(\d\d?)M(?:.*)/,"$1"));
			s = s.replace(/(?:\d\d?)M(.*)/,"$1");
		}
		if (s.match(/\d+D(.*)T/)) {
			timeleft.dy = Number(s.replace(/(\d\d?)D(?:.*)/,"$1"));
			s = s.replace(/(?:\d\d?)D(.*)/,"$1");
		}
		s = s.replace(/T(.*?)/,"$1");
		if (s.match(/\d+H/)) {
			timeleft.hr = Number(s.replace(/(\d\d?)H(?:.*)/,"$1"));
			s = s.replace(/(?:\d\d?)H(.*)/,"$1");
		}
		if (s.match(/\d+M/)) {
			timeleft.mn = Number(s.replace(/(\d\d?)M(?:.*)/,"$1"));
			s = s.replace(/(?:\d\d?)M(.*)/,"$1");
		}		
		if (s.match(/\d+S/)) {
			timeleft.sc = Number(s.replace(/(\d\d?)S/,"$1"));
		}
		return timeleft;
	}
	
	function formatMoney(m) {
		return Number(m).toFixed(2);
	}
	
	function runOnLoad(){
		resultTable = null;
		findItemsAdvanced(document.getElementById("searchItemText").value);
		document.getElementById("searchItemText").focus();
	}
	
	function runOnLoadHalf(){
		resultTable = null;
		if (document.getElementById("itemSearch").value !== "") {
			getHalfProduct(document.getElementById("itemSearch").value,document.getElementById("searchType").value);
		} else {
			findHalfProducts(document.getElementById("searchItemText").value);
		}
		document.getElementById("searchItemText").focus();
	}
	
	function _cb_FindItems(root) {
		resultTable = createMatrixTable("resultDiv");
		resultTable.setColumnSize(6);
		resultTable.setColumnHeaders(["","Description","Bids","Price","Shipping", "Time Left"]);
		resultTable.showColumnHeaders(true);
		var items = root.Item || [];
		resultTable.setRowSize(items.length);
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (item.BidCount) {
				var bids = item.BidCount;
			} else {
				var bids = 0;
			}
			var title = item.Title;
			var viewitem = item.ViewItemURLForNaturalSearch;
			
			if (item.GalleryURL) {
				var galleryitem = item.GalleryURL;
			} else {
				var galleryitem = "images/ng.gif";
			}
			
			var currentPriceItem = "$" + String(formatMoney(item.ConvertedCurrentPrice.Value));
			
			if (item.ShippingCostSummary.ShippingServiceCost) {
				var shippingPriceItem = "$" + String(formatMoney(item.ShippingCostSummary.ShippingServiceCost.Value));
			} else {
				var shippingPriceItem = '-';
			}
			var timeLeftObject = getTimeLeft(item.TimeLeft);
			var timeLeft = formatTimeLeft(timeLeftObject);
			
			resultTable.setRowContent(i, ['<a href="' + viewitem + '"><img src="' + galleryitem + '"/></a>','<a href="' + viewitem + '">' + title + '</a>',bids,currentPriceItem,shippingPriceItem,timeLeft]);
			formatTimeLeftRow(timeLeftObject,i);
			if (bids > 0) {
				resultTable.showRow(i,false);
			}
		}
		resultTable.showColumn(2,false);
	}

	function _cb_FindItemsAdvanced(root) {
		resultTable = createMatrixTable("resultDiv");
		resultTable.setColumnSize(6);
		resultTable.setColumnHeaders(["","Description","Bids","Price","Shipping", "Time Left"]);
		resultTable.showColumnHeaders(true);
		var pageNumber = root.PageNumber;
		var totalPages = root.TotalPages;
		var searchResult = root.SearchResult || [];
		if (searchResult.length > 0) {
			var itemArray = searchResult[0].ItemArray || [];
			var items = itemArray.Item || [];
		} else {
			var items = [];
		}
		resultTable.setRowSize(items.length);
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (item.BidCount) {
				var bids = item.BidCount;
			} else {
				var bids = 0;
			}
			var title = item.Title;
			var viewitem = item.ViewItemURLForNaturalSearch;
			
			if (item.GalleryURL) {
				var galleryitem = item.GalleryURL;
			} else {
				var galleryitem = "images/ng.gif";
			}
			
			var currentPriceItem = "$" + String(formatMoney(item.ConvertedCurrentPrice.Value));
			
			if (item.ShippingCostSummary.ShippingServiceCost) {
				var shippingPriceItem = "$" + String(formatMoney(item.ShippingCostSummary.ShippingServiceCost.Value));
			} else {
				var shippingPriceItem = '-';
			}
			var timeLeftObject = getTimeLeft(item.TimeLeft);
			var timeLeft = formatTimeLeft(timeLeftObject);
			
			resultTable.setRowContent(i, ['<a href="' + viewitem + '"><img src="' + galleryitem + '"/></a>','<a href="' + viewitem + '">' + title + '</a>',bids,currentPriceItem,shippingPriceItem,timeLeft]);
			formatTimeLeftRow(timeLeftObject,i);
		}
		resultTable.showColumn(2,false);
		document.getElementById("currentPageSpan").innerHTML = pageNumber;
		document.getElementById("totalPageSpan").innerHTML = totalPages;
		if (totalPages < 2) {
			var morePageRow = document.getElementById("getMorePages");
			morePageRow.parentNode.removeChild(morePageRow);
			if (totalPages === 0) {
				document.getElementById("currentPageSpan").innerHTML = 0;
			}
		} else {
			var jumpToPageDiv = document.getElementById("jumpToPageDiv");
			// remove all old results
			var prntNode = jumpToPageDiv.parentNode;
			prntNode.removeChild(jumpToPageDiv);
			jumpToPageDiv = document.createElement('div');
			jumpToPageDiv.id = "jumpToPageDiv";
			prntNode.appendChild(jumpToPageDiv);
			// add previous
			if (pageNumber > 1) {
				var strlnk = document.createElement('a');
				strlnk.href = "javascript:gotoResultPage(" + (pageNumber - 1) + ")";
				var strimg = document.createElement('img');
				strimg.setAttribute("class","jumptopage");
				strimg.src = "images/la.gif";
				strlnk.appendChild(strimg);
				jumpToPageDiv.appendChild(strlnk);
			}
			// add numbers
			var startNumber = pageNumber - 4;
			if (startNumber < 1) {
				startNumber = 1;
			}
			var endNumber = pageNumber + 4;
			if (endNumber >= totalPages) {
				endNumber = totalPages + 1;
				startNumber = endNumber - 8;
				if (startNumber < 1) {
					startNumber = 1;
				}
			}
			if ((endNumber - startNumber) < 8 && (endNumber-startNumber) < totalPages) {
				if (totalPages > 8) {
					endNumber = endNumber + (9 - (endNumber-startNumber));
				} else {
					endNumber = endNumber + (totalPages - (endNumber-startNumber));
				}
			}
			for (var i = startNumber; i < endNumber; i++){
				if (i !== pageNumber) {
					if (i !== startNumber) {
						var spn = document.createElement('span');
						spn.innerHTML = " | ";
						jumpToPageDiv.appendChild(spn);
					}
					var lnk = document.createElement('a');
					lnk.href = "javascript:gotoResultPage(" + i + ")";
					lnk.innerHTML = i;
				} else {
					var lnk = document.createElement('span');
					if (i === startNumber) {
						lnk.innerHTML = i;
					} else {
						lnk.innerHTML = " | " + i;
					}
				}
				jumpToPageDiv.appendChild(lnk);
			}
			// add next
			if (pageNumber < totalPages) {
				var endlnk = document.createElement('a');
				endlnk.href = "javascript:gotoResultPage(" + (pageNumber + 1) + ")";
				var endimg = document.createElement('img');
				endimg.setAttribute("class","jumptopage");
				endimg.src = "images/ra.gif";
				endlnk.appendChild(endimg);
				jumpToPageDiv.appendChild(endlnk);
				// ...
			}
		}
		document.getElementById("result_bar").style.visibility = "visible";
		document.getElementById("loading_image_bar").style.visibility = "hidden";
		document.getElementById("loading_image_bar").style.height = "0px";
		refreshAd();
	}
	
	function refreshAd() {
	   var d=document.getElementById('sidebar');
	   if(d){
	       var s=d.getElementsByTagName('iframe');
	       if(s && s.length){
	            s[0].src=s[0].src+'&'+new Date().getTime();
	       }
	   }
	   return true;
	}
	
	function gotoResultPage(pageNumber){
		resultTable.destroy();
		findItemsAdvanced(document.getElementById("searchItemText").value,pageNumber);
	}
	
	function gotoResultPageHalf(pageNumber){
		resultTable.destroy();
		findHalfProducts(document.getElementById("searchItemText").value,pageNumber);
	}
	
	function jumpToPage(){
		var page = document.getElementById("jumpToPageText");
		var code = page.value;
		if (code.match(/\D/)) {
			page.value = "";
			return;
		}
		var cd = Number(code);
		if (cd < 1) {
			page.value = "";
			return;
		}
		var totalpg = Number(document.getElementById("totalPageSpan").innerHTML);
		if (cd > totalpg) {
			page.value = "";
			return;
		}
		gotoResultPage(code);
	}
	
	function getZipcode(){
		var zip = document.getElementById("zipcodeText");
		var code = zip.value;
		if (code.length !== 5) {
			zip.value = "";
			return "";
		}
		if (code.match(/\D/)) {
			zip.value = "";
			return "";
		}
		return code;
	}
	
	function findItems(itemSearch) {
		//with postal code
		//var source = "http://open.api.ebay.com/shopping?appid=CodeCoal-4e45-426e-9e6e-7a8cab1f6e16&version=517&siteid=0&MaxEntries=50&PostalCode=91411&SortOrder=Ascending&callname=FindItems&QueryKeywords=" + itemSearch + "&responseencoding=JSON&callback=true&trackingid=2687640&trackingpartnercode=1&affiliateuserid=2205191";
		var itemSearchFormatted = makeSearchString(itemSearch);
		var zipcode = getZipcode();
		if (zipcode !== "") {
			var source = "http://open.api.ebay.com/shopping?appid=CodeCoal-4e45-426e-9e6e-7a8cab1f6e16&version=517&siteid=0&MaxEntries=50&PostalCode=" + zipcode + "&SortOrder=Ascending&callname=FindItems&QueryKeywords=" + itemSearchFormatted + "&responseencoding=JSON&callback=true&trackingid=2687640&trackingpartnercode=1&affiliateuserid=2205191";
		} else {
			var source = "http://open.api.ebay.com/shopping?appid=CodeCoal-4e45-426e-9e6e-7a8cab1f6e16&version=517&siteid=0&MaxEntries=50&SortOrder=Ascending&callname=FindItems&QueryKeywords=" + itemSearchFormatted + "&responseencoding=JSON&callback=true&trackingid=2687640&trackingpartnercode=1&affiliateuserid=2205191";
		}
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.id = 'ebaySearch';
		script.src = source;
		document.getElementsByTagName('head')[0].appendChild(script);  
	}
	
	function findItemsAdvanced(itemSearch,pageNumber) {
		//with postal code
		//var source = "http://open.api.ebay.com/shopping?appid=CodeCoal-4e45-426e-9e6e-7a8cab1f6e16&version=517&siteid=0&MaxEntries=50&PostalCode=91411&SortOrder=Ascending&callname=FindItems&QueryKeywords=" + itemSearch + "&responseencoding=JSON&callback=true&trackingid=2687640&trackingpartnercode=1&affiliateuserid=2205191";
		var itemSearchFormatted = makeSearchString(itemSearch);
		var zipcode = getZipcode();
		if (zipcode !== "") {
			if (pageNumber) {
				var source = "http://open.api.ebay.com/shopping?appid=CodeCoal-4e45-426e-9e6e-7a8cab1f6e16&version=517&siteid=0&MaxEntries=50&PageNumber=" + pageNumber + "&BidCountMax=0&PostalCode=" + zipcode + "&SortOrder=Ascending&callname=FindItemsAdvanced&QueryKeywords=" + itemSearchFormatted + "&responseencoding=JSON&callback=true&trackingid=2687640&trackingpartnercode=1&affiliateuserid=2205191";
			} else {
				var source = "http://open.api.ebay.com/shopping?appid=CodeCoal-4e45-426e-9e6e-7a8cab1f6e16&version=517&siteid=0&MaxEntries=50&BidCountMax=0&PostalCode=" + zipcode + "&SortOrder=Ascending&callname=FindItemsAdvanced&QueryKeywords=" + itemSearchFormatted + "&responseencoding=JSON&callback=true&trackingid=2687640&trackingpartnercode=1&affiliateuserid=2205191";
			}
		} else {
			if (pageNumber) {
				var source = "http://open.api.ebay.com/shopping?appid=CodeCoal-4e45-426e-9e6e-7a8cab1f6e16&version=517&siteid=0&MaxEntries=50&PageNumber=" + pageNumber + "&BidCountMax=0&SortOrder=Ascending&callname=FindItemsAdvanced&QueryKeywords=" + itemSearchFormatted + "&responseencoding=JSON&callback=true&trackingid=2687640&trackingpartnercode=1&affiliateuserid=2205191";
			} else {
				var source = "http://open.api.ebay.com/shopping?appid=CodeCoal-4e45-426e-9e6e-7a8cab1f6e16&version=517&siteid=0&MaxEntries=50&BidCountMax=0&SortOrder=Ascending&callname=FindItemsAdvanced&QueryKeywords=" + itemSearchFormatted + "&responseencoding=JSON&callback=true&trackingid=2687640&trackingpartnercode=1&affiliateuserid=2205191";
			}
		}
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.id = 'ebaySearch';
		script.src = source;
		document.getElementsByTagName('head')[0].appendChild(script);  
	}
	
	function findHalfProducts(itemSearch,pageNumber) {
		//with postal code
		//var source = "http://open.api.ebay.com/shopping?appid=CodeCoal-4e45-426e-9e6e-7a8cab1f6e16&version=517&siteid=0&MaxEntries=50&PostalCode=91411&SortOrder=Ascending&callname=FindItems&QueryKeywords=" + itemSearch + "&responseencoding=JSON&callback=true&trackingid=2687640&trackingpartnercode=1&affiliateuserid=2205191";
		var itemSearchFormatted = makeSearchString(itemSearch);
		var zipcode = getZipcode();
		if (pageNumber) {
			var source = "http://open.api.ebay.com/shopping?appid=CodeCoal-4e45-426e-9e6e-7a8cab1f6e16&version=517&siteid=0&MaxEntries=20&AvailableItemsOnly=true&PageNumber=" + pageNumber + "&SortOrder=Ascending&callname=FindHalfProducts&QueryKeywords=" + itemSearchFormatted + "&responseencoding=JSON&callback=true&trackingid=2687640&trackingpartnercode=1&affiliateuserid=2205191";
		} else {
			var source = "http://open.api.ebay.com/shopping?appid=CodeCoal-4e45-426e-9e6e-7a8cab1f6e16&version=517&siteid=0&MaxEntries=20&AvailableItemsOnly=true&SortOrder=Ascending&callname=FindHalfProducts&QueryKeywords=" + itemSearchFormatted + "&responseencoding=JSON&callback=true&trackingid=2687640&trackingpartnercode=1&affiliateuserid=2205191";
		}
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.id = 'halfSearch';
		script.src = source;
		document.getElementsByTagName('head')[0].appendChild(script);  
	}
	
	function getHalfProduct(itemSearch,type,pageNumber) {
		if (pageNumber) {
			var source = "http://open.api.ebay.com/shopping?appid=CodeCoal-4e45-426e-9e6e-7a8cab1f6e16&version=517&siteid=0&MaxEntries=20&IncludeSelector=Items&AvailableItemsOnly=true&PageNumber=" + pageNumber + "&SortOrder=Ascending&callname=FindHalfProducts&ProductID.type="+type+"&ProductID.Value=" + itemSearch + "&responseencoding=JSON&callback=true&trackingid=2687640&trackingpartnercode=1&affiliateuserid=2205191";
		} else {
			var source = "http://open.api.ebay.com/shopping?appid=CodeCoal-4e45-426e-9e6e-7a8cab1f6e16&version=517&siteid=0&MaxEntries=20&IncludeSelector=Items&AvailableItemsOnly=true&SortOrder=Ascending&callname=FindHalfProducts&ProductID.type="+type+"&ProductID.Value=" + itemSearch + "&responseencoding=JSON&callback=true&trackingid=2687640&trackingpartnercode=1&affiliateuserid=2205191";
		}
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.id = 'halfSearch';
		script.src = source;
		document.getElementsByTagName('head')[0].appendChild(script);  
	}
	
	function runHalfSearch(type,itemSearch,pageNumber) {
		document.getElementById("itemSearch").value = itemSearch;
		document.getElementById("searchType").value = type;
		var zipField = document.getElementById("zipField");
		zipField.parentNode.removeChild(zipField);
		goToPage("half.php");
	}
	
	function _cb_FindHalfProducts(root) {
		if (resultTable) resultTable.destroy();
		resultTable = createMatrixTable("resultDiv");
		resultTable.setColumnSize(3);
		resultTable.setColumnHeaders(["","Title", "Details"]);
		resultTable.showColumnHeaders(true);
		var prods = root.Products || []
		var products = prods.Product || [];
		resultTable.setRowSize(products.length);
		var pageNumber = root.PageNumber || 0;
		var totalPages = root.ApproximatePages || 0;
		for (var i = 0; i < products.length; i++) {
			var product = products[i];
			var title = product.Title;
			//var viewitem = item.ViewItemURLForNaturalSearch;
			if (product.StockPhotoURL) {
				var galleryitem = product.StockPhotoURL;
			} else {
				var galleryitem = "images/ng.gif";
			}
			if (product.ItemArray) {
				//resultTable.setColumnSize
				var items = product.ItemArray.Item || [];
				resultTable.setColumnSize(6);
				resultTable.setRowSize(items.length);
				resultTable.setColumnHeaders(["","","Condition", "Price", "Shipping", "Seller Feedback Score"]);
				for (var it = 0; it < items.length; it++){
					var currentPriceItem = "$" + String(formatMoney(items[it].CurrentPrice.Value));			
					var shippingPrice = "$" + String(formatMoney(product.ShippingCostSummary.ShippingServiceCost.Value));
					resultTable.setRowContent(it, ['<a href="'+items[it].ViewItemURLForNaturalSearch+'">**Purchase**</a>','<a href="'+items[it].ViewItemURLForNaturalSearch+'"> <img src="' + galleryitem + '"/> </a>', items[it].HalfItemCondition, currentPriceItem, shippingPrice, items[it].Seller.FeedbackScore]);
				}
			}
			else {
				resultTable.setRowContent(i, ['<a onclick=javascript:runHalfSearch("'+product.ProductID[0].Type+'","'+product.ProductID[0].Value+'",0)><img src="' + galleryitem + '"/></a>','<a onclick=javascript:runHalfSearch("'+product.ProductID[0].Type+'","'+product.ProductID[0].Value+'",0)>'+title+'</a>', '<a onclick=javascript:popdetails("'+product.DetailsURL+'")>Get Details</a>']);
			}
		}
				document.getElementById("currentPageSpan").innerHTML = pageNumber;
		document.getElementById("totalPageSpan").innerHTML = totalPages;
		if (totalPages < 2) {
			var morePageRow = document.getElementById("getMorePages");
			morePageRow.parentNode.removeChild(morePageRow);
			if (totalPages === 0) {
				document.getElementById("currentPageSpan").innerHTML = 0;
			}
		} else {
			var jumpToPageDiv = document.getElementById("jumpToPageDiv");
			// remove all old results
			var prntNode = jumpToPageDiv.parentNode;
			prntNode.removeChild(jumpToPageDiv);
			jumpToPageDiv = document.createElement('div');
			jumpToPageDiv.id = "jumpToPageDiv";
			prntNode.appendChild(jumpToPageDiv);
			// add previous
			if (pageNumber > 1) {
				var strlnk = document.createElement('a');
				strlnk.href = "javascript:gotoResultPageHalf(" + (pageNumber - 1) + ")";
				var strimg = document.createElement('img');
				strimg.setAttribute("class","jumptopage");
				strimg.src = "images/la.gif";
				strlnk.appendChild(strimg);
				jumpToPageDiv.appendChild(strlnk);
			}
			// add numbers
			var startNumber = pageNumber - 4;
			if (startNumber < 1) {
				startNumber = 1;
			}
			var endNumber = pageNumber + 4;
			if (endNumber >= totalPages) {
				endNumber = totalPages + 1;
				startNumber = endNumber - 8;
				if (startNumber < 1) {
					startNumber = 1;
				}
			}
			if ((endNumber - startNumber) < 8 && (endNumber-startNumber) < totalPages) {
				if (totalPages > 8) {
					endNumber = endNumber + (9 - (endNumber-startNumber));
				} else {
					endNumber = endNumber + (totalPages - (endNumber-startNumber));
				}
			}
			for (var i = startNumber; i < endNumber; i++){
				if (i !== pageNumber) {
					if (i !== startNumber) {
						var spn = document.createElement('span');
						spn.innerHTML = " | ";
						jumpToPageDiv.appendChild(spn);
					}
					var lnk = document.createElement('a');
					lnk.href = "javascript:gotoResultPageHalf(" + i + ")";
					lnk.innerHTML = i;
				} else {
					var lnk = document.createElement('span');
					if (i === startNumber) {
						lnk.innerHTML = i;
					} else {
						lnk.innerHTML = " | " + i;
					}
				}
				jumpToPageDiv.appendChild(lnk);
			}
			// add next
			if (pageNumber < totalPages) {
				var endlnk = document.createElement('a');
				endlnk.href = "javascript:gotoResultPageHalf(" + (pageNumber + 1) + ")";
				var endimg = document.createElement('img');
				endimg.setAttribute("class","jumptopage");
				endimg.src = "images/ra.gif";
				endlnk.appendChild(endimg);
				jumpToPageDiv.appendChild(endlnk);
				// ...
			}
		}
		document.getElementById("result_bar").style.visibility = "visible";
		document.getElementById("loading_image_bar").style.visibility = "hidden";
		document.getElementById("loading_image_bar").style.height = "0px";
		refreshAd();
	}
	
	var detailswindow;
	function popdetails(url) {
		detailswindow=window.open(url,'name','height=600,width=600');
		if (window.focus) {detailswindow.focus()}
	}
	