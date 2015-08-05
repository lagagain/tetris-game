/************************************************
 * Name:rus.js
 * Update Date: 2015/7/31
 * Author: WECODER
 * Vertion: 0.9
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
/****** var ground_maxia ******/
var main_ground_maxia;
var preview_ground_maxia;
var skip_ground_maxia;
/******* var raws & cols **************/
var main_ground_raws;
var main_ground_cols;
/******** setting const var **************/
const max_height = 15;
const sum_cols = 12;
const full_width = sum_cols - 2;
const block_types = ["square",
                     "blue_L",
                     "orange_L",
                     "straight",
                     "block_T",
                     "red_Z",
                      "green_Z"];
const game_status_types = {"stop":-1,
                           "playing":0};
const down_speed = 700;	/* pms */
/******** var obj *****************/
var main_ground_obj;
var preview_ground_obj;
var skip_ground_obj;
var main_block_obj;
/********* var other varable ****************/
var start_button;
var score;
var game_status = game_status_types["stop"];
var preview_block_type = "";
var skip_block_type = "";

/***************************************
 * init when window loaded (get var value)
 ***************************************/
window.onload=function(){
    /*********** init var *************/
    /*********** init ground **********/
    play_ground=document.getElementById("play_ground");
    main_ground=document.getElementById("main_ground");
    skip_ground=document.getElementById("skip_ground");
    preview_ground = document.getElementById("preview_ground");
    /********* init maxia ************/
    skip_ground_maxia=skip_ground.getElementsByTagName("td");
    main_ground_maxia=main_ground.getElementsByTagName("td");
    preview_ground_maxia=preview_ground.getElementsByTagName("td");
    /********** set cols & raws **************/
    // main_ground_cols=[];
    // main_ground_raws=[];
    // for(var i=0; i<main_ground_maxia.length; i++){
    //     main_ground_cols=0;
    //     main_ground_raws=0;
    //}
    /************ init buttons & other varable ******************/
    start_button = document.getElementById("start_button");
    score = document.getElementById("score");
    game_status = game_status_types["stop"];
    /************ get main_ground_obj *******************/
    main_ground_obj = newMainGroundObj(main_ground_maxia);
    /************ get other groundObj *******************/
    preview_ground_obj = new GroundObj(preview_ground_maxia, 4);
    skip_ground_obj = new GroundObj(skip_ground_maxia, 4);

    /**************************
     * register event
     ***************************/
    /******* Event: window on keydown ***********/
    window.addEventListener("keydown", function(e){
        if(main_block_obj){
            switch(e.code){
            case "ArrowLeft":
                main_block_obj.left();
                break;
            case "ArrowRight":
                main_block_obj.right();
                break;
            case "ArrowDown":
                main_block_obj.down();
                break;
            case "KeyZ":
                main_block_obj.clockRoto();
                break;
            case "KeyX":
                main_block_obj.unclockRoto();
                break;
            case "ShiftLeft":
            case "ShiftRight":
                skip_block();
                break;
            default:
                //DEBUG
                //use in DEBUG
                console.log(e.code);
            }
        }
    })
    /***********  Event: start_button on click *********/
    // <NORMAL>
    start_button.addEventListener("click",function(){start();});
    // <DEBUG>
    // start_button.addEventListener("click", function(e){
    //     var type_id = Math.floor(Math.random() * 100) % block_types.length;
    //     var type = block_types[type_id];
    //     main_block_obj = new blockObj(type);
    // });
    /*************** Event: clean_button on click**********************/
    var clean_button = document.getElementById("clean_button");
    if(clean_button){
        clean_button.addEventListener("click",function(e){
            main_block_obj.clean();
        });
    }


    /*********************
     * setting timers
     *********************/
    /*********** block auto down **************/
    setInterval(function(){
        /******** check main_blockObj is exist ************/
        /******** if yes, the block object down() ************/
        /******** if not, creat new block object if game is in playing ****************/
        if(main_block_obj){
            main_block_obj.down();
        }else if(game_status == game_status_types["playing"]){
            /********* var & init varable in event ********************/
            var type_id = Math.floor(Math.random() * 100) % block_types.length;
            var type = preview_block_type;
            /****** get new type of block to preview_ground ********/
            preview_block_type = block_types[type_id];

            /************* clean block object *************/
            /************* put block object in preview_ground *************/
            preview_ground_obj.clean();
            new blockObj(preview_block_type, preview_ground_obj);

            /****** get new block object to main_block_obj **********/
            main_block_obj = new blockObj(type);
        }
        
        /****** view height_line *********/
        var raws = main_ground_obj.getRaws(1);
        for(var i in raws){
            if(raws[i].className == ""){
                raws[i].setAttribute("class","red");
            }else if(raws[i].className == "red"){
                raws[i].setAttribute("class","");
            }
        }
        
        //<DEBUG>
        /************ view raw2d_cnt **********************/
        // var cols = main_ground_obj.getCols(full_width + 1)// ;
        // for(var i = 0;  i < cols.length;  i++){
        //     cols[i].innerHTML = main_ground_obj.getRawsCnt(i);
        // }

        //<DEBUG>
        /************ view col2d_cnt **********************/
        // var raws = main_ground_obj.getRaws(max_height + 1);
        // for(var i = 0;  i < raws.length;  i++){
        //     raws[i].innerHTML = main_ground_obj.getColsCnt(i);
        // }

    },down_speed);
    
    //<DEBUG>
    /************ view line_number **********************/
    // var cols = main_ground_obj.getCols(0);
    // for(var i = 0;  i < cols.length;  i++){
    //     cols[i].innerHTML = i;
    // }

    //<DEBUG>
    /************ view col_number **********************/
    // var raws = main_ground_obj.getRaws(0);
    // for(var i = 0;  i < raws.length;  i++){
    //     raws[i].innerHTML = i;
    // }

    
}

function start(){
   
    init();
    
    game_status = game_status_types["playing"];

    start_button.value = "restart";

    
}
    
/***********************
 * init game setting
 ***********************/
function init(){
    //game_status = game_status_types["stop"];
    /************** get new type of block to preview_block_type ***************/
    var type_id = Math.floor(Math.random() * 100) % block_types.length;
    preview_block_type = block_types[type_id];
    
    /******************************
     * Reset some varable and status.
     *
     ******************************/
    /*** reset score ****/
    score.innerHTML = "0";
    for(var i = 1;  i < max_height + 1;  i++){
        /******* reset raw2d_cnt **********/
        main_ground_obj.cleanRawsCnt(i);
        for(var i2 = 1;  i2 < sum_cols - 1;  i2++){
            /******* clean block object in main_ground *********/
            main_ground_obj.getRaws(i)[i2].setAttribute("class","");
        }
        console.log("prepare......", i );
    }
    /************* clean block object in ground *********************/
    preview_ground_obj.clean();
    skip_ground_obj.clean();
    
    for(var i = 0;  i < sum_cols;  i++){
        /****** reset col2d_cnt *******/
        main_ground_obj.cleanColsCnt(i);
        console.log("prepare2......", i );
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
 // - raws2d_cnt~
 // - cols2d_cnt
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
        };
        ground_obj.getGround=function(){
            /*******************************
             * method name: getGround()
             * description: 
             * output: the ground
             *****************************/
            return ground;
        };
        ground_obj.getIndex=function(y, x){
            /*******************************
             * method name: getIndex(y,x)
             * description: it will return the index of the element which is sitting (y, x) in the ground.  The y & x is start from 0.
             * input: y, x
             * output: tag element
             *****************************/
            var index = (y * sum_cols) + x;
            return index;
        };
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
        };

        ground_obj.getCols = function(index){
            /******************************
             * method name: getCols(index)
             * description: it return cols2d[index]
             * input: index
             * output: cols // a list include boxs these are in the col
             ******************************/
            return cols2d[index];
        }

        ground_obj.getRaws = function(index){
            /******************************
             * method name: getRaws(index)
             * description: it return raws2d[index]
             * input: index
             * output: raws // a list include boxs these are in the col
             ******************************/
            return raws2d[index];
        }
        
        ground_obj.getColsCnt=function(index){
            /******************************
             * method name: getColsCnt(index)
             * description: it return cols2d_cnt[index]
             * input: index
             * output: cnt	//how many block in cols2d[index]
             ******************************/
            return cols2d_cnt[index];
        };
        ground_obj.getRawsCnt=function(index){
            /******************************
             * method name: getRawsCnt(index)
             * description: it return raws2d_cnt[index]
             * input: index
             * output: cnt	//how many block in raws2d[index]
             ******************************/
            return raws2d_cnt[index];
        };
        ground_obj.cleanColsCnt=function(index){
            /******************************
             * method name: cleanColsCnt(index)
             * description: set clos2d[index] with 0.
             * input: index
             * output: null
             ******************************/
            cols2d_cnt[index] = 0;
        };
        ground_obj.cleanRawsCnt=function(index){
            /******************************
             * method name: cleanRawsCnt(index)
             * description: set raws2d[index] with 0.
             * input: index
             * output: null
             ******************************/
            raws2d_cnt[index] = 0;
        };
        ground_obj.addRawsCnt=function(index, times=1){
            /******************************
             * method name: addRawsCnt(index, times)
             * description: It plus raws2d_cnt[index] with times
             * input: (index,
             		times)
             * output: None
             ******************************/
            raws2d_cnt[index]+=times;
            
            // DEBUG
            //console.log("index is", index,";  cnt is", raws2d_cnt[index]);
        };
        ground_obj.addColsCnt=function(index, times=1){
            /******************************
             * method name: addColsCnt(index, times)
             * description: It plus cols2d_cnt[index] with times
             * input: (index,
             		times)
             * output: None
             ******************************/
            cols2d_cnt[index]+=times;
        };
        ground_obj.setRawsCnt=function(index, new_cnt=0){
            /******************************
             * method name: setRawsCnt(index, new_cnt)
             * description: setting raws2d_cnt[index] with new_cnt
             * input: (index,
             		new_cnt)
             * output: None
             ******************************/
            raws2d_cnt[index] = new_cnt;
        };
        ground_obj.setColsCnt=function(index, new_cnt=0){
            /******************************
             * method name: setColsCnt(index, new_cnt)
             * description: setting cols2d_cnt[index] with new_cnt
             * input: (index,
             		new_cnt)
             * output: None
             ******************************/
            cols2d_cnt[index] = new_cnt;
        };
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
        };
        
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
    };
    this.getGround=function(){
        /*******************************
         * method name: getGround()
         * description: 
         * output: the ground
         *****************************/
        return this.ground;
    };
    this.getIndex=function(y, x){
        /*******************************
         * method name: getIndex(y,x)
         * description: it will return the index of the element which is sitting (y, x) in the ground.  The y & x is start from 0.
         * input: y, x
         * output: tag element
         *****************************/
        var index = (y * width) + x;
        return index;
    };
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
    };
    
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

/*******************************
 * method name: clean ()
 * object = GroundObj
 * description: 
 * input: None
 * output: None
 *****************************/
 GroundObj.prototype.clean = function(){
    for(var i = 0;  i < this.ground.length;  i++){
        this.ground[i].setAttribute("class","");
    }
 }


/************************************
 * object name: blockObj
 * 
 * 
 **************************************/
 function blockObj(type="straight",ground=main_ground_obj,position=null){
     /********** var varable in function *****************/
     var ground_width = ground.width;
     if (ground === preview_ground_obj || ground === skip_ground_obj){
         ground_width = 4;
     }
     var point_list = [];
     var start_position = ground_width / 2;
     /********* the object's varable *************/
     this.center_point = [2,start_position];
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
                 // ##
                 // ##
                 this.position[0] = ground.getIndex(this.center_point[0] - 1,this.center_point[1] - 1);
                 this.position[1] = ground.getIndex(this.center_point[0] - 1,this.center_point[1]);
                 this.position[2] = ground.getIndex(this.center_point[0],this.center_point[1] - 1);
                 this.position[3] = ground.getIndex(this.center_point[0],this.center_point[1]);
                 this.class += " green";
                 break;
         case "blue_L":
                 //  #
                 //  #
                 // ##
                 this.position[0] = ground.getIndex(this.center_point[0] - 2,this.center_point[1]);
                 this.position[1] = ground.getIndex(this.center_point[0] - 1,this.center_point[1]);
                 this.position[2] = ground.getIndex(this.center_point[0],this.center_point[1]);
                 this.position[3] = ground.getIndex(this.center_point[0],this.center_point[1] - 1);
                 this.class += " dark_blue";
                 break;
         case "orange_L":
                 // #
                 // #
                 // ##
                 this.position[0] = ground.getIndex(this.center_point[0] - 2,this.center_point[1] - 1);
                 this.position[1] = ground.getIndex(this.center_point[0] - 1,this.center_point[1] - 1);
                 this.position[2] = ground.getIndex(this.center_point[0],this.center_point[1] - 1);
                 this.position[3] = ground.getIndex(this.center_point[0],this.center_point[1]);
                 this.class += " orange";
                 break;
         case "straight":
                 // #
                 // #
                 // #
                 // #
                 this.position[0] = ground.getIndex(this.center_point[0] - 2,this.center_point[1]);
                 this.position[1] = ground.getIndex(this.center_point[0] - 1,this.center_point[1]);
                 this.position[2] = ground.getIndex(this.center_point[0],this.center_point[1]);
                 this.position[3] = ground.getIndex(this.center_point[0] + 1,this.center_point[1]);
                 this.class += " blue";
                 break;
         case "block_T":
                 // ###
                 //  #
                 this.position[0] = ground.getIndex(this.center_point[0] - 1,this.center_point[1]);
                 this.position[1] = ground.getIndex(this.center_point[0], this.center_point[1]);
                 this.position[2] = ground.getIndex(this.center_point[0] -1, this.center_point[1] - 1);
                 this.position[3] = ground.getIndex(this.center_point[0] -1, this.center_point[1] + 1);
                 this.class += " purple";
                 break;
         case "red_Z":
                 // ##
                 //  ##
                 this.position[0] = ground.getIndex(this.center_point[0],this.center_point[1]);
                 this.position[1] = ground.getIndex(this.center_point[0] -1,this.center_point[1]);
                 this.position[2] = ground.getIndex(this.center_point[0] - 1,this.center_point[1] - 1);
                 this.position[3] = ground.getIndex(this.center_point[0],this.center_point[1] + 1);
                 this.class += " red";
                 break;
         case "green_Z":
                 //  ##
                 // ##
                 this.position[0] = ground.getIndex(this.center_point[0] - 1,this.center_point[1]);
                 this.position[1] = ground.getIndex(this.center_point[0] - 2,this.center_point[1] + 1);
                 this.position[2] = ground.getIndex(this.center_point[0] - 1,this.center_point[1] - 1);
                 this.position[3] = ground.getIndex(this.center_point[0] - 2,this.center_point[1]);
                 this.class += " light_green";
                 break;
     }
     
     /////////////////////// check start position can put .////////////
     if(this.ground_obj === main_ground_obj){
         for(var i = 0; i < this.position.length;  i++){
             point_list.push(this.ground_obj.getPoint(this.position[i]));
         }
         if(! this.ground_obj.checkPoints(point_list)){
             over();
             return null;
         }
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
     /***********  if not, change status ******************/
     if(ground_obj.checkPoints(new_point_list)){
         for(var i = 0;  i < this.position.length;  i++){
             this.position[i]+=this.ground_width * skip_cnt;
         }
         this.center_point[0] += skip_cnt;
     }else{
         /********** if not, change status *******************/
         for(var index in point_list){
             var point = point_list[index];
             ground_obj.addColsCnt(point[1]);
             ground_obj.addRawsCnt(point[0]);
             main_block_obj = null;
         }
     }
     
     /******** recover the block can see **********/
     for(var i = 0;  i < this.position.length;  i++){
         this.ground[this.position[i]].setAttribute("class", this.class);
     }
     
     /*********** check game status *************************/
     checkGame();

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
  * blockObj's method: unclockRoto(times = 1)
  * description: Roto block
  * input: times
  ******************************/
blockObj.prototype.unclockRoto = function(times = 1){
    /******************* var varable in method ************/
    var point_list = [];
    var new_point_list = [];

    /********* get points ***********/
    for(index in this.position){
        point_list.push( this.ground_obj.getPoint(this.position[index]) );
    }
    
    /******** get new points **********/
    for(index in point_list){
        new_point_list.push(unclockRoto(point_list[index], 90 * times, this.center_point));
    }

    /***************** kit positions ************************/
    for(var index in new_point_list){
        new_point_list[index][1] -= 1;
    }


    //<DEBUG>
    // for(var i1 in new_point_list){
    //     console.log(new_point_list[i1]);
    //}

    /****** remember class, and clear block ********/ 
    var className = this.ground[this.position[0]].className;
    this.clean();

    /************ change position *******************/
    if(this.ground_obj.checkPoints(new_point_list)){
        //console.log(new_point_list);
        for(var index =0;  index < 4;  index++){
            //console.log("index = ",index,this.position.length);
            this.position[index] = this.ground_obj.getIndex(new_point_list[index][0],new_point_list[index][1]);
            //console.log(this.ground_obj.getIndex(new_point_list[index][0],new_point_list[index][1]));
        }
    }

    /********* recover block ***********/
    for(var index in this.position){
        this.ground[this.position[index]].setAttribute("class",className);
    }
};
 /******************************
  * blockObj's method: clockRoto(times = 1)
  * description: Roto block
  * input: times
  ******************************/
blockObj.prototype.clockRoto = function(times = 1){
    for(var i = 0;  i < 3 * times;  i++){
        this.unclockRoto(1);
    }
};
    
 /******************************
  * description: all types of blockObj's status.  But it may be not to use.
  ******************************/
blockObj.prototype.way_map={
    "front" : 0,
    "back" : 2,
    "left" : 1,
    "right" : 3
};
    
/******************************
 * function name: checkGame()
 * description: It will check game status include both overring height and filling lines
 * input: point,	//where start check.
         ground_obj	//which groundObj it at.
 * output: None
 ******************************/
function checkGame(point=[max_height,sum_cols - 1],ground_obj = main_ground_obj){
    var cnt;
    var raws;
    


    /********** check all raws ******/
    for(var i = max_height; i > 0; i--){
        cnt = ground_obj.getRawsCnt(i);
        
        //DEBUG
        //console.log("check index cnt:",cnt);
        
        if(cnt >= full_width){
            checkLines(i);
            break;
        }
    }
    
    /********** check all cols (height) **********/
    raws = ground_obj.getRaws(0);
    for(var index in raws){
       if(index == 0 ||
          index == sum_cols - 1){
            continue;
       }
       var class_name = raws[index].className;
       if(class_name.match("block")){
           over();
           break;
       }
    }
};

/****************************
 * function name: checkLines(raw, ground_obj)
 * description: It will check all line full or not.
 * input: raw, // which raw it will start check.
 		ground_obj	// which groundObj it at.
 * output: None
 ******************************/
  
function checkLines(raw,ground_obj = main_ground_obj){

    var cnt;
    var raws;
    
    /****** hide height_line *********/
    raws = main_ground_obj.getRaws(1);
    for(var i in raws){
        if(raws[i].className == "red"){
            raws[i].setAttribute("class","");
        }
    }
    
    /********** check raw and record need move times *******************/
    if(raw == 0){
        return 0;
    }else{
        var need_times = 0;
        for(var i = raw;  i > 0;  i--){
            cnt = ground_obj.getRawsCnt(i);
            if(cnt >= full_width){
                raws = ground_obj.getRaws(i);
                for(var index in raws){
                    if(index == 0 ||
                       index == sum_cols - 1){
                        continue;
                    }
                    
                    // DEGUG
                    //console.log(i, cnt);
                    //raws[index].setAttribute("class","");

                    //ground_obj.cleanRawsCnt(index);
                }
                need_times++;
                
                // plus score
                score.innerHTML = Number(score.innerHTML) + 1;
                
            }else{
                checkLines(i - 1, ground_obj);
                break;
            }
        }
        
        //DEBUG
        //console.log("need_times = ", need_times);
        
        /********** move **********/
        if(need_times != 0){
            for(var i = 1;  i < sum_cols - 1;  i++){
                ground_obj.addColsCnt(i, need_times * (-1));
            }
            for(var i2 = raw;  i2 >= 0;  i2--){
                var new_raws = ground_obj.getRaws(i2);
                var old_raws = ground_obj.getRaws(i2 - need_times);

                //<DEBUG>
                // console.log("i2 - need_times = " + i2 + "-" + need_times + "=" + (i2-need_times));
                // console.log("getRawsCnt(i2 - need_times) = " + ground_obj.getRawsCnt(i2 - need_times));
                
                if(i2 - need_times > 0){
                    ground_obj.setRawsCnt(i2, ground_obj.getRawsCnt(i2 - need_times));
                    //ground_obj.cleanRawsCnt(i2 - need_times);
                }else{
                	ground_obj.cleanRawsCnt(i2);
                }
                
                for(var index in old_raws){
                    if(index == 0 ||
                       index == sum_cols - 1){
                        continue;
                    }
                    if(i2 - need_times > 0){
                        new_raws[index].setAttribute("class", old_raws[index].className);
                        old_raws[index].setAttribute("class","");
                    }else{
                        new_raws[index].setAttribute("class","");
                    }
                }
            }
        }
    }

    }

/****************************
 * function name: over()
 * description: It clarm Game Over.
 * output: None
 ******************************/
function over(){
    game_status = game_status_types["stop"];
    alert("Game Over\n" + "your scroe:" + score.innerHTML);
}

/****************************
 * function name: skip_block
 * description: skip block or recover block.
 * output: None
 ******************************/
function skip_block(){
    main_block_obj.clean();
    skip_ground_obj.clean();

    if(skip_block_type == ""){
        skip_block_type = main_block_obj.type;
        new blockObj(skip_block_type, skip_ground_obj);
        main_block_obj = null;
    }else{
        var type = skip_block_type;
        skip_block_type = main_block_obj.type;
        new blockObj(skip_block_type, skip_ground_obj);
        main_block_obj = new blockObj(type);
        
    }

}