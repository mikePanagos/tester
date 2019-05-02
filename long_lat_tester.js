
var  location=[ [   30.031258,-95.4705298],[  30.0312424,-95.4705184],[  30.0312687, -95.4705195],[   30.0312837, -95.4704011]];

var point1=[30.0312609,-95.470524];


checkLoc(point1);

var point2=[31.0312353,-95.4705236];
checkLoc(point2);

var point3=[30.0312458,-95.4705798];
checkLoc(point3);


var point4=[30.0311653,-95.4702934];
checkLoc(point4);


function checkLoc(point){
    console.log("about to try point "+point);
    // console.log((point,location));
    // console.log(location[0][1]);
    

    sorting(location,point);
    // console.log("here");
    
}
function sorting(array,point){
    // console.log(array);
    // console.log(array.length);
    
    let lat =[];
    let long =[];
    for (let i = 0; i < array.length; i++) {
        console.log(i);
        
        lat[i]=array[i][0];
        long[i]=array[i][1];
    }
    // console.log("unsorted\n"+lat+"\n"+long);
    
    lat=lat.sort();
    long=long.sort();
    // console.log("sorted\n"+lat+"\n"+long);
    let latbounds=[lat[0],lat[3]];
    let longbounds=[long[0],long[3]];
    // console.log(latbounds+"\n"+longbounds);
   
    console.log("point[0]>=latbounds[0] is "+(point[0]>=latbounds[0]));
    console.log("point[0]<=latbounds[1] is "+(point[0]<=latbounds[1]));

    console.log("point[1]<=longbounds[0] is "+(point[1]<=longbounds[0]));

    console.log("point[1]>=longbounds[1] is "+(point[1]>=longbounds[1]));

    

    if(point[0]>=latbounds[0]&&point[0]<=latbounds[1]&&point[1]<=longbounds[0]&&point[1]>=longbounds[1])
    {
        console.log("yes");
        
    }else{
        console.log("no");
        
    }


}


