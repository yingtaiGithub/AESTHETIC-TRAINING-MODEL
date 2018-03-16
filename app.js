$( document ).ready(function() {
    $('#before_generation > .generate').click(function(){
        var model_number = localStorage['model_number']
        if (!model_number) {
            model_number = 0
        }

        $("#graph").empty();
        var width = $("#graph").width();
        var height = $("#graph").height();

        var sketch = function( p ) {
            var points = 10;

            var font_dismetcha;
            var font_simplon;
            p.preload = function() {
                font_dismetcha = p.loadFont('font/dismecha.ttf');
                font_simplon = p.loadFont('font/simplon-mono-regular.ttf');
            }

            p.setup = function() {
                var canvas = p.createCanvas(width, height);
                canvas.parent("graph");
                p.background(255);

                p.fill(0);
                p.beginShape();
                for(var i = 0; i < points; i++) {
                    var x = p.random(20, width-20);
                    var y = p.random(20, height*0.8);
                    p.vertex(x, y);
//                    p.text(i, x, y)
                }
                p.endShape(p.CLOSE);

                p.stroke(0);
                p.strokeWeight(4)
                p.line(width/2, 0, width/2, 20);
                p.line(width/2, height, width/2, height-20);
                p.line(0, height/2, 20, height/2);
                p.line(width, height/2, width-20, height/2);

                var text1 = "MACHINE   LEARNING"
                var text2 = "AESTHETIC TRAINING"
                var text3 = "MODEL : " + pad(parseInt(model_number), 10)
                localStorage['model_number'] = (parseInt(model_number) + 1).toString();

                p.strokeWeight(0)
                p.textSize(15)
                p.textFont(font_simplon)
                for (var i=0; i<text1.length; i++) {
                    p.text(text1[i], width/2 + i*11, height*0.85)
                    p.text(text2[i], width/2 + i*11, height*0.85 + 20)
                    p.text(text3[i], width/2 + i*11, height*0.85 + 40)
                }

                var text_size = height*0.13;
                var letter_spacing = 5;
                var line_spacing = 5
                var title_text = "AUTOGRAPHIC"
                p.strokeWeight(5)
                p.textSize(text_size)
                p.textFont(font_dismetcha)
                var index = 0

//                p.fill(204, 101, 192, 127);
//                p.rect(10, 10, 10, 10);
//                p.stroke(204, 101, 192, 127);

                for (y=30; y<height-text_size-30; y+=20){
                    above_exist = false
                    for (x=30; x<width-20-text_size; x+=20) {
                        var placable = true;
                        for (x1=x; x1<x+text_size; x1+=3) {
                            var pixel = p.get(x1, y);
//                            console.log(x1, y)
//                            console.log(pixel)
                            if (pixel[0] == 0){
                                placable = false;
                                break;
                            }

                            var pixel = p.get(x1, y+text_size);
//                            console.log(x1, y+text_size)
//                            console.log(pixel)
                            if (pixel[0] == 0){
                                placable = false;
                                break;
                            }
                        }

                        for (y1=y; y1<y+text_size; y1+=5) {
                            var pixel = p.get(x, y1);
//                            console.log(x1, y)
//                            console.log(pixel)
                            if (pixel[0] == 0){
                                placable = false;
                                break;
                            }


                        if (placable) {
//                            console.log(x,y)
                            p.text(title_text[index], x, y+text_size);
                            index += 1;

                            if (title_text[index] == "C" || title_text[index] == "I" ) {
                                x = x + text_size*0.1;
                            } else {
                                x = x + text_size + letter_spacing;
                            }
                            above_exist = true;

                            if (index == title_text.length) {
                                x = width;
                                y = height;
                            }
                        }
                    }

                    if (above_exist){
                        y = y + text_size - 20;
                    }
                }


            };
        };
        var myp5 = new p5(sketch);

        setTimeout(function(){
            $("#before_generation").css('display', 'none');
            $("#after_generation").css('display', 'block');
            $("#click_text").css('display', 'block');
        }, 1500);
    })

    $('.stretch').each(function(){
        $(this).strech_text();
    });

    $("#after_generation > .description").click(function() {
        $("#before_generation").css('display', 'block');
        $("#after_generation").css('display', 'none');
        $("#click_text").css('display', 'none');
        $("#graph").empty();
    });

    $("#click_text").click(function() {
        var c=document.getElementById("defaultCanvas0");
        var d=c.toDataURL("image/png");
        var w=window.open('about:blank','image from canvas');
        w.document.write("<img src='"+d+"' alt='from canvas' width='842' height='1191'/>");
    })
});

$.fn.strech_text = function(){
    var elmt          = $(this),
        cont_width    = elmt.width(),
        txt           = elmt.html(),
        one_line      = $('<span class="stretch_it">' + txt + '</span>'),
        nb_char       = elmt.text().length,
        spacing       = cont_width/nb_char,
        txt_width;

    elmt.html(one_line);
    txt_width = one_line.width();

    if (txt_width < cont_width){
        var  char_width     = txt_width/nb_char,
             ltr_spacing    = spacing - char_width + (spacing - char_width)/nb_char ;

        one_line.css({'letter-spacing': ltr_spacing});
    } else {
        one_line.contents().unwrap();
        elmt.addClass('justify');
    }
};

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}