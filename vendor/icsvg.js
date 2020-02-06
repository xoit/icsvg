function icsvg_reg(s,conf={}) {
  if (false) {
    var conf_sample={
      x: 160,
      y: 20,
      size: 50,
      color: "#123456",
      reset: -1,
      latch: true,
      triggle: 0,
      d_length: 28,
      q_length: 0,
      ck_to_q: true
    } ;
    console.log(conf_sample) ;
    return ;
  }
  var rtn={
    D: {
      x:0,
      y:0
    },
    Q: {
      x:0,
      y:0
    },
    CK: {
      x:0,
      y:0
    },
    SI: {
      x:0,
      y:0
    },
    SO: {
      x:0,
      y:0
    },
    RST: {
      x:0,
      y:0
    }
  };
  // argumnets: inst,loc_x,loc_y,size,element_color,positive/negative,latch,reset,long_d_pin,long_q_pin
  var x=conf.x ;
  var y=conf.y ;
  var size=conf.size ;
  var ecolor=conf.color ;
  var neg=conf.triggle ;
  var latch=conf.latch ;
  var reset = conf.reset ;
  var longd = conf.d_length ;
  var longq = conf.q_length ;
  var ckq = conf.ck_to_q ;
  // get the width and height of register
  var w = size * 0.6 ;
  var h = size ;
  // draw the rectangle of register
  var r = s.rect(x,y,w,h,3,3).attr({ stroke: ecolor, 'strokeWidth': 2, fill: 'white', 'opacity': 1 });
  r.data("ckq_visible",true) ;
  // draw the clock symbol for register
  var cx1= x ;
  var cy1= y+size-10 ;
  var cx2= cx1 + 3 ;
  var cy2= cy1 + 3 ;
  var cx3=cx1 ;
  var cy3=cy2+3 ;
  var fs= parseInt(size*0.6*8/30) ;
  if (! latch) {
    var p = s.path("M"+cx1+" "+cy1+"L"+cx2+" "+cy2+"L"+cx3+" "+cy3).attr({ stroke: ecolor, fill: 'white'});
  }
  // draw the circle for negative pos
  var lx1 = x -5  ;
  var ly = cy2 ;
  var lx2 = x ;
  var lck = s.path("M"+lx1+" "+ly+"L"+lx2+" "+ly).attr({ stroke: ecolor, fill: 'white'});
  rtn.CK.x=lx1 ;
  rtn.CK.y=ly ;
  var rx=lx2-1;
  if (neg) {
    var rck=s.circle(rx,ly,1).attr({ stroke: ecolor, fill: 'white'});
  }
  // add text for CK/D/Q
  var tx = x + 3 ;
  var ty = y + size - 9;
  var fs_ck = fs - 2 ;
  var ck = s.text(tx,ty,"CK").attr({"font-size": fs_ck+'px', color: ecolor});
  var ckq_x1=tx+fs_ck ;
  var ckq_y1=ty-fs_ck ;
  var tx = x + 2 ;
  var ty = y + fs + 2 ;
  var d = s.text(tx,ty,"D").attr({"font-size": fs+'px', color: ecolor}) ;
  var ly = parseInt(ty - fs / 2 + 1) ;
  var ld = s.path("M" + (lx1 -longd) + " " + ly + "L" + lx2 + " " + ly).attr({ stroke: ecolor, fill: 'white'});
  rtn.D.x=lx1-longd ;
  rtn.D.y=ly ;
  var tx = x + size*0.6 - fs ;
  var q = s.text(tx,ty,"Q").attr({"font-size": fs+'px', color: ecolor}) ;
  // add ck->q symbol
  var ckq_x3 = tx + 1 ;
  var ckq_y3 = ty + 2 ;
  var ckq_x2 = ckq_x1 + 8 ;
  var ckq_y2 = ckq_y1 -8 ;
  if (ckq) {
    var ckq = s.path("M"+ckq_x1+" "+ckq_y1+" Q "+ ckq_x2 + " " + ckq_y2 + " " + ckq_x3 + " "+ ckq_y3).attr({ stroke: ecolor, fill: 'white'});
    var tckq_x = (ckq_x1+ckq_x2)/2 - 2 ;
    var tckq_y = (ckq_y1+ckq_y2)/2
    var tckq = icsvg_text(s,tckq_x,tckq_y,fs,"T","ckq");
  }
  // add reset symbol and text
  var lx1=x+w ;
  var lx2=lx1+5;
  var lq = s.path("M"+lx1+" "+ly+"L"+(lx2+longq)+" "+ly).attr({ stroke: ecolor, fill: 'white'});
  var rx=x+w/2 ;
  var ry=y+h+1 ;
  if (! reset) {
    var r=s.circle(rx,ry,1).attr({ stroke: ecolor, fill: 'white'});
    var fs_rst = fs - 3 ;
    var rt=s.text(rx-fs_rst/2,ry-3,"rst").attr({"font-size": fs_rst+'px', color: ecolor}) ;
  }
  r.dblclick(function(){
    if (this.data("ckq_visible")) {
      ckq.attr({display:"none"}) ;
      r.data("ckq_visible",false) ;
    } else {
      ckq.attr({display:"block"}) ;
      r.data("ckq_visible",true) ;
    }
  });
  return rtn ;
}
function icsvg_logic(s,conf) {
  var x=conf.x ;
  var y=conf.y ;
  var r=conf.scale ;
  // draw a cloud shape for logic clustter
  var sx=x+30*r ;
  var sy=y-30*r ;
  var c= s.path("m "+sx+","+sy+" c "+(-13.13226*r)+",0 "+(-24.36476*r)+","+(8.75504*r)+" "+(-28.93874*r)+","+(21.15325*r)+" "+(-3.28364*r)+","+(-1.44879*r)+" "+(-6.92847*r)+","+(-2.22341*r)+" "+(-10.75425*r)+","+(-2.22341*r)+" "+(-12.89656*r)+","+(0*r)+" "+(-23.63069*r)+","+(9.13525*r)+" "+(-25.97782*r)+","+(21.24589*r)+" "+(-1.65257*r)+","+(-0.41046*r)+" "+(-3.38524*r)+","+(-0.61761*r)+" "+(-5.16763*r)+","+(-0.61761*r)+" "+(-11.60557*r)+","+(0*r)+" "+(-21.00571*r)+","+(9.25452*r)+" "+(-21.00571*r)+","+(20.65917*r)+" "+(0*r)+","+(11.40463*r)+" "+(9.40014*r)+","+(20.65915*r)+" "+(21.00571*r)+","+(20.65915*r)+" "+(3.64942*r)+","+(0*r)+" "+(7.09323*r)+","+(-0.92418*r)+" "+(10.08387*r)+","+(-2.53221*r)+" "+(5.16209*r)+","+(5.17569*r)+" "+(13.54997*r)+","+(8.55395*r)+" "+(23.01689*r)+","+(8.55395*r)+" "+(7.62527*r)+","+(0*r)+" "+(14.53429*r)+","+(-2.1895*r)+" "+(19.637*r)+","+(-5.74381*r)+" "+(4.38513*r)+","+(4.59567*r)+" "+(10.52222*r)+","+(7.44224*r)+" "+(17.31853*r)+","+(7.44224*r)+" "+(8.83023*r)+","+(0*r)+" "+(16.54937*r)+","+(-4.81872*r)+" "+(20.75434*r)+","+(-12.01257*r)+" "+(2.8951*r)+","+(1.62824*r)+" "+(6.16573*r)+","+(2.56308*r)+" "+(9.609*r)+","+(2.56308*r)+" "+(12.0354*r)+","+(0*r)+" "+(21.78783*r)+","+(-11.17098*r)+" "+(21.78783*r)+","+(-24.95156*r)+" "+(0*r)+","+(-13.27227*r)+" "+(-9.05524*r)+","+(-24.10728*r)+" "+(-20.475*r)+","+(-24.88982*r)+" "+(-1.93417*r)+","+(-16.53022*r)+" "+(-15.03339*r)+","+(-29.30574*r)+" "+(-30.89402*r)+","+(-29.30574*r)+" z").attr({"fill":"#cccccc","fill-opacity":1,"stroke":"#cccccc","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":4,"stroke-opacity":1,"stroke-dasharray":"none","stroke-dashoffset":0});
  var c= s.path("m "+sx+","+sy+" c "+(-13.13226*r)+","+(0*r)+" "+(-24.36476*r)+","+(8.75504*r)+" "+(-28.93874*r)+","+(21.15325*r)+" "+(-3.28364*r)+","+(-1.44879*r)+" "+(-6.92847*r)+","+(-2.22341*r)+" "+(-10.75425*r)+","+(-2.22341*r)+" "+(-12.89656*r)+","+(0*r)+" "+(-23.63069*r)+","+(9.13525*r)+" "+(-25.97782*r)+","+(21.24589*r)+" "+(-1.65257*r)+","+(-0.41046*r)+" "+(-3.38524*r)+","+(-0.61761*r)+" "+(-5.16763*r)+","+(-0.61761*r)+" "+(-11.60557*r)+","+(0*r)+" "+(-21.00571*r)+","+(9.25452*r)+" "+(-21.00571*r)+","+(20.65917*r)+" "+(0*r)+","+(11.40463*r)+" "+(9.40014*r)+","+(20.65915*r)+" "+(21.00571*r)+","+(20.65915*r)+" "+(3.64942*r)+","+(0*r)+" "+(7.09323*r)+","+(-0.92418*r)+" "+(10.08387*r)+","+(-2.53221*r)+" "+(5.16209*r)+","+(5.17569*r)+" "+(13.54997*r)+","+(8.55395*r)+" "+(23.01689*r)+","+(8.55395*r)+" "+(7.62527*r)+","+(0*r)+" "+(14.53429*r)+","+(-2.1895*r)+" "+(19.637*r)+","+(-5.74381*r)+" "+(4.38513*r)+","+(4.59567*r)+" "+(10.52222*r)+","+(7.44224*r)+" "+(17.31853*r)+","+(7.44224*r)+" "+(8.83023*r)+","+(0*r)+" "+(16.54937*r)+","+(-4.81872*r)+" "+(20.75434*r)+","+(-12.01257*r)+" "+(2.8951*r)+","+(1.62824*r)+" "+(6.16573*r)+","+(2.56308*r)+" "+(9.60899*r)+","+(2.56308*r)+" "+(12.03541*r)+","+(0*r)+" "+(21.78784*r)+","+(-11.17098*r)+" "+(21.78784*r)+","+(-24.95156*r)+" "+(0*r)+","+(-13.27227*r)+" "+(-9.05524*r)+","+(-24.10728*r)+" "+(-20.475*r)+","+(-24.88982*r)+" "+(-1.93417*r)+","+(-16.53022*r)+" "+(-15.03339*r)+","+(-29.30574*r)+" "+(-30.89402*r)+","+(-29.30574*r)+" z").attr({"fill":"#ffffff","fill-opacity":1,"stroke":"#000000","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":4,"stroke-opacity":1,"stroke-dasharray":"none","stroke-dashoffset":0});
  var fs=20*r ;
  var t=s.text((sx-40*r),(sy+60*r),"Logic").attr({"font-size": fs+'px', color: '#123456'}) ;;
}
  
function icsvg_text (s,x,y,size,tmain,tsub="") {
  var fs = size ;
  var tmain = s.text(x,y,tmain).attr({"font-size": fs+"px"}) ;
  var tsub_x = parseInt(x + fs*0.5) + 0.5 ;
  var tsub_y = y ;
  var tsub_fs = parseInt(fs/2) ;
  var tsub = s.text(tsub_x,tsub_y,tsub).attr({"font-size": tsub_fs+"px"}) ;
}

function icsvg_clock(s,x,y,period,h) {
  var period=conf.period ;
  var x=conf.x ;
  var y=conf.y ;
  var duty_cycle=conf.duty_cycle;
}

function icsvg_repeater(s,conf) {
  var rtn={
    A: {
      x:0,
      y:0
    },
    Z: {
      x:0,
      y:0
    }
  };
  var x=conf.x ;
  var y=conf.y ;
  var size=conf.size ;
  var type=conf.type ;
  var ecolor=conf.color ;
  var orient=conf.orient ;
  var x2=x+0.866*size ;
  var y2=y+0.5*size ;
  var x3=x ;
  var y3=y+size ;
  var lx=x ;
  var ly=y+0.5*size ;
  var lx2=lx-5 ;
  var ly2=ly ;
  var l1=s.path("M "+lx+ " "+ly+" L "+lx2+" "+ly2).attr({ stroke: ecolor, fill: 'white'}) ;
  var lx=x2 ;
  var ly=y2 ;
  var lx2=lx+5 ;
  var ly2=ly ;
  var l2=s.path("M "+lx+ " "+ly+" L "+lx2+" "+ly2).attr({ stroke: ecolor, fill: 'white'}) ;
  var l3=s.path("M "+x+" "+y+ " L "+x2+" "+y2+" L "+x3+" "+y3+" L "+x+" "+y).attr({ stroke: ecolor, fill: 'white'});
  if (type=="inverter") {
    s.circle(x2,y2,1).attr({ stroke: ecolor, fill: 'white'});
  }
  l1.transform( orient+','+x+','+y );
  l2.transform( orient+','+x+','+y );
  l3.transform( orient+','+x+','+y );
  bbox=l1.getBBox() ;
  rtn.A.x=bbox.cx ;
  rtn.A.y=bbox.cy ;
  bbox=l2.getBBox() ;
  rtn.Z.x=bbox.cx ;
  rtn.Z.y=bbox.cy ;
  return rtn ;
}

function icsvg_connect(s,conf) {
  var x1 = conf.from.x ;
  var y1 = conf.from.y ;
  var x2 = conf.to.x ;
  var y2 = conf.to.y ;
  var dir = conf.dir ;
  var ecolor=conf.color ;
  if (dir=="clockwise") {
    if (x1>x2) {
      var x=x2 ;
      var y=y1 ;
    } else {
      var x=x1 ;
      var y=y2 ;
    }
  } else {
    if (x1<x2) {
      var x=x2 ;
      var y=y1 ;
    } else {
      var x=x1 ;
      var y=y2 ;
    }    
  }
  s.path("M "+x1+" "+y1+" L "+x+" "+y+" L "+x2+" "+y2).attr({ stroke: ecolor, fill: 'white',"fill-opacity":0}); ;
}