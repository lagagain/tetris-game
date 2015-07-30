/**************************
 * File Name: maxtrix.js
 * Author: Wei ZhiHoung
 * Update date: 2015/7/30
 * Version: 0.01
 * Description: About Maxtrix function.  Using in web.
 ****************************/



 /*********************************
  * 2x2 Maxtrix Struct = (
            (1, 2),
            (3, 4)
            )
  ******************************/

 test_maxtrix = [0, 1];

 function unclockRoto(maxtrix, angle,center_point = [0, 0]){
    var new_maxtrix = [];
    angle = angle * Math.PI / 180;

     /********** change point with center_point **********/
     maxtrix[0] -= center_point[0];
     maxtrix[1] -= center_point[1];
     
    var angle_maxtrix=[
        [Math.sin(angle), Math.cos(angle)],
        [Math.cos(angle), Math.sin(angle)*(-1)]
    ];
     for(var i1 = 0;  i1 < 2;  i1++){
         for(var i2 = 0;  i2 < 2;  i2++){
             angle_maxtrix[i1][i2] = ((angle_maxtrix[i1][i2] * 10000) - ((angle_maxtrix[i1][i2] * 10000) % 1)) / 10000;
             //console.log(i1,i2,":",angle_maxtrix[i1][i2]);
         }
     }
     //console.log(angle_maxtrix);
     
    var y = maxtrix[0];
    var x = maxtrix[1];

    for(var i1 = 0;  i1<2;  i1++){
        new_maxtrix.push(angle_maxtrix[i1][0] * x + angle_maxtrix[i1][1] * y);
    }

    /********* recover point with center_point ***********/
     new_maxtrix[0] += center_point[0];
     new_maxtrix[1] += center_point[1];
     
    return new_maxtrix;
 }