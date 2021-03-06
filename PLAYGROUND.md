
<svg id="svg"></svg>

<script>
var s = Snap("#svg");
s.attr({ viewBox: "0 0 500 200" });

var startx = 50 ;
var starty = 20 ;

var reg1=icsvg_reg(s,{
  x: startx,
  y: starty,
  latch: false,
  size: 50,
  color: "#f00",
  reset: -1,
  triggle: 1,
  d_length: 0,
  q_length: 28,
  ck_to_q: true
}) ;

var reg2=icsvg_reg(s,{
  x: startx+130,
  y: starty,
  size: 50,
  color: "#123456",
  reset: -1,
  latch: false,
  triggle: 1,
  d_length: 28,
  q_length: 0,
  ck_to_q: false,
  type:"synchronizer"
}) ;

var logic1=icsvg_logic(s,{
  x: startx+80,
  y: starty,
  scale: 0.3
});

var buf1=icsvg_repeater(s,{
  x: startx+80,
  y: starty+60,
  size: 18,
  type:"buffer",
  color:"#123456",
  orient:"r0"
});

var buf2=icsvg_repeater(s,{
  x: startx-10,
  y: starty+60,
  size: 9,
  type:"buffer",
  color:"#123456",
  orient:"r270"
});

//console.log(buf1.A.x) ;

var clkp=icsvg_port(s,{
    x: startx-20,
    y: starty+69,
    name: "CLK",
    position:"left",
    color:"#123456",
    size:3
  }) ;

icsvg_connect(s,{
  from:buf2.Z,
  to:reg1.CK,
  dir:"clockwise",
  color:"#123456"
}) ;

icsvg_connect(s, {
  to:clkp.OUT,
  from:buf1.A,
  dir:"clockwise",
  color:"#123456"
}) ;

icsvg_connect(s,{
  from:clkp.OUT,
  to:buf2.A,
  dir:"anticlockwise",
  color:"#123456"
}) ;

icsvg_connect(s,{
  from:buf1.Z,
  to:reg2.CK,
  dir:"anticlockwise",
  color:"#123456"
}) ;

var wave_conf= {
  x:20,
  y:120,
  repeat:10,
  size:10,
  gated: 0,
  duty_cycle:0.3,
  name:"CLK"
}
icsvg_wave_clock(s,wave_conf) ;

wave_conf.y = 150 ;
icsvg_wave_data(s,wave_conf) ;

wave_conf.y = 180 ;
wave_conf.duty_cycle=0.5;
icsvg_wave_clock(s,wave_conf) ;

icsvg_nand(s,{
  x: 250,
  y:50,
  size: 16
});

icsvg_nor(s,{
  x: 290,
  y:50,
  size: 16
});
icsvg_xnor(s,{
  x: 330,
  y:50,
  size: 16
});
icsvg_mux(s,{
  x: 370,
  y:50,
  size: 16
});
var buf1=icsvg_repeater(s,{
  x: 250,
  y: 65,
  size: 16,
  type:"inverter",
  color:"#123456",
  orient:"r0"
});
var btg=icsvg_tg(s,{
  x: 290,
  y: 65,
  size: 16,
  color:"#123456",
  orient:"r0"
});
icsvg_demux(s,{
  x: 330,
  y:80,
  size: 16
});
var buf1=icsvg_ls(s,{
  x: 370,
  y: 65,
  size: 16,
  color:"#123456",
  orient:"r0"
});

var buf1=icsvg_ls_e(s,{
  x: 410,
  y: 35,
  size: 16,
  color:"#123456",
  orient:"r0"
});
var buf1=icsvg_iso(s,{
  x: 410,
  y: 80,
  size: 16
});
//var tmp=s.circle(50,50,2);
//tmp.click(function(){
//  tmp.animate({cx: 90}, 30);
//  //tmp.animate({
//  //      fill: "#00f"
//  //  }, 1500, mina.bounce, function() {
//  //      console.log("animate") ;
//  //  });
//}) ;

</script>

$\huge T\large \scriptstyle arrival \huge = T\large \scriptstyle latency(launch) \huge + T\large \scriptstyle ck\to q \huge + T \large \scriptstyle prop\newline \huge T\large \scriptstyle required \huge = T\large \scriptstyle latency(capture) \huge + T \large \scriptstyle period(l\to c) \huge - T \large \scriptstyle setup\newline \huge T\large \scriptstyle slack\huge = T\large \scriptstyle required \huge - T\large \scriptstyle arrival$

$\huge T\large \scriptstyle latency(launch) \huge + T\large \scriptstyle ck\to q \huge + T \large \scriptstyle prop \huge + T \large \scriptstyle uncertainty \huge <= T\large \scriptstyle latency(capture) \huge + T \large \scriptstyle period(l\to c) \huge - T \large \scriptstyle setup \newline \huge T\large \scriptstyle skew \huge = T\large \scriptstyle latency(capture) \huge - T\large \scriptstyle latency(launch)\newline \huge T\large \scriptstyle ck\to q \huge + T \large \scriptstyle prop \huge <= T\large \scriptstyle skew \huge + T \large \scriptstyle period(l\to c) \huge - T \large \scriptstyle setup$

> [!Note]
> $\Large T \large \scriptscriptstyle period$ means the period from launch clock edge to capture edge.
> 
> That may be one cycle of clock, half or 60% of clock cycle based on duty cycle.
