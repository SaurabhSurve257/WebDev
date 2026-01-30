const arr=[1,2,3,1,3,4,5,2,1];

const obj=arr.reduce((acc,curVal)=>{
    if(acc[curVal]){
        acc[curVal]+=1;
    }
    else{
        acc[curVal]=1;
    }
    return acc;
}
,{});
console.log(obj);




