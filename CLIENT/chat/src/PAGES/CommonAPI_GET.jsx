import React from 'react'

function CommonAPI_GET({url}) {
 const result = fetch(url,{method:"GET",headers:{"Accept":"Application/json","Content-Type":"Application/json"}})
  .then((res)=>{return res.json()})
 return result
}

export default CommonAPI_GET