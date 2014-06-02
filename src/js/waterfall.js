/**
 * Created with JetBrains WebStorm.
 * User: kellen
 * Date: 14-6-2
 * Time: 下午5:10
 * To change this template use File | Settings | File Templates.
 */
;(function($){
    var defaultOptions = {
        numOfcol:5,
        offsetX:5,
        offsetY:5,
        childEle:"div"
    };
    var container,blockarr,colWidth;
    var createBlockArr = function(){
        var block;
        blockarr = [];
        for(var i=0;i<defaultOptions.numOfcol;i++){
            block = {
                x:i,
                endY:defaultOptions.offsetY
            }
            blockarr.push(block);

        }
    }
    var getPosition = function(){
        var block,i,tmp = {
            x:0,
            y:blockarr[0].endY,
            maxHeight:0
        };
        for(i=0;i<blockarr.length;i++){
            block = blockarr[i];
            if(tmp.y>block.endY){
                tmp.y = block.endY;
                tmp.x = block.x;
            }
            if(tmp.maxHeight<block.endY){
                tmp.maxHeight = block.endY;
            }

        }
        return tmp;
    }

    var setPosition = function(obj,index){
        var pos = getPosition();
        var blockWidth = colWidth - (obj.outerWidth()-obj.width());
        obj.css({
            position:"absolute",
            left:pos.x * colWidth,
            top:pos.y,
            width:blockWidth-2*defaultOptions.offsetX
        });
        var blockHeight = obj.outerHeight()+defaultOptions.offsetY;
        blockarr[pos.x].endY += blockHeight;

    }
    $.fn.waterFall = function(options){
        if(options&&typeof options=='object'){
            $.extend(defaultOptions,options);

        }
        container = $(this);
        colWidth = container.width()/defaultOptions.numOfcol;

        createBlockArr();
        container.children(defaultOptions.childEle).each(function(index){
            setPosition($(this),index);
        });

        //set container height
        var pos = getPosition();
        container.height(pos.maxHeight+defaultOptions.offsetY);
        return this;


    };
})(jQuery);