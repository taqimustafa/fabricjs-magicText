$(window).load(function(){
    var canvas = window._canvas = new fabric.Canvas('c');
    canvas.setWidth($(window).width());
    canvas.setHeight($(window).height()-$('#nav-bar').height());
    canvas.on('object:scaling',function(object){
        object = object.target;
        magicText(text);
    });
    canvas.on('object:modified',function(){
        object = canvas.getActiveObject();
        
        var maxWidth = 0;
        var Things = object.text.split(' ');
        for (var i = 0; i < Things.length; i++) {
            var tempText = new fabric.IText(Things[i], {
                fontSize: text.fontSize,
                textAlign: text.textAlign,
                fontWeight:text.fontWeight,
                fontFamily:text.fontFamily
            });
            maxWidth = Math.max(maxWidth,tempText.width);
        }
        object.set({
            minWidth:maxWidth
        });

        object.setCoords();
        canvas.calcOffset();
        canvas.renderAll();
    });
    canvas.on('text:changed',function(object){
        object = object.target;
        var maxWidth = 0;
        var Things = object.text.split(' ');
        for (var i = 0; i < Things.length; i++) {
            var tempText = new fabric.IText(Things[i], {
                fontSize: text.fontSize,
                textAlign: text.textAlign,
                fontWeight:text.fontWeight,
                fontFamily:text.fontFamily
            });
            maxWidth = Math.max(maxWidth,tempText.width);
        }
        var tempText = new fabric.IText(object.text, {
            fontSize: object.fontSize,
            textAlign: object.textAlign,
            fontWeight:object.fontWeight,
            fontFamily:object.fontFamily
        });
        object.set({
            width:tempText.width + object.fontSize,
            height:tempText.height + object.fontSize,
            minWidth:maxWidth + object.fontSize
        });
        canvas.renderAll();
    });
    var title = "FUN & EASY";
    var text = new fabric.Textbox(title, {
        minWidth:100,
        fontSize: 30,
        textAlign: 'center',
        fontWeight:100,
        fontFamily:'Roboto'
    });
    var maxWidth = 0;
    var Things = title.split(' ');
    for (var i = 0; i < Things.length; i++) {
        var tempText = new fabric.IText(Things[i], {
            fontSize: text.fontSize,
            textAlign: text.textAlign,
            fontWeight:text.fontWeight,
            fontFamily:text.fontFamily
        });
        maxWidth = Math.max(maxWidth,tempText.width);
    }
    var tempText = new fabric.IText(title, {
        fontSize: text.fontSize,
        textAlign: text.textAlign,
        fontWeight:text.fontWeight,
        fontFamily:text.fontFamily
    });
    text.set({
        width:tempText.width + tempText.fontSize,
        height:tempText.height+tempText.fontSize,
        minWidth:maxWidth + tempText.fontSize
    });
    text.setShadow({
        blur:3,
        offsetX:1,
        offsetY:1,
        color:'#333',
    });
    canvas.add(text);
    canvas.centerObject(text);
    magicText(text);
    text.setCoords();
    canvas.calcOffset();
    canvas.renderAll();
    
    function magicText(object){
        if(object.type === "textbox" ){
            object.setCoords();
            var totalCounter = 0;
            var maxWidth = 0;
            for (var i = 0; i < object._textLines.length; i++) {
                var text = new fabric.IText(object._textLines[i], {
                    fontSize: object.fontSize,
                    textAlign: object.textAlign,
                    fontWeight:object.fontWeight,
                    fontFamily:object.fontFamily
                });
                maxWidth = Math.max(maxWidth,text.width);
            }
            var maxWidth = object.width;
            for (var i = 0; i < object._textLines.length; i++) {
                var characters = object._textLines[i].length;
                var text = new fabric.IText(object._textLines[i], {
                    fontSize: object.fontSize,
                    textAlign: object.textAlign,
                    fontWeight:object.fontWeight,
                    fontFamily:object.fontFamily
                });
                var width = text.width;
                var newFont = object.fontSize*(maxWidth/width);
                var style = {
                    fontSize:newFont
                };
                var style1 = {
                    fontSize:0,
                };
                object.setSelectionStart(totalCounter);
                object.setSelectionEnd(totalCounter+characters);
                object.setSelectionStyles(style);
                console.log(totalCounter+characters,object.text.length);
                if(i !== object._textLines.length-1){
                    object.setSelectionStart(totalCounter+characters-1);
                    object.setSelectionEnd(totalCounter+characters);
                    object.setSelectionStyles(style1);
                }
                canvas.renderAll();
                totalCounter = characters + totalCounter;
            }
        }
        canvas.renderAll();
    }
});
