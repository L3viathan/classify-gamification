<?php
	$obj = json_decode($_POST['annotation'], true); //convert to associative array

	//pseudo-match v4 uuid (could technically still be invalid, but oh well...)
	//potentially escape backslash
	if(preg_match("^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$", $obj["annotator"] && preg_match("^\w+$", $obj["id"]) && preg_match("^\w+$", $obj["class"])) {
		//everything seems alright
		
		//append annotation to annotator file (thus security shouldn't be an issue)
		$filename = "annotations/" + $obj["annotator"] + ".csv"; //json?
		$newcontent = "";
		/* if(!file_exists($filename)){
			$newcontent .= "[\n";
		} */
		$newcontent .= $obj["id"] . ',' . $obj["class"] . "\n";
		
		//append $newcontent to file
		
	}
	else {
		//bad request
		header("400 Don't you use your fancy mathematics to mudder the issue!");
	}
?>