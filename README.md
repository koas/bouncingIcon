# bouncingIcon
Makes an image bounce to indicate loading, as in KDE

##Usage

To start bouncing call BI.start(imageUrl, position).
- imageUrl: required. URL of the image that will bounce.
- position: optional. Indicates where will the image bounce. Default value is
			"followCursor", with this value the image will follow the mouse
			pointer, as in KDE. You can also use "topLeft", "topRight", 
			"bottomLeft" and "bottomRight" to keep the image in any of the
			four corners of the screen.

To stop bouncing, call BI.stop().