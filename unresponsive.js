(function(window) {
    'use strict';
    var Stage = window.Stage = {};

    /**
     * Setup the stage. Must be called only after DOM is loaded.
     * @param {number} width Stage width in px.
     * @param {number} height Stage height in px.
     * @param {string} scaleMode 'exactFit', 'noBorder', 'showAll' or 'noScale'.
     *                           see http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/display/StageScaleMode.html
     * @param {string} align 'B', 'BL', 'BR', 'L', 'R', 'T', 'TL' or 'TR'. Other or no value means center.
     */
    Stage.init = function(width, height, scaleMode, align) {
        Stage.scaleMode = scaleMode;
        Stage.align = align;
        var h = document.documentElement;
        var b = document.body;
        var hs = h.style;
        var bs = b.style;
        var transformProperties = ['webkitTransform', 'msTransform', 'transform'];
        var originProperties = ['webkitTransformOrigin', 'msTransformOrigin', 'transformOrigin'];
        var tp, op, i;
        var last = {};

        for(i=0; i<transformProperties.length; i++) {
            if(hs[transformProperties[i]] !== undefined) tp = transformProperties[i];
            if(hs[originProperties[i]] !== undefined) op = originProperties[i];
        }

        function tick() {
            if(last.width != h.offsetWidth || 
               last.height != h.offsetHeight ||
               Stage.scaleMode != last.scaleMode ||
               Stage.align != last.align) {
                last.width = h.offsetWidth;
                last.height = h.offsetHeight;
                last.scaleMode = Stage.scaleMode;
                last.align = Stage.align;
                var rect = calcRect(width, height, h.offsetWidth, h.offsetHeight, Stage.scaleMode, Stage.align);
                var xScale = rect.width / width;
                var yScale = rect.height / height;
                var transform = 'translate(' + rect.x + 'px,' + rect.y + 'px) scale(' + xScale + ',' + yScale + ')';
                bs[tp] = transform;
            }
        }

        if(tp && op) {
            hs.width = hs.height = '100%';
            hs.overflow = 'hidden';
            bs.width = width + 'px';
            bs.height = height + 'px';
            bs.padding = bs.margin = bs.border = 0;
            bs.position = 'absolute';
            bs[op] = 'left top';
            window.setInterval(tick, 42);
            tick();
        }
    };

    // Adapted from code by alumican.net <Yukiya Okuda> - http://wonderfl.net/c/kF5j
    function calcRect(tw, th, bw, bh, scaleMode, align) {
        var ratio, ratioW, ratioH;
        
        switch(scaleMode) {
        case 'showAll':
        case 'noBorder':
            ratioW = bw / tw;
            ratioH = bh / th;
            ratio  = (scaleMode == 'showAll') ? ((ratioW < ratioH) ? ratioW : ratioH) :
            ((ratioW > ratioH) ? ratioW : ratioH) ;
            tw *= ratio;
            th *= ratio;
            break;
            
        case 'exactFit':
            return { x: 0, y: 0, width: bw, height: bh };
        }
        
        var tx = ( (align == "TL" || align == "L" || align == "BL") ? 0 :
                   (align == "TR" || align == "R" || align == "BR") ? (bw - tw) :
                   (bw - tw) / 2 );
        var ty = ( (align == "TL" || align == "T" || align == "TR") ? 0 :
                   (align == "BL" || align == "B" || align == "BR") ? (bh - th) :
                   (bh - th) / 2 );
        
        return { x: tx, y: ty, width: tw, height: th };
    }
})(window);
