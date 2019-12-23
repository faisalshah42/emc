export function GetData(urlParams){
    let BASE_URL = "http://110.39.192.190:12000/vhm/";

    return new Promise((resolve, reject)=>{
        
        fetch(BASE_URL+urlParams,{
            method:'GET'
        }).then((response) => response.json())
        .then((dataJson)=>{
            resolve(dataJson)
        })
        .catch((error)=>{
            reject(error);
        });

    });

}
