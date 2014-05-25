alert('SceneScene1.js loaded');
var AVPlayer = null;
var Url = "http://mra.rastream.com/mra_hardrock";
var Error = null;

function SceneScene1() {

	this.RadioChannel = [{
		Title : "Hard Rock FM Jakarta",
		StreamUrl : "http://mra.rastream.com/mra_hardrock",
		Website : "http://www.hardrockfm.com"
	},
	{
		Title : "Prambors FM Bandung",
		StreamUrl : "http://masima.rastream.com/masima-pramborsbandung",
		Website : "http://pramborsfm.com"
	},
	{
		Title : "Your Hometown Radio",
		StreamUrl : "http://206.190.130.180:8080",
		Website : "http://www.yourhometownradio.com"
	}];
	
};

function successCB(avplayObj){
	AVPlayer = avplayObj;
	alert("Starting Init");
	AVPlayer.init();
	alert("Completed Init");
	AVPlayer.open(Url);
	AVPlayer.play(playSuccessCB, function(error){console.log(error.message);});	
};

function errorCB (error){
	console.log("Cannot get avplay object : " + error.name);
};

function playSuccessCB (){
	console.log("playing the video is successfully.");
	
};

SceneScene1.prototype.initialize = function () {
	alert("SceneScene1.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called
	
	var listradio = [];
    for(var i=0; i<this.RadioChannel.length; i++)
    {
    	listradio.push(this.RadioChannel[i].Title);
    }

    $("#listRadioChannel").sfList({
        data: listradio,
        index: 0,
        itemsPerPage: 5,
    }).sfList('blur');
    
	alert("URL =>> " + Url);
    webapis.avplay.getAVPlay(successCB, errorCB);

};

SceneScene1.prototype.handleShow = function (data) {
	alert("SceneScene1.handleShow()");
	// this function will be called when the scene manager show this scene
};

SceneScene1.prototype.handleHide = function () {
	alert("SceneScene1.handleHide()");
	// this function will be called when the scene manager hide this scene
	
};

SceneScene1.prototype.handleFocus = function () {
	alert("SceneScene1.handleFocus()");
	// this function will be called when the scene manager focus this scene
	
	$("#listRadioChannel").sfList('focus');
};

SceneScene1.prototype.handleBlur = function () {
	alert("SceneScene1.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
	
	$("#listRadioChannel").sfList('blur');
};

SceneScene1.prototype.handleKeyDown = function (keyCode) {
	alert("SceneScene1.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focused
	switch (keyCode) {
		case sf.key.LEFT:
			break;
		case sf.key.RIGHT:
			break;
		case sf.key.UP:
			AVPlayer.stop();
			$("#listRadioChannel").sfList('prev');
			break;
		case sf.key.DOWN:
			AVPlayer.stop();
			$("#listRadioChannel").sfList('next');
			break;
		case sf.key.ENTER:
			var item = this.RadioChannel[$("#listRadioChannel").sfList('getIndex')];
			Url = item.StreamUrl;
			
			AVPlayer.open(Url);
			alert("ENTER URL =>> " + Url);
			AVPlayer.play(playSuccessCB, function(Error){console.log(error.message);});
			break;
		case sf.key.PAUSE:
			if(AVPlayer != null)
				AVPlayer.pause();
			break;
		case sf.key.PLAY:
			if(AVPlayer != null)
				AVPlayer.resume();
			break;
		default:
			alert("handle default key event, key code(" + keyCode + ")");
			break;
	}
};
