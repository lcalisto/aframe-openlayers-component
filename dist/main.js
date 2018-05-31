!function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(module,exports){!function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(module,exports){if("undefined"==typeof AFRAME)throw new Error("Component attempted to register before AFRAME was available.");AFRAME.registerComponent("ol",{schema:{map:{type:"string",default:"map"},pixToVRRatio:{default:100},aframeEvent:{type:"string",default:"click"},OlEvent:{type:"string",default:"click"}},init:function(){},update:function(oldData){var data=this.data,el=this.el;if(!AFRAME.utils.deepEqual(oldData,data)){if(""==data.map)return void console.warn("OpenLayers component: OpenLayers map variable not specified. Aborting!");if(0==data.pixToVRRatio)return void console.warn("OpenLayers component: pixToVRRatio not specified. Aborting!");if(""==data.aframeEvent)return void console.warn("OpenLayers component: AFRAME event not specified. Aborting!");if(""==data.OlEvent)return void console.warn("OpenLayers component: OpenLayers interaction event not specified. Aborting!");var olMap=eval(data.map);if("object"!=typeof olMap)return void console.warn("OpenLayers component: Map object/variable cannot be found. Aborting!");if(null==el.getAttribute("height"))return void console.warn("OpenLayers component: Element Height is not specified. Aborting!");if(null==el.getAttribute("width"))return void console.warn("OpenLayers component: Element Width is not specified. Aborting!");var pixToVRRatio=data.pixToVRRatio,compWidth=el.getAttribute("width"),compHeight=el.getAttribute("height"),mapWidth=compWidth*pixToVRRatio,mapHeight=compHeight*pixToVRRatio;if(!(Math.log(mapWidth)/Math.log(2))%1==0){var newMapWidth=this.nearestPow2(mapWidth),newWidth=this.calculateNewSize(newMapWidth,pixToVRRatio);console.warn("Map width ",mapWidth," (Ratio * component width - ",pixToVRRatio,"*",compWidth,") is not a power of 2. Setting new map width to ",newMapWidth," and adjusting component width to ",newWidth),el.setAttribute("width",newWidth),mapWidth=newMapWidth}if(!(Math.log(mapHeight)/Math.log(2))%1==0){var newMapHeight=this.nearestPow2(mapHeight),newHeight=this.calculateNewSize(newMapHeight,pixToVRRatio);console.warn("Map height ",mapHeight," (Ratio * component height - ",pixToVRRatio,"*",compHeight,") is not a power of 2. Setting new map height to ",newMapHeight," and adjusting component height to ",newHeight),el.setAttribute("height",newHeight),mapHeight=newMapHeight}olMap.setSize([mapWidth,mapHeight]),el.addEventListener(data.aframeEvent,function(t){var e=t.detail.intersection.uv.x,n=t.detail.intersection.uv.y,i=e*olMap.getSize()[0],o=(1-n)*olMap.getSize()[1];this.simulateEvent(data.OlEvent,i,o,!1,olMap)}),olMap.on("postcompose",function(t){var e=t.context.canvas.toDataURL("image/png");el.setAttribute("src",e)}),olMap.renderSync()}},simulateEvent:function(t,e,n,i,o){var a=new ol.pointer.PointerEvent(t,{clientX:e,clientY:n,shiftKey:i});o.handleMapBrowserEvent(new ol.MapBrowserPointerEvent(t,o,a))},nearestPow2:function(t){return Math.pow(2,Math.round(Math.log(t)/Math.log(2)))},calculateNewSize:function(t,e){return t/e}})}])},function(module,exports){if("undefined"==typeof AFRAME)throw new Error("Component attempted to register before AFRAME was available.");AFRAME.registerComponent("ol",{schema:{map:{type:"string",default:"map"},pixToVRRatio:{default:100},aframeEvent:{type:"string",default:"click"},OlEvent:{type:"string",default:"click"}},init:function(){},update:function(oldData){var data=this.data,el=this.el;if(!AFRAME.utils.deepEqual(oldData,data))if(""!=data.map)if(0!=data.pixToVRRatio)if(""!=data.aframeEvent)if(""!=data.OlEvent){var olMap=eval(data.map);if("object"==typeof olMap)if(null!=el.getAttribute("height"))if(null!=el.getAttribute("width")){var pixToVRRatio=data.pixToVRRatio,compWidth=el.getAttribute("width"),compHeight=el.getAttribute("height"),mapWidth=compWidth*pixToVRRatio,mapHeight=compHeight*pixToVRRatio;if(!(Math.log(mapWidth)/Math.log(2))%1==0){var newMapWidth=this.nearestPow2(mapWidth),newWidth=this.calculateNewSize(newMapWidth,pixToVRRatio);console.warn("Map width ",mapWidth," (Ratio * component width - ",pixToVRRatio,"*",compWidth,") is not a power of 2. Setting new map width to ",newMapWidth," and adjusting component width to ",newWidth),el.setAttribute("width",newWidth),mapWidth=newMapWidth}if(!(Math.log(mapHeight)/Math.log(2))%1==0){var newMapHeight=this.nearestPow2(mapHeight),newHeight=this.calculateNewSize(newMapHeight,pixToVRRatio);console.warn("Map height ",mapHeight," (Ratio * component height - ",pixToVRRatio,"*",compHeight,") is not a power of 2. Setting new map height to ",newMapHeight," and adjusting component height to ",newHeight),el.setAttribute("height",newHeight),mapHeight=newMapHeight}olMap.setSize([mapWidth,mapHeight]),el.addEventListener(data.aframeEvent,function(t){var e=t.detail.intersection.uv.x,n=t.detail.intersection.uv.y,i=e*olMap.getSize()[0],o=(1-n)*olMap.getSize()[1];this.simulateEvent(data.OlEvent,i,o,!1,olMap)}),olMap.on("postcompose",function(t){var e=t.context.canvas.toDataURL("image/png");el.setAttribute("src",e)}),olMap.renderSync()}else console.warn("OpenLayers component: Element Width is not specified. Aborting!");else console.warn("OpenLayers component: Element Height is not specified. Aborting!");else console.warn("OpenLayers component: Map object/variable cannot be found. Aborting!")}else console.warn("OpenLayers component: OpenLayers interaction event not specified. Aborting!");else console.warn("OpenLayers component: AFRAME event not specified. Aborting!");else console.warn("OpenLayers component: pixToVRRatio not specified. Aborting!");else console.warn("OpenLayers component: OpenLayers map variable not specified. Aborting!")},simulateEvent:function(t,e,n,i,o){var a=new ol.pointer.PointerEvent(t,{clientX:e,clientY:n,shiftKey:i});o.handleMapBrowserEvent(new ol.MapBrowserPointerEvent(t,o,a))},nearestPow2:function(t){return Math.pow(2,Math.round(Math.log(t)/Math.log(2)))},calculateNewSize:function(t,e){return t/e}})},function(t,e,n){n(1),t.exports=n(0)}]);