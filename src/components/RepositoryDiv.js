import React, {useState, useEffect} from 'react';
import axios from 'axios';
import DisplayRepos from './DisplayRepos';

function RepositoryDiv(props){

    // state variables to store search keyword and type and language
    // based on these, we search in the repositories fetched in this page and will give the
    // results to display

    const [repoData, setRepoData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [language, setLanguage] = useState("");

    useEffect(()=>{
        //console.log(language+"hai");
        axios("https://api.github.com/users/supreetsingh247/repos")
        .then(response=>{
            setRepoData(response.data);
        }).catch(error=>{
            alert(error);
        })
        // code to add onscroll eventListener
        document.addEventListener("scroll", ()=>{
            //console.log(window.pageYOffset);
            if(window.pageYOffset >= 400){
                document.getElementById("image_and_name_div").style="position:fixed;top:0px;flex-direction:row;justify-content:center;margin-top:14.5px;border-bottom: 1px solid #d1d5da;";
                document.getElementById("image").style="width:35px!important;height:35px!important";
                document.getElementById("name").style="display:none";
                document.getElementById("user_name").style = "font-size:14px;font-weight:bold;margin-left:10px;margin-right:10px;margin-top:4px";
                document.getElementById("name_div").style="display:flex";
                document.getElementById("follow_btn").style="padding-top:0px;padding-bottom:0px;margin-top:7px"
            }else{
                document.getElementById("image_and_name_div").style="position:relative;top:0px";
                document.getElementById("image").style="max-width:260px!important;max-height:260px!important";
                document.getElementById("user_name").style = "font-size:20px;margin-top:13px;color:#666;line-height:24px;margin-top:0px";
                document.getElementById("name").style="display:block";
                document.getElementById("name_div").style="display:block";
                document.getElementById("follow_btn").style="padding-top:6px;padding-bottom:6px;margin-top:0px"
            }
        });

        // code to add the eventListener to close the details tag
        document.addEventListener("click",(e)=>{
            //alert(e.target.nodeName);
                const details = document.querySelectorAll("details");
                // Add the onclick listeners.
                details.forEach((targetDetail) => {
                  targetDetail.addEventListener("click", () => {
                    // Close all the details that are not targetDetail.
                    details.forEach((detail) => {
                      if (detail !== targetDetail) {
                        detail.removeAttribute("open");
                      }
                    });
                  });
                });
        });
    },[]);


    // to filter the data from the repoData based on the search_keyword and language selection
    const getFinalData = (keyword, lang)=>{
        var originalData = repoData.slice(0);   // taking copy
        var finalData = [];
        var regKeyword = new RegExp(keyword, "i");
        var regLang = new RegExp(lang, "i");
        if(keyword == "" && lang == ""){
            return originalData;
        }else if(keyword != "" && lang != ""){
            //looping through array
            originalData.forEach(function(item, index){
                if((item.name.search(regKeyword) != -1) && (item.language && item.language.search(regLang) != -1)){
                    finalData.push(item);
                }
            })
        }else if(keyword != ""){
            //looping through array
            originalData.forEach(function(item, index){
                if(item.name.search(regKeyword) != -1){
                    finalData.push(item);
                }
            });
        }else if(language != ""){
            //looping through array
            originalData.forEach(function(item, index){
                if(item.language && item.language.search(regLang) != -1){
                    finalData.push(item);
                }
            });
        }
        return finalData;
    }

    // function to handle clear btn click event
    // this will reset searchKeyword and language state elements
    const handleClear = ()=>{
        console.log("celared");
        setSearchKeyword("");
        setLanguage("");
    }

    const finalData = getFinalData(searchKeyword, language);

    //console.log(finalData.length);
    
    return(
        <div id="repository_div">
            <div id="tabs_div">
                <nav id="tabs_nav">
                    <a className="tab-item">
                        Overview
                    </a>
                    <a className="tab-item" style={{fontWeight:"600", color:"#24292e",marginTop:"21px",paddingBottom:"15px", borderBottom:"2px solid #e36209"}}>
                        Repositories <span className="badge">{props.info.public_repos}</span>
                    </a>
                    <a className="tab-item">
                        Projects  <span className="badge">{props.info.public_gists}</span>
                    </a>
                    <a className="tab-item">
                        Stars 
                    </a>
                    <a className="tab-item">
                        Followers <span className="badge">{props.info.followers}</span>
                    </a>
                    <a className="tab-item">
                        Following <span className="badge">{props.info.following}</span>
                    </a>
                </nav>
            </div>

            <div id="filter_div">
                <div className="filter_div_item">
                    <input type="text" onChange={(e)=>{setSearchKeyword(e.target.value)}} value={searchKeyword} name="filter_search" id="filter_search" placeholder="Find a repository..." />
                </div>
                <div className="filter_div_item" style={{display:"grid", gridTemplateColumns:"1fr 1fr", gridGap:"7px"}}>
                    <div>
                        <details id="type_options">
                            <summary class="summary_btn" aria-haspopup="menu" role="button">
                                <font style={{fontSize:"14px", fontWeight:"100"}}>Type:</font>
                                <span id="type_value">
                                &nbsp;&nbsp;All
                                </span>
                                <span class="caret"></span>
                            </summary>

                            <details-menu class="menu_div">
                                <div class="menu_modal">
                                    <header class="menu_header">
                                        <span class="menu_title">Select type</span>
                                    </header>
                                    <div class="menu_list">
                                        <label class="list_item" aria-checked="true" tabindex="0">
                                            <input type="radio" onChange={(e)=>{document.getElementById("type_value").innerHTML="&nbsp;&nbsp;All";document.getElementById("type_options").removeAttribute("open")}} name="type" id="type_" value="" hidden="hidden" data-autosubmit="true" checked="checked"/>
                                            
                                            <span class="text-normal" data-menu-button-text="">All</span>
                                        </label>
                                        <label class="list_item"  >
                                            <input type="radio" onChange={(e)=>{document.getElementById("type_value").innerHTML="&nbsp;&nbsp;"+e.target.value;document.getElementById("type_options").removeAttribute("open")}} name="type" id="type_source" value="source" hidden="hidden" data-autosubmit="true"/>
                                            
                                            <span class="text-normal" data-menu-button-text="">Sources</span>
                                        </label>
                                        <label class="list_item"  >
                                            <input type="radio" onChange={(e)=>{document.getElementById("type_value").innerHTML="&nbsp;&nbsp;"+e.target.value;document.getElementById("type_options").removeAttribute("open")}} name="type" id="type_fork" value="fork" hidden="hidden" data-autosubmit="true"/>
                                            
                                            <span class="text-normal" data-menu-button-text="">Forks</span>
                                        </label>
                                        <label class="list_item"  >
                                            <input type="radio" onChange={(e)=>{document.getElementById("type_value").innerHTML="&nbsp;&nbsp;"+e.target.value;document.getElementById("type_options").removeAttribute("open")}} name="type" id="type_archived" value="archived" hidden="hidden" data-autosubmit="true"/>
                                            
                                            <span class="text-normal" data-menu-button-text="">Archived</span>
                                        </label>
                                        <label class="list_item"  >
                                            <input type="radio" onChange={(e)=>{document.getElementById("type_value").innerHTML="&nbsp;&nbsp;"+e.target.value;document.getElementById("type_options").removeAttribute("open")}} name="type" id="type_mirror" value="mirror" hidden="hidden" data-autosubmit="true"/>
                                            <span class="text-normal" data-menu-button-text="">Mirrors</span>
                                        </label>
                                    </div>
                                </div>
                            </details-menu>
                        </details>
                    </div>
                    {/* Language details */}
                    <div>
                        <details id="language_options">
                            <summary class="summary_btn" aria-haspopup="menu" role="button">
                            <font style={{fontSize:"14px", fontWeight:"100"}}>Language:</font>
                            <span data-menu-button="" id="language_value">
                                &nbsp;&nbsp;{language!=""?language:"All"}
                            </span>
                            <span class="caret"></span>
                            </summary>

                            <details-menu class="menu_div" role="menu">
                            <div class="menu_modal">
                                <header class="menu_header">
                                    <span class="menu_title" >Select language</span>
                                </header>
                                <div class="menu_list">
                                <label class="list_item"  aria-checked="true" tabindex="0">
                                    <input type="radio" onChange={(e)=>{document.getElementById("language_options").removeAttribute("open");setLanguage("")}} name="language" id="language_" value="" hidden="hidden" data-autosubmit="true" checked="checked"/>
                                    <span class="text-normal" data-menu-button-text="">All</span>
                                </label>
                                <label class="list_item"  >
                                    <input type="radio" onChange={(e)=>{document.getElementById("language_options").removeAttribute("open");setLanguage(e.target.value)}} name="language" id="language_html" value="html" hidden="hidden" data-autosubmit="true"/>
                                    <span class="text-normal" data-menu-button-text="">HTML</span>
                                </label>
                                <label class="list_item"  >
                                    <input type="radio" onChange={(e)=>{document.getElementById("language_options").removeAttribute("open");setLanguage(e.target.value)}} name="language" id="language_javascript" value="javascript" hidden="hidden" data-autosubmit="true"/>
                                    <span class="text-normal" data-menu-button-text="">JavaScript</span>
                                </label>
                                <label class="list_item"  >
                                    <input type="radio" onChange={(e)=>{document.getElementById("language_options").removeAttribute("open");setLanguage(e.target.value)}} name="language" id="language_css" value="css" hidden="hidden" data-autosubmit="true"/>
                                    <span class="text-normal" data-menu-button-text="">CSS</span>
                                </label>
                                </div>
                            </div>
                            </details-menu>
                        </details>
                    </div>

                    
                </div>                        
            </div>

            <div id="results_display_div" style={{marginRight:"3%"}}>
                {
                    (searchKeyword || language)?
                        ((finalData.length)?
                (<div className="clear_div" style={{fontSize:"14px"}}>{finalData.length} results for repositories {searchKeyword?<span>matching <b>{searchKeyword}</b></span>:null} {language?<span>written in <b>{language}</b></span>:null}
                    <a id="clear_btn" onClick={()=>handleClear()}>
                    <svg class="octicon octicon-x issues-reset-query-icon mt-1" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path></svg>
                    &nbsp; Clear Filter
                    </a></div>)
                        :null)
                    :null
                }
                {
                    finalData.length?(finalData.map((item, id)=><DisplayRepos key={id} repoInfo={item} />)):(searchKeyword?<p>0 results for repositories matching <b>{searchKeyword}</b></p>:<DisplayRepos repoInfo={{}} />)
                }             
            </div>
        </div>
    );
}

export default RepositoryDiv;