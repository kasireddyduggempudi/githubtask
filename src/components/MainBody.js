import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SideDiv from './SideDiv';
import RepositoryDiv from './RepositoryDiv';

function MainBody(){
    //const [data, setData] = useState({login:"supreetsingh247", name:"Supreet Singh", bio:"Front end developer since 1.5 years", company:"Target Corporation", location:"India", avatar_url:"https://avatars1.githubusercontent.com/u/7427552?v=4"});
    const [data, setData] = useState({});

    useEffect(()=>{
        axios("https://api.github.com/users/supreetsingh247")
        .then((response)=>{
            //console.log(response.data);
            setData(response.data);
        })
        .catch((err)=>{
            setData({});
        })
    }, []);

    if(Object.keys(data).length){
        return(
            <div id="main_body">
                <SideDiv info={data} />
                <RepositoryDiv info={data} />
            </div>
        );  
    }else{
        return(
            <h1 align="center">Something Went Wrong. Please Try Again</h1>
        );
    }
}

export default MainBody;
