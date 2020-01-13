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
                    <select name="filter_type" className='filter_btn'>
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
                    </select>
                </div>                        
            </div>

            <div id="results_display_div" style={{marginRight:"3%"}}>
                {
                    (searchKeyword || language)?
                        ((finalData.length)?
                (<div className="clear_div">{finalData.length} results for repositories {searchKeyword?<span>matching <b>{searchKeyword}</b></span>:null} {language?<span>written in <b>{language}</b></span>:null}<a id="clear_btn" onClick={()=>handleClear()}>Clear</a></div>)
                        :null)
                    :null
                }
                {
                    finalData.length?(finalData.map((item, id)=><DisplayRepos key={id} repoInfo={item} />)):<DisplayRepos repoInfo={{}} />
                }             
            </div>
        </div>
    );
}

export default RepositoryDiv;