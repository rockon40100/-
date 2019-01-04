// JavaScript Document


$(document).ready(function () {
    
/* 滑動捲軸，選單固定最上方
   var altura = $('.logomenuBar').offset().top;
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > altura) {
            $('.logomenuBar').addClass('logomenuBar-fixed');
            $('nav ul ul').addClass('navfixed1');
            $('nav ul ul ul li').addClass('navfixed2');
        } else {
            $('.logomenuBar').removeClass('logomenuBar-fixed');
            $('nav ul ul').removeClass('navfixed1');
            $('nav ul ul ul li').removeClass('navfixed2');
        }
    });
*/

//*****carousel RWD*****
    var RWD = function(){
        var carouselHeight = $(window).width()/3; //抓螢幕高/3為carousel高
        var iconBack = carouselHeight/4; //抓carousel高/5為next,previous的高
        var iconHeight = iconBack; //抓next高為icon的line-height
        $('.carousel_box').css('height',carouselHeight);
        $('.carousel_img').css('height',carouselHeight);
        $('next').css('height',iconBack);
        $('previous').css('height',iconBack);
        $('.next i').css('line-height',iconHeight+'px');
        $('.previous i').css('line-height',iconHeight+'px');
    }
    RWD();
    $(window).resize(function(){
        RWD();
    });
//*****carousel*****
    var current = 0;
    var num = $(".carousel_img").length; //利用長度作上下限控制
    $('#img1').css('opacity',1);
    $(".next").click(function() {    
        var targetId = $(".carousel_img")[current].id; //利用current抓到目前的項目
        current++;
        if (current > num-1){
            current = 0;
            $('#'+targetId).animate({opacity:"0"}, 1000);
            $(".carousel_img").first().animate({opacity:"1"}, 800);
        }
        else{
            $('#'+targetId).animate({opacity:"0"}, 1000);
            $('#'+targetId).next().animate({opacity:"1"}, 800);
        }      
    });
    $(".previous").click(function() {            
        var targetId = $(".carousel_img")[current].id; //利用current抓到目前的項目
        current--;
        if (0 > current){
            current = 3;
            $('#'+targetId).animate({opacity:"0"}, 1000);
            $(".carousel_img").last().animate({opacity:"1"}, 800);
        }
        else{
            $('#'+targetId).animate({opacity:"0"}, 1000);
            $('#'+targetId).prev().animate({opacity:"1"}, 800);
        }       
    });
//*****carousel auto*****
    var mouseCatch = 0; //放在外面避免被刷新，0在外1在內
    var workNum = current; //判斷是否第一次執行
    window.autoCarousel = function(){ 
        
        var targetId = $(".carousel_img")[current].id;        
        $(".carousel").mouseenter(function(){
            mouseCatch = 1;    
        });
        $(".carousel").mouseleave(function(){
            mouseCatch = 0;
        });
        if(mouseCatch==0){ //如果滑鼠在裡面(0)就不執行
            current++;
            if (current > num-1){
                current = 0;
                $('#'+targetId).animate({opacity:"0"}, 2000);
                $(".carousel_img").first().animate({opacity:"1"}, 4000);
            }
            else if (0==workNum){
                $(".carousel_img").first().css('opacity','1'); //第一次執行第一張圖
                workNum++;
                current--;
            }
            else{
                $('#'+targetId).animate({opacity:"0"}, 2000);
                $('#'+targetId).next().animate({opacity:"1"}, 4000);
            } 
        }
        var time = setTimeout("autoCarousel()",5000);
    }
    autoCarousel();


});

//*****page*****

//set
var winwidth = $(window).width(); //螢幕寬
var totalpage = Math.ceil($('.news section').length / 10); //總頁數
var count = 0; //呈現筆數
var page; //呈現按鍵數

if(winwidth<450){
    page = 3; 
}
else{
    page = 5; 
}
var center = (page+1)/2;
var curr = center;
//load page
var loadpage = function(e){
    var i =1;
    var num = e;
    for (i=1;i<=10;i++){
        if (e){
            num = e+i;
            $('.news section:nth-child('+num+')').css('display','block');
        }
        else{
            $('.news section:nth-child('+i+')').css('display','block');
        }
    }
};

//create page button
var pagebutton = function(){
    $('.page li ').remove();
    if (1>=totalpage){
        $('.page').append( "<li><a href='#'' class='active'>1</a></li>");
    }
    else{
        for (i=1;i<=totalpage;i++){
            $('.page').append( "<li><a href='#' name="+i+" >"+i+"</a></li>");
            if (page < $('.page li').length){ //抓多餘按鍵
                $('.page li a[name='+i+']').css('display','none');
            }          
        }        
    }
    $('.page li:first-child a').addClass('active');
        //增加左右箭號
    $('.page li:first-child').before( "<li><a href='#' class='disabled'><i class='icon-angle-double-left'></i></a></li><li><a href='#' class='disabled'><i class='icon-angle-left'></i></a></li>");
    $('.page li:last-child').after( "<li><a href='#'><i class='icon-angle-right'></i></a></li><li><a href='#''><i class='icon-angle-double-right'></i></a></li>");
    iconchange();
    
};
//改變頁碼
var pagenum = function(clicknum){
    $('.active').removeClass('active activedisabled');
    $('.page li a[name='+clicknum+']').addClass('active activedisabled');
    $('.disabled').removeClass('disabled');
    iconchange(clicknum);
    if(clicknum>curr){
        for(i=clicknum-curr;i>=0;i--){
            if(parseInt(clicknum)-i>totalpage-page+center){
                break;
            }
            $('.page li a[name='+(parseInt(clicknum)+page-center-i)+']').css('display','block');
            $('.page li a[name='+(parseInt(clicknum)-page+center-i-1)+']').css('display','none');
        }
    }
    else{
        for(i=curr-clicknum;i>=0;i--){
            if(0>=clicknum-page+center+i){
                break;
            }
            $('.page li a[name='+(parseInt(clicknum)+page-center+i+1)+']').css('display','none');
            $('.page li a[name='+(parseInt(clicknum)-page+center+i)+']').css('display','block');
        }
    }
    curr = parseInt(clicknum);
};

var iconchange = function(clicknum){
    if (clicknum == totalpage){
        $('.icon-angle-right').parent().addClass('disabled');
        $('.icon-angle-double-right').parent().addClass('disabled');
        $('.nextpage').css('display','none');
    }
    else if (clicknum == 1){
        $('.icon-angle-left').parent().addClass('disabled');
        $('.icon-angle-double-left').parent().addClass('disabled');
        $('.nextpage').css('display','block');
    }
    else if (1 == totalpage){
        $('.icon-angle-right').parent().addClass('disabled');
        $('.icon-angle-double-right').parent().addClass('disabled');
        $('.nextpage').css('display','none');
    }
    else{
        $('.disabled').removeClass('disabled');
        $('.nextpage').css('display','block');
    }
}

//改變呈現按鈕數量(page數)
//減少
var decreasePage = function(){
    if($('.active').attr('name')<center){ //抓1,2(小於原初始中間值)
        curr = parseInt($('.active').attr('name'));
        for (i=page;i>page-2;i--){ //消除大於原初始中間值部分
            $('.page li a[name='+i+']').css('display','none');
        }             
    }
    else if (curr>totalpage-page+center){  //大於(總數-間隔)時
        for (i=0;i<=Math.floor(page-center)/2;i++){
            //總數-新page以下的要消除//新page=page-2(奇數按鍵3,5,7...)
            $('.page li a[name='+(totalpage-page+2-i)+']').css('display','none'); 
        }
    }
    else{
        for(i=0;i<Math.floor((page-center)/2);i++){
            $('.page li a[name='+(curr+Math.floor(page-center)+i)+']').css('display','none');
            $('.page li a[name='+(curr-Math.floor(page-center)-i)+']').css('display','none');
        }
    }
    
}

//增加
var increasePage = function(){
    if(curr<center){
        for (i=center;i<=page;i++){
            $('.page li a[name='+(i)+']').css('display','block');
        }
    }
    else if(curr>totalpage-page+center){
        for (i=0;i<=Math.floor(page-center)/2;i++){
            $('.page li a[name='+(totalpage-page+2-i)+']').css('display','block');
        }
    }
    else{
        for(i=curr;i>=curr-page+center;i--){
            $('.page li a[name='+(i+page-center)+']').css('display','block');
            $('.page li a[name='+(i)+']').css('display','block');
        }
    }
};

//執行函數
var runfunction = function(cnt,pgn){
    count = cnt;
    loadpage(cnt);
    pagenum(pgn);
}

loadpage();
pagebutton();
//下一頁
$('.nextpage').click(function(){
    count += 10;
    runfunction(count,count/10+1);
});

//點擊頁碼
$('.page li a').click(function(){
    if(this.name ==''){
        return false;
    }
    $('.news section').css('display','none'); 
    runfunction((this.name-1) *10,this.name);
});
//點擊箭頭
$('.icon-angle-left').click(function(){
    $('.news section').css('display','none');
    runfunction((curr-2)*10,curr-1);    //因為count從0開始所以要多減1
});

$('.icon-angle-double-left').click(function(){
    $('.news section').css('display','none');
    runfunction(0,1);
});

$('.icon-angle-right').click(function(){
    $('.news section').css('display','none');
    count = (count/10+1) *10; //因為curr初始值為3所以不能用curr
    runfunction(count,count/10+1);
});

$('.icon-angle-double-right').click(function(){
    $('.news section').css('display','none');
    runfunction((totalpage-1)*10,totalpage);
});

//響應式450以上5個按鍵450以下3個按鍵
$(window).resize(function(){
    if(winwidth != $(window).width()){
        winwidth = $(window).width();
        if (450<winwidth){
            if (3==page){
                page = 5;
                center = (page+1)/2;
                increasePage();
            }
        }
        else if (450>winwidth){
            if (5==page){
                decreasePage();
                page = 3;
                center = (page+1)/2;
            }
            
        }
    }
});




