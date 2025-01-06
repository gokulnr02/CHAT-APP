import React from 'react'

async function CommonAPI_GET({url}) {
    console.log(url,'GET URL')
    const result =await fetch(url,{method:"GET",headers:{"Accept":"Application/json","Content-Type":"Application/json"}})
  .then((res)=>{return res.json()})
  console.log(result,'result')
 return result
}

export default CommonAPI_GET