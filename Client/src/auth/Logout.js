import React from "react";
import axios from "axios";

function Logout(){
    const [mydata,setData] = React.useState({});

    const onChange = (event) => {
        setData((mydata) ({
            ...mydata,
                    [event.target.name]:event.target.value
        }))
    }
    const submitValue = (event) => {
        event.preventdefault();
        var myformdata = new FormData();
        myformdata.append("")
    }
    return(
        <div>
        <form onSubmit={submitValue}>
        User ID : <input type="text" name="id" placeholder="Enter Id" onChange={onChange}/><br/><br/>
        <input type="submit" value="Logout"/>
        </form>
        </div>
    )
}