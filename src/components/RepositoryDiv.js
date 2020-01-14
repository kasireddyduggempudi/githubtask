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
                    {/* <select name="filter_type" className='filter_btn'>
                        <option value="all">Type: All</option>
                        <option value="sources">Sources</option>
                        <option value="forks">Forks</option>
                        <option value="archived">Archived</option>
                        <option value="mirrors">Mirrors</option>
                    </select>
                    <select name="filter_language" className='filter_btn' onChange={(e)=>{setLanguage(e.target.value)}}>
                        <option value="">Language: All</option>
                        <option value="html">HTML</option>
                        <option value="javascript">JavaScript</option>
                        <option value="css">CSS</option>
                    </select> */}
                    <div>
                        <details class="details-reset details-overlay position-relative mr-2" id="type-options">
                            <summary class="btn" aria-haspopup="menu" role="button">
                                <font style={{fontSize:"14px", fontWeight:"100"}}>Type:</font>
                                <span data-menu-button="" id="type_value">
                                &nbsp;&nbsp;All
                                </span>
                                <span class="dropdown-caret"></span>
                            </summary>

                            <details-menu class="SelectMenu right-md-0">
                                <div class="SelectMenu-modal">
                                    <header class="SelectMenu-header">
                                        <span class="SelectMenu-title">Select type</span>
                                        <button class="SelectMenu-closeButton" type="button" data-toggle-for="type-options"><svg aria-label="Close menu" class="octicon octicon-x" viewBox="0 0 12 16" version="1.1" width="12" height="16" role="img"><path  d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path></svg></button>
                                    </header>
                                    <div class="SelectMenu-list">
                                        <label class="SelectMenu-item" role="menuitemradio" aria-checked="true" tabindex="0">
                                            <input type="radio" onChange={(e)=>{document.getElementById("type_value").innerHTML="&nbsp;&nbsp;All";document.getElementById("type-options").removeAttribute("open")}} name="type" id="type_" value="" hidden="hidden" data-autosubmit="true" checked="checked"/>
                                            <svg class="octicon octicon-check SelectMenu-icon SelectMenu-icon--check" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path  d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path></svg>
                                            <span class="text-normal" data-menu-button-text="">All</span>
                                        </label>
                                        <label class="SelectMenu-item" role="menuitemradio" aria-checked="false" tabindex="0">
                                            <input type="radio" onChange={(e)=>{document.getElementById("type_value").innerHTML="&nbsp;&nbsp;"+e.target.value;document.getElementById("type-options").removeAttribute("open")}} name="type" id="type_source" value="source" hidden="hidden" data-autosubmit="true"/>
                                            <svg class="octicon octicon-check SelectMenu-icon SelectMenu-icon--check" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path  d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path></svg>
                                            <span class="text-normal" data-menu-button-text="">Sources</span>
                                        </label>
                                        <label class="SelectMenu-item" role="menuitemradio" aria-checked="false" tabindex="0">
                                            <input type="radio" onChange={(e)=>{document.getElementById("type_value").innerHTML="&nbsp;&nbsp;"+e.target.value;document.getElementById("type-options").removeAttribute("open")}} name="type" id="type_fork" value="fork" hidden="hidden" data-autosubmit="true"/>
                                            <svg class="octicon octicon-check SelectMenu-icon SelectMenu-icon--check" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path  d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path></svg>
                                            <span class="text-normal" data-menu-button-text="">Forks</span>
                                        </label>
                                        <label class="SelectMenu-item" role="menuitemradio" aria-checked="false" tabindex="0">
                                            <input type="radio" onChange={(e)=>{document.getElementById("type_value").innerHTML="&nbsp;&nbsp;"+e.target.value;document.getElementById("type-options").removeAttribute("open")}} name="type" id="type_archived" value="archived" hidden="hidden" data-autosubmit="true"/>
                                            <svg class="octicon octicon-check SelectMenu-icon SelectMenu-icon--check" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path  d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path></svg>
                                            <span class="text-normal" data-menu-button-text="">Archived</span>
                                        </label>
                                        <label class="SelectMenu-item" role="menuitemradio" aria-checked="false" tabindex="0">
                                            <input type="radio" onChange={(e)=>{document.getElementById("type_value").innerHTML="&nbsp;&nbsp;"+e.target.value;document.getElementById("type-options").removeAttribute("open")}} name="type" id="type_mirror" value="mirror" hidden="hidden" data-autosubmit="true"/>
                                            <svg class="octicon octicon-check SelectMenu-icon SelectMenu-icon--check" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path></svg>
                                            <span class="text-normal" data-menu-button-text="">Mirrors</span>
                                        </label>
                                    </div>
                                </div>
                            </details-menu>
                        </details>
                    </div>
                    {/* Language details */}
                    <div>
                        <details class="details-reset details-overlay position-relative flex-auto" id="language-options">
                            <summary class="btn" aria-haspopup="menu" role="button">
                            <font style={{fontSize:"14px", fontWeight:"100"}}>Language:</font>
                            <span data-menu-button="" id="language_value">
                                &nbsp;&nbsp;{language!=""?language:"All"}
                            </span>
                            <span class="dropdown-caret"></span>
                            </summary>

                            <details-menu class="SelectMenu right-md-0" role="menu">
                            <div class="SelectMenu-modal">
                                <header class="SelectMenu-header">
                                <span class="SelectMenu-title" >Select language</span>
                                <button class="SelectMenu-closeButton" type="button" data-toggle-for="language-options"><svg aria-label="Close menu" class="octicon octicon-x" viewBox="0 0 12 16" version="1.1" width="12" height="16" role="img"><path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path></svg></button>
                                </header>
                                <div class="SelectMenu-list">
                                <label class="SelectMenu-item" role="menuitemradio" aria-checked="true" tabindex="0">
                                    <input type="radio" onChange={(e)=>{document.getElementById("language-options").removeAttribute("open");setLanguage("")}} name="language" id="language_" value="" hidden="hidden" data-autosubmit="true" checked="checked"/>
                                    <svg class="octicon octicon-check SelectMenu-icon SelectMenu-icon--check" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path  d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path></svg>
                                    <span class="text-normal" data-menu-button-text="">All</span>
                                </label>
                                    <label class="SelectMenu-item" role="menuitemradio" aria-checked="false" tabindex="0">
                                    <input type="radio" onChange={(e)=>{document.getElementById("language-options").removeAttribute("open");setLanguage(e.target.value)}} name="language" id="language_html" value="html" hidden="hidden" data-autosubmit="true"/>
                                    <svg class="octicon octicon-check SelectMenu-icon SelectMenu-icon--check" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path  d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path></svg>
                                    <span class="text-normal" data-menu-button-text="">HTML</span>
                                    </label>
                                    <label class="SelectMenu-item" role="menuitemradio" aria-checked="false" tabindex="0">
                                    <input type="radio" onChange={(e)=>{document.getElementById("language-options").removeAttribute("open");setLanguage(e.target.value)}} name="language" id="language_javascript" value="javascript" hidden="hidden" data-autosubmit="true"/>
                                    <svg class="octicon octicon-check SelectMenu-icon SelectMenu-icon--check" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path  d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path></svg>
                                    <span class="text-normal" data-menu-button-text="">JavaScript</span>
                                    </label>
                                    <label class="SelectMenu-item" role="menuitemradio" aria-checked="false" tabindex="0">
                                    <input type="radio" onChange={(e)=>{document.getElementById("language-options").removeAttribute("open");setLanguage(e.target.value)}} name="language" id="language_css" value="css" hidden="hidden" data-autosubmit="true"/>
                                    <svg class="octicon octicon-check SelectMenu-icon SelectMenu-icon--check" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z"></path></svg>
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