<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
<meta content="Find items others missed on an ebay auction with our hidden auctions & online auction house.  Save money through auction bidding, sell by Ebaying your goods & get online auction help." name="description"/>
<meta content="auction bidding, auction house, cheap auction house, discount auction house, ebay auction, ebay auction house, ebaying your goods, hidden auctions, online auction help, online auction house" name="keywords"/>
<title><?php 
		if ($_GET["search"] != "") {
			echo $_GET["search"];
			echo " - NadaBid Search";
		} else {
			echo "Discount Auction House - Hidden Auctions - NadaBid";
		}
	  ?></title>
<link href="images/favicon.ico" type="image/ico" rel="shortcut icon"/>
<link rel="stylesheet" type="text/css" media="screen" href="css/master.css" />
<link rel="stylesheet" type="text/css" media="screen" href="scripts/matrixtable/matrixtable.css" />
<script src="scripts/matrixtable/matrixtable.js"></script>
<script src="scripts/custom.js"></script>
<meta name="robots" Content="index,follow">
</head>
<body onload="javascript:runOnLoad();">
	<div align="center">
		<table class="main_table" cellpadding="0" cellspacing="0" border="0">
			<!-- Internet Explorer Layout bug workaround -->
			<tr><td><img src="images/top.gif"></td></tr>
			<tr><td>
				<div style="float: left;"><a href="http://www.nadabid.com"><img class="logo" src="images/nadabid.gif" alt="Nada Bid - Find the items that others have missed"></img></a></div><div><div class="slogan"><span class="slogan">"Nadabid provides a convenient and simple mechanism for finding the best deals on ebay without having to spend hours searching for them.   By limiting the ebay auction search results to those goods which no one has yet bid on, we maximize your chance of finding the very best deals."</span></div></div>
				<div class="linkbar" align="right" style="position: relative; top: 3px; margin-top:5px;">
					<a class="image" href="http://del.icio.us/post?url=http://www.nadabid.com&title=Find the auction items that others have missed">
						<img src="images/pub/delicious.gif" alt="Del.icio.us" title="Del.icio.us">
					</a> 
					<a class="image" href="http://digg.com/submit?phase=2&url=http://www.nadabid.com&title=Find the auction items that others have missed">
						<img src="images/pub/digg.gif" alt="digg" title="digg this">
					</a> 
					<a class="image" href="http://reddit.com/submit?url=http://www.nadabid.com&title=Find the auction items that others have missed">
						<img src="images/pub/reddit.gif" alt="reddit" title="reddit">
					</a> 
					<a class="image" href="http://www.stumbleupon.com/submit?title=Find the auction items that others have missed&url=http://www.nadabid.com">
						<img src="images/pub/stumbleupon.gif" alt="stumbleupon" title="stumbleupon">
					</a> 
					<a class="image" href="http://technorati.com/cosmos/search.html?url=http://www.nadabid.com&title=Find the auction items that others have missed">
						<img src="images/pub/technorati.gif" alt="technorati" title="technorati">
					</a> 
					<a class="image" href="http://blinklist.com/index.php?Action=Blink/addblink.php&url=http://www.nadabid.com&title=Find the auction items that others have missed">
						<img src="images/pub/blinklist.gif" alt="blinklist" title="blinklist">
					</a> 
					<a class="image" href="http://furl.net/storeIt.jsp?t=Find the auction items that others have missed&u=http://www.nadabid.com">
						<img src="images/pub/furl.gif" alt="furl" title="furl">
					</a> 
					<a class="image" href="http://www.netscape.com/submit/?T=Find the auction items that others have missed&U=http://www.nadabid.com">
						<img src="images/pub/netscape.gif" alt="netscape" title="netscape">
					</a> 
					<a class="image" href="http://myweb2.search.yahoo.com/myresults/bookmarklet?title=Find the auction items that others have missed&&popup=true&u=http://www.nadabid.com">
						<img src="images/pub/yahoo.gif" alt="yahoo" title="yahoo">
					</a>
				</div>
			</td></tr>
			<tr><td>
				<div id="content" class="content">
					<div>
						<div style="float:left; position:relative; bottom: -2px; left: 10px;"><img src="images/ebaysel.gif"/></div>
						<div align="left" style="position:relative; bottom: -2px; left: 10px;"><a onclick="javascript:runSearch('half.php')"><img src="images/halfunsel.gif"/></a></div>
						<div align="left" style="position:relative; bottom: -2px; left: 10px;"><a onclick="javascript:runSearch('half.php')"><img src="images/buyitnowunsel.gif"/></a></div>
						<div id="search_bar" class="search_bar">
							<table width="100%">
							<tr>
							<td align="left" valign="middle">
								<form action="javascript:runSearch('index.php')">
								<input id="searchItemText" type="text" value="<?php 
																				if ($_GET["search"] != "") {
																					echo $_GET["search"];
																				} else {
																					echo "Nintendo Wii";
																				}
																			  ?>" size="41"></input>
								<input type="submit" value="Search"></input>
								</form>
							</td>
							<td align="right" valign="middle">
							Enter Shipping Zip Code:
							<input type="text" id="zipcodeText" size="5" maxlength="5" value="<?php 
																								if ($_GET["zip"] != "") {
																									echo $_GET["zip"];
																								} 
																							   ?>"></input>
							</td>
							</tr>
							</table>
						</div>
					</div>
					<div class="inner_content">
						<div id="sidebar" class="sidebar" style="float: left; margin-top: 10px;"> 
							<!-- ><a href="http://rover.ebay.com/rover/1/711-1751-2978-328/1?aid=10366500&pid=2687640" target="_blank">
								<img src="http://www.lduhtrp.net/image-2687640-10366500" width="120" height="600" alt="" border="0"/>
							</a> -->
							<script type="text/javascript"><!--
							google_ad_client = "pub-2884900603962660";
							/* 120x600, created 2/12/08, Nadabid */
							google_ad_slot = "4462535609";
							google_ad_width = 120;
							google_ad_height = 600;
							//-->
							</script>
							<script type="text/javascript"
							src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
							</script>
						</div>
						<div>
							<div id="results" style="float: left;"><div class="resultDiv" id="resultDiv"><div id="loading_image_bar" align="center" style="padding-top: 15px;"><img src="images/loading.gif"/></div></div>
								<div id="result_bar" class="result_bar">
									<table width="100%">
										<tr><td align="left" valign="top">Page <span id="currentPageSpan" class="currentPageSpan">1</span> of <span id="totalPageSpan">XXX</span></td></tr>
										<tr id="getMorePages">
											<td align="left"><div id="jumpToPageDiv"></div></td>
											<td align="right">Jump to page: <input type="text" id="jumpToPageText" size="3" style="margin-right: 5px;"></input><input type="button" value="Go" onclick="javascript:jumpToPage();"></input></td>
										</tr>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</td></tr>
			<tr><td><div id="footer" class="footer" align="center">
				<a href="http://rover.ebay.com/rover/1/711-1751-2978-328/1?aid=10366506&pid=2687640" target="_blank">
					<!-- width="728" -->
					<img src="http://www.lduhtrp.net/image-2687640-10366506" width="920" height="110" alt="" border="0"/>
				</a>
				</div>
				<img src="images/bottom.gif"></td></tr>
		</table>
		<table style="width:780px;">
			<tr>
				<td align="left" valign="top"><h2 style="font-family: georgia; font-size: 13px; line-height: 1.4em;">All page design is copyright &copy; 2007 Code Coalition. All rights reserved.</h2></td> 
				<td align="right" valign="baseline"><a href="http://www.codecoalition.com"><img src="images/codecoalitionproject.gif" style="border: none;" alt="This is a Code Coalition project"/></a></td>
			</tr>
		</table>
	</div>
	
  	<form id="searchForm" action="index.php" method="get" style="visibility: hidden; height:1px;">
  		<input id="searchField" name="search" type="hidden"></input>
  		<input id="zipField" name="zip" type="hidden"></input>
  		<input id="itemSearch" name="item" type="hidden"></input>
  		<input id="searchType" name="type" type="hidden"></input>
  		<h1>Nadabid is a discount ebay auction house that provides a convenient and simple mechanism for finding the best deals on ebay without having to spend hours searching for them.   By limiting the ebay auction search results to those goods which no one has yet bid on, we maximize your chance of finding the very best deals in the ebay online auctions.   Nadabid was founded because of the increase in ebay users which has made it more difficult to find the hidden deals on ebay items.   Feal free to email us your feedback because we are always looking for better ways to do things.  Thanks for taking the time to check out our site, and please make NadaBid your first destination for all of your online auction shopping needs.</h1>
  	</form>
  	<!-- analytics -->
	<script type="text/javascript">
	var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
	document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
	</script>
	<script type="text/javascript">
	var pageTracker = _gat._getTracker("UA-5637746-2");
	pageTracker._trackPageview();
	</script>
<!-- /analytics -->
</body>
</html>


