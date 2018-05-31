if (typeof AFRAME === 'undefined') {
	throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('ol', {
	schema: {
		map: {
			type: 'string',
		default: 'map'
		},
		pixToVRRatio: {
		default: 100
		},
		aframeEvent: {
			type: 'string',
		default: 'click'
		},
		OlEvent: {
			type: 'string',
		default: 'click'
		}
	},
	init: function () {	
	},
	update: function (oldData) {
		var data = this.data;  // Component property values.
		var el = this.el;  // Reference to the component's entity.
		var comp=this;
		// Nothing changed
		if (AFRAME.utils.deepEqual(oldData, data)) {
			return;
		}
		//Check for the required schema elements    
		if(data.map==''){
			console.warn('OpenLayers component: OpenLayers map variable not specified. Aborting!');
			return;
		}
		if(data.pixToVRRatio==0){
			console.warn('OpenLayers component: pixToVRRatio not specified. Aborting!');
			return;
		}
		if(data.aframeEvent==''){
			console.warn('OpenLayers component: AFRAME event not specified. Aborting!');
			return;
		}
		if(data.OlEvent==''){
			console.warn('OpenLayers component: OpenLayers interaction event not specified. Aborting!');
			return;
		}
		var olMap=eval(data.map)
		if(typeof(olMap)!='object'){
			console.warn('OpenLayers component: Map object/variable cannot be found. Aborting!');
			return;
		}
		//Check if element has height and width. Otherwise is not possible to plot the map on it.
		if(el.getAttribute('height')==null){
			console.warn('OpenLayers component: Element Height is not specified. Aborting!');
			return;
		}
		if(el.getAttribute('width')==null){
			console.warn('OpenLayers component: Element Width is not specified. Aborting!');
			return;
		}
		
		// Set pixToVRRatio
		// from https://github.com/jesstelford/aframe-map -----> https://github.com/jesstelford/aframe-map/blob/master/src/component.js
		
		var pixToVRRatio=data.pixToVRRatio;
		var compWidth=el.getAttribute('width');
		var compHeight=el.getAttribute('height');
		var mapWidth = compWidth*pixToVRRatio;
		var mapHeight = compHeight*pixToVRRatio;

		///////////////////////////
		// Check if mapWidth is a power of 2. 
		//
		// If not a new component size will be calculated and set using the provided ratio.
		//
		// More info here: https://gamedev.stackexchange.com/questions/26187/why-are-textures-always-square-powers-of-two-what-if-they-arent
		///////////////////////////

		if (!(Math.log(mapWidth)/Math.log(2)) % 1 === 0) {
			//throw new Error("Map height is not power of 2! -> "+ mapHeight);
			var newMapWidth=this.nearestPow2(mapWidth);
			var newWidth=this.calculateNewSize(newMapWidth,pixToVRRatio);
			console.warn('Map width ',mapWidth,' (Ratio * component width - ',pixToVRRatio,'*',compWidth,') is not a power of 2. Setting new map width to ',newMapWidth,' and adjusting component width to ',newWidth);
			el.setAttribute('width',newWidth);
			mapWidth=newMapWidth;
		}
		if (!(Math.log(mapHeight)/Math.log(2)) % 1 === 0) {
			//throw new Error("Map height is not power of 2! -> "+mapHeight);
			var newMapHeight=this.nearestPow2(mapHeight)
			var newHeight=this.calculateNewSize(newMapHeight,pixToVRRatio);
			console.warn('Map height ',mapHeight,' (Ratio * component height - ',pixToVRRatio,'*',compHeight,') is not a power of 2. Setting new map height to ',newMapHeight,' and adjusting component height to ',newHeight);
			el.setAttribute('height',newHeight);
			mapHeight=newMapHeight;

		}
		
		////Set Map Size
		
		olMap.setSize([mapWidth,mapHeight]);
		
		//// Set A-frame events
		
		el.addEventListener(data.aframeEvent, function(obj) {
			var objX=obj.detail.intersection.uv.x;
			var objY=obj.detail.intersection.uv.y;

			var mapSizeX=olMap.getSize()[0];
			var mapSizeY=olMap.getSize()[1];

			var objMapX=objX*mapSizeX;
			var objMapY=(1-objY)*mapSizeY; // in Y needs to be reversed because map origin is top left
			comp.simulateEvent(data.OlEvent,objMapX,objMapY,false,olMap);
		});
		
		// Postcompose event. This were we convert canvas to image and the assign this image to the aframe object

		olMap.on('postcompose', function(event) {
			var canvas = event.context.canvas;
			var img  = canvas.toDataURL("image/png")
			el.setAttribute("src", img);
		});
		olMap.renderSync();
	},
	
	//Simulated event function based on https://github.com/openlayers/openlayers/blob/83f87a1f1ee4d9a2e1e3954c908188c8a73cfb75/test/spec/ol/interaction/draw.test.js#L68
	simulateEvent:function (type,x,y,shiftKey,olMap){
		var event = new ol.pointer.PointerEvent(type, {
			clientX: x,
			clientY: y,
			shiftKey: shiftKey
		});
		olMap.handleMapBrowserEvent(new ol.MapBrowserPointerEvent(type, olMap, event)); //new ol.MapBrowserPointerEvent is available in openlayers debug
	},
	nearestPow2: function( aSize ){
		return Math.pow( 2, Math.round( Math.log( aSize ) / Math.log( 2 ) ) ); 
	},

	calculateNewSize: function (newMapSize, ratio ){
		return newMapSize/ratio; 
	}
});