<?php
	$obj = json_decode($_POST['annotation'], true); //convert to associative array
	
	//pseudo-match v4 uuid (could technically still be invalid, but oh well...)
	//potentially escape backslash
	if(preg_match("^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$", $obj["annotator"] && preg_match("^\w+$", $obj["id"]) && preg_match("^\w+$", $obj["class"])) {
		
	}
	else {
		
	}
?>