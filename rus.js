/************************************************
 * Name:rus.js
 * Update Date: 2015/7/25
 * Author: Wei ZhiHoung
 * Vertion: 0.02
 ************************************************/
// it is start to a event that is window.onload
// window.onload will setting value to val
// Then, it will call init() which is a function
// ///////////////////
// newMainGroundObj(ground) only use once when main_ground get value


    
/**********************
/*  set var
/**********************/
/******** var ground *********/
var play_ground;
var main_ground;
var preview_ground;
var skip_ground;
/****** var block_maxia ******/
var main_ground_maxia;
var preview_ground_maxia;
var skip_ground_maxia;
/******* var raws & cols **************/
var main_ground_raws;
var main_ground_cols;
/******** setting const var **************/
const max_height = 15;
const sum_cols = 12;
const block_types = ["square",
                     "blue_L",
                     "orange_L",
                     "straight"]
/******** var obj *****************/
var main_ground_obj;
var preview_ground_obj;
var skip_ground_obj;

/***************************************
 * init when window loaded (get var value)
 ***************************************/
window.onload=function(){
    /*********** init var *************/
    /*********** init ground **********/
    play_ground=document.getElementById("play_ground");
    //console.log(document);
    //console.log(play_ground);
    main_ground=document.getElementById("main_ground");
    //console.log(main_ground);
    skip_ground=document.getElementById("skip_ground");
    //console.log(skip_ground);
    preview_ground = document.getElementById("preview_ground");
    //console.log(preview_ground);
    /********* init maxia ************/
    skip_ground_maxia=skip_ground.getElementsByTagName("td");
    //console.log(skip_ground_maxia);
    main_ground_maxia=main_ground.getElementsByTagName("td");
    //console.log(main_ground_maxia);
    preview_ground_maxia=preview_ground.getElementsByTagName("td");
    //console.log(preview_ground_maxia);
    /********** set cols & raws **************/
    // main_ground_cols=[];
    // main_ground_raws=[];
    // for(var i=0; i<main_ground_maxia.length; i++){
    //     main_ground_cols=0;
    //     main_ground_raws=0;
    //}
    /************ get main_ground_obj *******************/
    main_ground_obj = newMainGroundObj(main_ground_maxia);
    /************ get other groundObj *******************/
    preview_ground_obj = new GroundObj(preview_ground_maxia, 4);
    skip_ground_obj = new GroundObj(skip_ground_maxia, 4);
    /************ run the init() **************/
    init();
}

/***********************
 * init game setting
 ***********************/
function init(){
    test_block=preview_ground_maxia;
    for(var index in test_block){
        //test_block[index].setAttribute("class","red");
        test_block[index].setAttribute("class","block blue");
        //console.log(test_block[index]);
    }
}
    
/************************************
 * function name: newMainGroundObj
 * input: ground //it is the ground where this obj
 * output: GroundObj
 **************************************/
 // ## the object have #
 // ### value #
 // - raws2d
 // - cols2d
 // - ~~raws_cnt~~
 // - ~~cols_cnt~~
 // ### function #
 // getBlock(y,x)
 // getIndex(y,x)
 // getPoint(index)
 // getColsCnt(index)
 // getRawsCnt(index)
 // addRawsCnt(index,times=1)
 // addColsCnt(index,times=1)
 // checkPoints(point_list);
function newMainGroundObj(ground){
    /******* var varable ********/
    var raws2d = [];
    var cols2d = [];
    var cols2d_cnt = [];
    var raws2d_cnt = [];
    /*********** make space to cols2d & init cols2d_cnt **********/
    for(var i=0; i<sum_cols;i++){
        cols2d.push([]);
        cols2d_cnt.push(0);
    }
    /*********** make space to raws2d init raws2d_cnt **********/
    for(var i=0; i<max_height + 2; i++){
        raws2d.push([]);
        raws2d_cnt.push(0);
    }
    /*********** push tag element to raws2d & cols2d **********/
    for(var i = 0;  i < ground.length;  i++){
        var the_col = i % sum_cols;
        var the_raw = (i - the_col) / sum_cols;
        //console.log(the_col,the_raw);
        cols2d[the_col].push(ground[i]);
        raws2d[the_raw].push(ground[i]);
    }
    function obj(){
        var ground_obj={};
        ground_obj.width = sum_cols;
        ground_obj.cols2d=cols2d;
        ground_obj.raws2d=raws2d;
        // ground_obj.cols_cnt=0;
        // ground_obj.raws_cnt=0;
        ground_obj.getBlock=function(y, x){
            /*******************************
             * method name: getBlock(y,x)
             * description: it will return the element which is sitting (y, x) in the ground.  The y & x is start from 0.
             * input: y, x
             * output: tag element
             *****************************/
            var index = (y * sum_cols) + x;
            return ground[index];
        }
        ground_obj.getGround=function(){
            /*******************************
             * method name: getGround()
             * description: 
             * output: the ground
             *****************************/
            return ground;
        }
        ground_obj.getIndex=function(y, x){
            /*******************************
             * method name: getIndex(y,x)
             * description: it will return the index of the element which is sitting (y, x) in the ground.  The y & x is start from 0.
             * input: y, x
             * output: tag element
             *****************************/
            var index = (y * sum_cols) + x;
            return index;
        }
        ground_obj.getPoint=function(index){
            /*******************************
             * method name: getPoint(index)
             * description: it will return (y, x) of the element which Index is input index in this ground.  Input index start from 0.
             * input: index
             * output: [y, x]
             *****************************/
            var x = index % sum_cols;
            var y = (index - x) / sum_cols;
            return [y, x];
        }
        
        ground_obj.getColsCnt=function(index){
            /******************************
             * method name: getColsCnt(index)
             * description: it return cols2d_cnt[index]
             * input: index
             * output: cnt	//how many block in cols2d[index]
             ******************************/
            return cols2d_cnt[index];
        }
        ground_obj.getRawsCnt=function(index){
            /******************************
             * method name: getRawsCnt(index)
             * description: it return raws2d_cnt[index]
             * input: index
             * output: cnt	//how many block in raws2d[index]
             ******************************/
            return raws2d_cnt[index];
        }
        ground_obj.addRawsCnt=function(index, times=1){
            /******************************
             * method name: addRawsCnt(index, times)
             * description: It plus raws2d_cnt[index] with times
             * input: (index,
             		times)
             * output: None
             ******************************/
            raws2d_cnt[index]+=times;
        }
        ground_obj.addColsCnt=function(index, times=1){
            /******************************
             * method name: addColsCnt(index, times)
             * description: It plus cols2d_cnt[index] with times
             * input: (index,
             		times)
             * output: None
             ******************************/
            cols2d_cnt[index]+=times;
        }
        ground_obj.checkPoints=function(point_list){
            /******************************
             * method name: checkPoints(point_list)
             * description: The method check point can move to.
             * input: point_list // a [y, x] list
             * output: True or Faluse
             ******************************/
            for(var i = 0;  i < point_list.length;  i++){
                var get_index = this.getIndex(point_list[i][0],point_list[i][1]);
                var className = ground[get_index].className;
                if(className.match("block")){
                    return false;
                }
            }
            return true;
        }
        
        
        return ground_obj;
    }
    return obj();
}

/************************************
 * object name: GroundObg
 * input: ground_maxtrix, //it is the ground where this obj 
         width
 * output: GroundObj
 **************************************/
 // ## the object have #
 // ### value #
 // ### function #
 // getBlock(y,x)
 // getIndex(y,x)
 // getPoint(index)
 // checkPoints(point_list);
function GroundObj(ground_maxtrix, width){
    /******* var varable ********/
    this.ground = ground_maxtrix;
    this.width = width;
    this.getBlock=function(y, x){
        /*******************************
         * method name: getBlock(y,x)
         * description: it will return the element which is sitting (y, x) in the ground.  The y & x is start from 0.
         * input: y, x
         * output: tag element
         *****************************/
        var index = (y * width) + x;
        return ground_maxtrix[index];
    }
    this.getGround=function(){
        /*******************************
         * method name: getGround()
         * description: 
         * output: the ground
         *****************************/
        return this.ground;
    }
    this.getIndex=function(y, x){
        /*******************************
         * method name: getIndex(y,x)
         * description: it will return the index of the element which is sitting (y, x) in the ground.  The y & x is start from 0.
         * input: y, x
         * output: tag element
         *****************************/
        var index = (y * width) + x;
        return index;
    }
    this.getPoint=function(index){
        /*******************************
         * method name: getPoint(index)
         * description: it will return (y, x) of the element which Index is input index in this ground.  Input index start from 0.
         * input: index
         * output: [y, x]
         *****************************/
        var x = index % width;
        var y = (index - x) / width;
        return [y, x];
    }
    
    this.checkPoints=function(point_list){
        /******************************
         * method name: checkPoints(point_list)
         * description: The method check point can move to.
         * input: point_list // a [y, x] list
         * output: True or Faluse
         ******************************/
        for(var i = 0;  i < point_list.length;  i++){
            var get_index = this.getIndex(point_list[i][0],point_list[i][1]);
            var className = ground[get_index].className;
            if(className.match("block")){
                return false;
            }
        }
        return true;
    }
    
}


/************************************
 * object name: blockObj
 * 
 * 
 **************************************/
 function blockObj(type="straight",ground=main_ground_obj,position=null){
     /********** varable in function *****************/
     var ground_width = ground.width;
     if (ground === preview_ground_obj || ground === skip_ground_obj){
         ground_width = 4;
     }
     var start_position = ground_width / 2;
     /********* the object's varable *************/
     this.center_point = [3,start_position];
     this.type = type;
     this.way = this.way_map["front"];
     this.position=[0,0,0,0];
     this.ground_obj = ground;
     this.ground = ground.getGround();
     this.ground_width = ground_width;
     this.class = "block";	//add another later
     /********** init object position **************/
     switch(type){
         case "square":
            this.position[0] = ground.getIndex(2,start_position - 1);
            this.position[1] = ground.getIndex(2,start_position);
            this.position[2] = ground.getIndex(3,start_position - 1);
            this.position[3] = ground.getIndex(3,start_position);
            this.class += " green";
                 break;
         case "blue_L":
                 this.position[0] = ground.getIndex(1,start_position - 1);
                 this.position[1] = ground.getIndex(2,start_position - 1);
                 this.position[2] = ground.getIndex(3,start_position - 1);
                 this.position[3] = ground.getIndex(3,start_position);
                 this.class += " dark_blue";
                 break;
         case "orange_L":
                 this.position[0] = ground.getIndex(1,start_position);
                 this.position[1] = ground.getIndex(2,start_position);
                 this.position[2] = ground.getIndex(3,start_position);
                 this.position[3] = ground.getIndex(3,start_position - 1);
                 this.class += " orange";
                 break;
         case "straight":
                 this.position[0] = ground.getIndex(1,start_position);
                 this.position[1] = ground.getIndex(2,start_position);
                 this.position[2] = ground.getIndex(3,start_position);
                 this.position[3] = ground.getIndex(4,start_position);
                 this.class += " blue";
                 break;
         
     }

     /********** make the object visiable ************/
     for(var index in this.position){
         this.ground[this.position[index]].setAttribute("class",this.class);
     }
 }
 /******************************
  * blockObj's method: left(skip_cnt)
  * description: move block left skip_cnt times
  * input: skip_cnt = 1
  ******************************/
 blockObj.prototype.left = function(skip_cnt=1){
     var ground_obj = this.ground_obj;
     var ground = this.ground;
     var point_list = [];
     var new_point_list = [];
     /****** get all point include new point *******/
     for(var i = 0;  i < this.position.length;  i++){
         point_list.push(ground_obj.getPoint(this.position[i]));
         var new_point = [point_list[i][0], point_list[i][1] - skip_cnt];
         new_point_list.push(new_point);
     }
     /********** remove tag class, first **************/
     for(var i = 0;  i < this.position.length;  i++){
         this.ground[this.position[i]].setAttribute("class", "");
     }
     /*********** check new point can move to *********/
     if(ground_obj.checkPoints(new_point_list)){
         for(var i = 0;  i < this.position.length;  i++){
             this.position[i] -= skip_cnt;
         }
         this.center_point[1] -= skip_cnt;
     }
     /******** recover the block can see **********/
     for(var i = 0;  i < this.position.length;  i++){
         this.ground[this.position[i]].setAttribute("class", this.class);
     }
     return null;
}
 /******************************
  * blockObj's method: right(skip_cnt)
  * description: move block right skip_cnt times
  * input: skip_cnt = 1
  ******************************/
 blockObj.prototype.right = function(skip_cnt = 1){
     return this.left(skip_cnt * (-1));
 }
 /******************************
  * blockObj's method: down(skip_cnt)
  * description: move block down skip_cnt times
  * input: skip_cnt = 1
  ******************************/
 blockObj.prototype.down = function(skip_cnt=1){
     var ground_obj = this.ground_obj;
     var ground = this.ground;
     var point_list = [];
     var new_point_list = [];
     /****** get all point include new point *******/
     for(var i = 0;  i < this.position.length;  i++){
         point_list.push(ground_obj.getPoint(this.position[i]));
         var new_point = [point_list[i][0] + skip_cnt, point_list[i][1]];
         new_point_list.push(new_point);
     }
     /********** remove tag class, first **************/
     for(var i = 0;  i < this.position.length;  i++){
         this.ground[this.position[i]].setAttribute("class", "");
     }
     /*********** check new point can move to *********/
     /*********** TODO: if not, change status ******************/
     if(ground_obj.checkPoints(new_point_list)){
         for(var i = 0;  i < this.position.length;  i++){
             this.position[i]+=this.ground_width * skip_cnt;
         }
         this.center_point[0] += skip_cnt;
     }
     /******** recover the block can see **********/
     for(var i = 0;  i < this.position.length;  i++){
         this.ground[this.position[i]].setAttribute("class", this.class);
     }
     return null;
}
    
 /******************************
  * blockObj's method: clean()
  * description: clean block(remove tag class)
  * input: null
  ******************************/
blockObj.prototype.clean = function(){
    for(var i = 0;  i < this.position.length;  i++){
        this.ground[this.position[i]].setAttribute("class","");
    }
}
    
 /******************************
  * description: all types of blockObj's status.  But it may be not to use.
  ******************************/
blockObj.prototype.way_map={
    "front" : 0,
    "back" : 2,
    "left" : 1,
    "right" : 3
}