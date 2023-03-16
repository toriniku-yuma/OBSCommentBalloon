type ComText = {
    type:string
    content:string
}[]

export default function ComText(ctx:ComText){
    return ctx.map((value,index)=>{
        if(value.type === "image"){
            return(
                <img src={value.content} key={index} className="inline w-[4rem]"/>
            )
        }else if(value.type === "message"){
            return(
                <span key={index}>{value.content}</span>
            )
        }
    })
}