function startRecord(){
	isRecording = true;
  oldTime = new Date();
  console.log(oldTime);
}

function addRecord(c,w,dc){
	var now = new Date();
  var time = now.getTime() ;
	var readableTime = dateString();
	var isSuccess = (c == dc);
  var dict = {
    char: c,
		time: time,
		readableTime: readableTime,
    duration: now - oldTime,
		word: w,
		directChar: dc,
		isSuccess: isSuccess
	}
	records.push(dict);
  oldTime = now;
}

function stopRecord(){
	isRecording = false;
  var url = "http://localhost:1337";
  str = JSON.stringify(records);
  $.ajax({
  		type:'POST',
  		url:url,
  		dataType:'text',
  		data:str,
  		timeout:5000,
  //		data:{data:JSONstr, id:id}
  		success: function(data) {
  			console.log("Upload Success");
				records = new Array();
  		},
  		error: function(XMLHttpRequest, textStatus, errorThrown) {
  			alert("error");
  			console.log(XMLHttpRequest);
  			console.log(textStatus);
  			console.log(errorThrown);
  		}
  	});
}

function dateString(){
	var now = new Date();
	var yyyy = now.getFullYear();
	var mm = ("0"+(now.getMonth()+1)).slice(-2);
	var dd = ("0"+now.getDate()).slice(-2);
	var hh = ("0"+now.getHours()).slice(-2);
	var mi = ("0"+now.getMinutes()).slice(-2);
	var ss = ("0"+now.getSeconds()).slice(-2);

	var s = yyyy + mm + dd + hh + mi + ss;
	console.log(s);
	return s;
}
