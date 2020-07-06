function openNav() {
	document.getElementById("mySidenav").style.width = "200px";
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
}

function getAsset( sel ){
	var opt = sel.options[sel.selectedIndex].value;
	document.getElementById('assetname').value = opt;
}

function showBlock( show ){
	if (show == 'edit') {
		document.getElementById('systembalance').style.display = 'none';
		document.getElementById('systemedit').style.display = 'block';
	}else{
		document.getElementById('systembalance').style.display = 'block';
		document.getElementById('systemedit').style.display = 'none';
	}
}