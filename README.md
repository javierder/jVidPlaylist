jVidPlaylist
============

This jQuery plugin allows you to -now in a very basic way- play several youtube & vimeo videos in a row, in the same container, as if you had a "playlist".

The basic idea is to create a playlist of youtube & vimeo files.

For youtube playback it uses jwplayer, although the same behaviour can be achieved with the youtube API.

Usage is quite simple:

			$("#container").vidplaylist("init", ["http://youtube.com/bl","http://vimeo.com/123"], {
				width:"500",
				height:"300"
			});
			
			
First parameter is the command, init. Second is an array of video urls. 3rd is for the options.

There's an onStart event that can be overriden to avoid autoplay, and a "play" command

$("#something").vidplaylist("play");

to start playing.
