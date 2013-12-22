(function ( $ ) {
 	var youtubeIncluded = false;
 	var $self;
 	var jVidcurrentVideo;
 	var playlistpos = -1;
 	var ytReady = false;
    var jVidsettings;
    var playlist

    $.fn.vidplaylist = function( option, videos, options ) {

    	if(option == "init")
    	{
	    	includePlayers(); //start up all the other js we need

	    	playlist = videos; //save playlist here.

	    	// save default settings.
	        jVidsettings = $.extend({
	        	width: "640",
	        	height:"480",
	            onStart: function () {jVidplayNextVideo();} //our default onstart is to go an play.
	        }, options );
	        
	        $self = this;

	        jVidsettings.onStart(this); //call start.
	        return this;
    	}
    	else if(option == "play") {
    		jVidplayNextVideo(); //in case option is just to play.
    	}

 
    };

    function jVidplayNextVideo () {
    	playlistpos+=1;

    	if(playlistpos >= playlist.length)
    		return;
    	// if no more items, just stop.

    	jVidcurrentVideo = 	playlist[playlistpos];


    	if($self.find("#jvidyoutube").length > 0) {
    		jwplayer().remove();
    		
    	} //always remove the youtube player before starting a new video.

    	$self.html(""); //remove the Vimeo code too, everything.


    	if(jVidcurrentVideo.toLowerCase().indexOf("youtube.com") > -1 || jVidcurrentVideo.toLowerCase().indexOf("youtu.be") > -1) {
			// let's play youtube!
			$self.append($("<div></div>").attr("id","jvidyoutube"));	

			jwplayer("jvidyoutube").setup({
			        file: jVidcurrentVideo,
			        height: jVidsettings.height,
			        width: jVidsettings.width,
			        events: {
				        onComplete: function  (argument) {
				        	jVidplayNextVideo(); //ok, done with this one, go to the next one!
				        }
			        }
			    });

			 jwplayer().play();
		 }
		 else if(jVidcurrentVideo.toLowerCase().indexOf("vimeo.com") > -1) {
		 	//let's play vimeo!

		 	vimeoId = jVidcurrentVideo.split("/")
		 	vimeoId = vimeoId[vimeoId.length-1];

		 	vplayer = $('<iframe src="http://player.vimeo.com/video/'+vimeoId+'?api=1&autoplay=true" width="'+jVidsettings.width+'" height="'+jVidsettings.height+'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');
		 	$self.append(vplayer);

		 	player = $f(vplayer[0])

		 	player.addEvent('ready', function() {
			    player.addEvent('finish', function  () {
			    	jVidplayNextVideo(); //ok, done with this one, go to the next one!
			    });
		 	});

		 }

    }

    function includePlayers() {
      youtubeIncluded = true;

      var tag = document.createElement('script');

      tag.src = "./jwplayer/jwplayer.js"
      var head = $(document.getElementsByTagName('head')[0]);
      head.append(tag);

      var tag = document.createElement('script');

      tag.src = "frogaloop/froogaloop2.min.js"
      var head = $(document.getElementsByTagName('head')[0]);
      head.append(tag);

    }
 
}( jQuery ));