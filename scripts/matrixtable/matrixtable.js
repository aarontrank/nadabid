/**
 * creates a matrixtable instance in the specified div consisting of a NxM matrix 
 * @param {Object} divId The id of the div where the matrixtable will go
 */
function createMatrixTable(divId){
	var outerDiv = document.getElementById(divId);
	var matrixTable = document.createElement('table');
	matrixTable.setAttribute("id", divId + "MatrixTable");
	matrixTable.setAttribute("class", "MatrixTable");
	outerDiv.appendChild(matrixTable);
	matrixTable.columns = 0;
	
	/**
	* Sets the number of rows in the table
	* @param {Integer} sz The number of content rows in the matrixtable
	*/
	matrixTable.setRowSize = function(sz) { 
		if (sz > 0) {
			if (sz > matrixTable.rows.length - 1) {
				while (matrixTable.rows.length - 1 < sz) {
					var r = matrixTable.insertRow(matrixTable.rows.length);
					r.setAttribute("class","MatrixTableRow");
					for (var ci = 0; ci < matrixTable.columns; ci++) {
						var c = r.insertCell(r.cells.length - 1);
						c.setAttribute("class","MatrixTableCell");
					} 
				}
			}
			else if (sz < matrixTable.rows.length - 1) {
				while (matrixTable.rows.length - 1> sz) {
					matrixTable.deleteRow(matrixTable.rows.length - 1);
				}
			}
		}
	}
	
	/**
	* Sets the number of columns in the table
	* @param {Integer} sz The number of content columns in the matrixtable
	*/
	matrixTable.setColumnSize = function(sz) {
		if (sz > 0) {
			var th = matrixTable.createTHead();
			if (th.rows.length < 1) {
				th.setAttribute("class","MatrixTableHeader");
				var tr = th.insertRow(0);
				tr.setAttribute("class","MatrixTableHeaderRow");
			}
			if (sz > matrixTable.columns) {
				while (matrixTable.columns < sz) {
					for (var i = 0 ; i < matrixTable.rows.length - 1; i++){
						var r = matrixTable.rows[i + 1];
						var c =  r.insertCell(r.cells.length);
						c.setAttribute("class","MatrixTableCell");
					}
					matrixTable.columns++;
				}
				while (th.rows[0].cells.length < sz) {
					var hc = th.rows[0].insertCell(th.rows[0].cells.length);
					hc.setAttribute("class","MatrixTableHeaderCell");
				}
			}
			else if (sz < matrixTable.columns) {
				while (matrixTable.columns > sz) {
					for (var i = 0 ; i < matrixTable.rows.length; i++){
						var r = matrixTable.rows[i];
						r.deleteCell(r.cells.length - 1);
					}
					matrixTable.columns--;
				}
			}
		}
	}
	
	/**
	* Sets headers for the columns
	* @param {Array} hd An array of html data that will be set as the content of the headers
	*/ 
	matrixTable.setColumnHeaders = function(hd){
		if (hd.length <= matrixTable.columns) {
			var th = matrixTable.createTHead();
			for (var i = 0; i < matrixTable.columns && i < hd.length; i++){
				var tr = th.rows[0];
				tr.cells[i].innerHTML = hd[i];
			}
		}
	}
	
	/**
	* Sets a header for the specified column
	* @param {Integer} c The column for which to set the column header
	* @param {String} hd The html data that will be set as the content of the header for the specified column
	*/ 
	matrixTable.setColumnHeader = function(c,hd){
		if (c >= 0 && c < matrixTable.columns) {
			var th = matrixTable.createTHead();
			th.rows[0].cells[c].innerHTML = hd;
		}
	}
	
	/**
	* Sets the content of a cell
	* @param {Integer} r The row that the cell is in
	* @param {Integer} c The column that the cell is in
	* @param {String} cnt The html data that will be set as the content of the specified cell
	*/
	matrixTable.setCellContent = function(r,c,cnt) {
		if (r >= 0 && r < matrixTable.rows.length - 1) {
			var ro = matrixTable.rows[r + 1];
			if (c >= 0 && c < matrixTable.columns) {
				ro.cells[c].innerHTML = cnt;
			}
		}
	}
	
	matrixTable.setCellObjectContent = function(r,c,cnt) {
		if (r >= 0 && r < matrixTable.rows.length - 1) {
			var ro = matrixTable.rows[r + 1];
			if (c >= 0 && c < matrixTable.columns) {
				ro.cells[c].appendChild(cnt);
			}
		}
	}
	
	/**
	* Sets the content of a row
	* @param {Integer} r The row whose content will be set
	* @param {Array} cnt An array of html data that will be set as the content of the cells in the specified row
	*/
	matrixTable.setRowContent = function(r,cnt) {
		if (r >= 0 && r < matrixTable.rows.length - 1) {
			var ro = matrixTable.rows[r + 1];
			for (var i = 0; i < matrixTable.columns && i < cnt.length; i++){
				ro.cells[i].innerHTML = cnt[i];
			}
		}
	}
	
	/**
	* Sets the content of a column
	* @param {Integer} c The column whose content will be set
	* @param {Array} cnt An array of html data that will be set as the content of the cells in the specified column
	*/
	matrixTable.setColumnContent = function(c,cnt){
		if (c >= 0 && c < matrixTable.columns) {
			for (var i = 0; i < matrixTable.rows.length && i < cnt.length; i++){
				var ro = matrixTable.rows[i + 1];
				ro.cells[c].innerHTML = cnt[i];
			}
		}
	}
	
	/**
	* Sets the style of the Table 
	* @param {Object} stl The object containing an associative array of styles to be set on the Table
	*/
	matrixTable.setTableStyle = function(stl){
		alert("this was called");
		for (var nm in stl) {
			matrixTable.style.setProperty(nm,stl[nm],"");
		}
	}
	
	/**
	* Sets the style of the Row 
	* @param {Integer} r The row whose style will be set
	* @param {Object} stl The object containing an associative array of styles to be set on the cells in the specified row
	*/
	matrixTable.setRowStyle = function(r, stl){
		if (r >= 0 && r < matrixTable.rows.length - 1) {
			var tr = matrixTable.rows[r + 1];
			for (var i = 0; i < tr.cells.length; i++) {
				var ce = tr.cells[i];
				for (var nm in stl) {
					ce.style.setProperty(nm,stl[nm],"");
				}
			}
		}
	}
	
	/**
	* Sets the style of the Column 
	* @param {Integer} c The column whose style will be set
	* @param {Object} stl The object containing an associative array of styles to be set on the cells in the specified column
	*/
	matrixTable.setColumnStyle = function(c, stl){
		if (c >= 0 && c < matrixTable.columns) {
			for (var i = 0; i < matrixTable.rows.length - 1; i++){
				var ro = matrixTable.rows[i + 1];
				var ce = ro.cells[c];
				for (var nm in stl) {
					ce.style.setProperty(nm,stl[nm],"");
				}
			}
		}
	}
	
	/**
	* Sets the style of the Cell 
	* @param {Integer} r The row that the cell is in
	* @param {Integer} c The column that the cell is in
	* @param {Object} stl The object containing an associative array of styles to be set on the specified cell
	*/
	matrixTable.setCellStyle = function(r,c,stl){
		if (r >= 0 && r < matrixTable.rows.length - 1) {
			var ro = matrixTable.rows[r + 1];
			if (c >= 0 && c < matrixTable.columns) {
				var ce = ro.cells[c];
				for (var nm in stl) {
					ce.style[nm] = stl[nm];
				}
			}
		}
	}
	
	/**
	* Shows the column headers if set to true (default is false)
	* @param {Boolean} sw The boolean value to set on the showColumnHeaders flag
	*/
	matrixTable.showColumnHeaders = function(sw){
		var th = matrixTable.createTHead();
		var tr = th.rows[0];
		if (Boolean(sw)) {
			tr.style.display = "";
		} else {
			tr.style.display = "none";
		}
	}
	
	/**
	* Shows the row if set to true, and hides it otherwise (default is true)
	* @param {Boolean} sw The boolean value to set on the showRow flag
	*/
	matrixTable.showRow = function(r,sw){
		if (r >= 0 && r < matrixTable.rows.length - 1) {
			var ro = matrixTable.rows[r+1];
			if (Boolean(sw)) {
				ro.style.display = "";
			} else {
				ro.style.display = "none";
			}	
		}
	}
	
	/**
	* Shows the column if set to true, and hides it otherwise (default is true)
	* @param {Boolean} sw The boolean value to set on the showColumn flag
	*/
	matrixTable.showColumn = function(c,sw){
		if (c >= 0 && c < matrixTable.columns) {
			for (var i = 0; i < matrixTable.rows.length; i++){
				var ro = matrixTable.rows[i];
				var ce = ro.cells[c];
				if (Boolean(sw)) {
					ce.style.display = "";
				} else {
					ce.style.display = "none";
				}	
			}
		}
	}
	
	/**
	 * Destroy the this matrixtable
	 */
	matrixTable.destroy = function(){
		outerDiv.removeChild(matrixTable);
		matrixTable = null;
	}
	
	matrixTable.setRowSize(1);
	matrixTable.setColumnSize(1);
	matrixTable.showColumnHeaders(false);
	return matrixTable;
}

//setRowID
//setRowName
//setColumnID
//setColumnName
//setCellID
//setCellName