/*
Bouncing Icon - v1.0
Makes any image bounce, useful to indicate data loading. 
Inspired by the KDE loading animation.

https://github.com/koas/bouncingIcon

Usage: 

To start bouncing call BI.start(imageUrl, position).
- imageUrl: required. URL of the image that will bounce.
- position: optional. Indicates where will the image bounce. Default value is
			"followCursor", with this value the image will follow the mouse
			pointer, as in KDE. You can also use "topLeft", "topRight", 
			"bottomLeft" and "bottomRight" to keep the image in any of the
			four corners of the screen.

To stop bouncing, call BI.stop().

*/
var BI = 
{
	instance: null,
	icon: null,
	iconX: 0,
	iconY: 0,
	bounceData: [[16, 16, 0, 0], [17, 15, 0, 1], [18, 14, -1, 2],
				 [19, 13, -1, 3], [20, 12, -2, 4], [21, 11, -3, 5],
				 [20, 12, -2, 4], [19, 13, -1, 3], [18, 14, -1, 2],
				 [17, 15, 0, 1], [16, 16, 0, 0], [15, 17, 0, -4],
				 [14, 18, 0, -8], [13, 19, 1, -12], [12, 20, 1, -16]],
	bounceIndex: 0,
	bounceDir: 1,
	bounceIntervalId: 0,
	start: function(imageUrl, position)
	{
		instance = this;
		
		this.stop();

		this.icon = document.createElement("img");
		this.icon.src = imageUrl;
		this.icon.style.position = "absolute";
		this.icon.width = 32;
		this.icon.height = 32;
		this.icon.style.zIndex = 100000;
		document.body.appendChild(this.icon);

		this.bounceIndex = 0;
		this.bounceDir = 1;

		this.bounceIntervalId = setInterval(this.bouncing, 50);

		switch (position)
		{	
			case "topLeft":
				this.iconX = 10;
				this.iconY = 30;
				break;

			case "topRight":
				this.iconX = window.innerWidth - 42;
				this.iconY = 30;
				break;

			case "bottomLeft":
				this.iconX = 10;
				this.iconY = window.innerHeight - 42;
				break;

			case "bottomRight":
				this.iconX = window.innerWidth - 42;
				this.iconY = window.innerHeight - 42;
				break;

			default:
				window.addEventListener("mousemove", this.moving);
				break;
		}
		
	},
	stop: function()
	{
		window.removeEventListener("mousemove", this.moving);
		if (this.icon !== null)
		{
			document.body.removeChild(this.icon);
			this.icon = null;
			clearInterval(this.bounceIntervalId);
		}
	},
	moving: function(e)
	{
		instance.iconX = e.clientX + 12;
		instance.iconY = e.clientY + 12;
	},
	bouncing: function()
	{
		var data = instance.bounceData[instance.bounceIndex];

		instance.icon.style.width = data[0] * 2 + 'px';
		instance.icon.style.height = data[1] * 2 + 'px';
		instance.icon.style.left = instance.iconX + data[2] * 2 +'px';
		instance.icon.style.top = instance.iconY + data[3] * 2 + 'px';

		instance.bounceIndex += instance.bounceDir;

		if (instance.bounceDir == 1 && instance.bounceIndex == 15)
		{
			instance.bounceIndex = 14;
			instance.bounceDir =- 1;
		}
		if (instance.bounceDir == -1 && instance.bounceIndex == 5)
		{
			instance.bounceIndex = 6;
			instance.bounceDir = 1;
		}
	}
};