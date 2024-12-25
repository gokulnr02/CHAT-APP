import React from 'react'

function CommonAPI_POST({url,params}) {
 const result = fetch(url,{method:"POST",headers:{"Accept":"Application/json","Content-Type":"Application/json"},body:JSON.stringify(params)})
  .then((res)=>{return res.json()})
 return result
}

export default CommonAPI_POST