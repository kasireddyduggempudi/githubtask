import React from 'react';

function DisplayRepos(props){
    // props gets the object
    // so check for if it is empty object
    // else display the information
    if(Object.keys(props.repoInfo).length){
        return(
            <div id="results_display_div" style={{marginRight:"3%"}}>
                <div className="results_div_item">
                    <div>
                        <div className="repo_name_div">
                            <h3><a href="">{props.repoInfo.name}</a></h3>
                            <p>{props.repoInfo.description}</p>
                        </div>
                        <div></div>
                        <div className="repo_description_div">
                            {
                                (props.repoInfo.language)?(<span className="repo_description_div_item">
                                <span className="dot_color" style={{height:"12px", width:"12px", borderRadius:"50%", display:"inline-block", position:"relative", top:"1px"}}></span> {props.repoInfo.language}
                            </span> ):null
                            }
                           
                            <span className="repo_description_div_item">
                                Updated on {props.repoInfo.updated_at}
                            </span>
                        </div>
                    </div>
                    <div className="star_display_div">
                        <div style={{marginTop:"10px"}}>
                            <button className="star_btn">* Star</button>
                        </div>
                        
                        <div style={{marginTop:"25px"}}> 
                        <svg width="155" height="30">
                            <g transform="translate(0, -12)">
                                <rect x="0" y="-2" width="155" height="16" style={{backgroundColor:"green", fill:"#d7ecae"}}></rect>
                            </g>
                        </svg>
                        </div>
                    </div>
                </div>
            </div>
        );
    }else{
        return <h3 align="center">No repositories found!!!</h3>
    }
}

export default DisplayRepos;