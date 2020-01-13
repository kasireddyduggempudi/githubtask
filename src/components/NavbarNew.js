import React from 'react';

function Navbar(){

        function change_class(){
            var x = document.getElementById("navbar");
            if(x.className === "navbar"){
                x.className+=" responsive";
            }else{
                x.className = "navbar";
            }
            console.log(x);
        }
        return(
            <div id="navbar" className="navbar">
                <div className="navbar-item" id="main_symbol">
                    <svg height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path style={{fill:"white"}} d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>                
                </div>
                <div className="navbar-item">
                    <div style={{display:"flex", position:"relative"}}>
                        <input type="text" placeholder="Search or jump to..." id="navbar-search" />
                        <img id="navbar-search-image" src="https://github.githubassets.com/images/search-key-slash.svg" alt=""></img>
                    </div>
                </div>
                <div className="navbar-item">
                    <span>Pull requests</span>
                </div>
                <div className="navbar-item">
                    <span>Issues</span>
                </div>
                <div className="navbar-item">
                    Marketplace
                </div>
                <div className="navbar-item">
                    Explore
                </div>
                <div className="navbar-item" id="bar_div" onClick={change_class}>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                </div>
                <div className="navbar-item" id="navbar-right">
                    <div className="navbar-right-item" id="notifications">
                        <svg width="14" height="16" aria-hidden="true"><path style={{fill:"white",cursor:"pointer"}} d="M14 12v1H0v-1l.73-.58c.77-.77.81-2.55 1.19-4.42C2.69 3.23 6 2 6 2c0-.55.45-1 1-1s1 .45 1 1c0 0 3.39 1.23 4.16 5 .38 1.88.42 3.66 1.19 4.42l.66.58H14zm-7 4c1.11 0 2-.89 2-2H5c0 1.11.89 2 2 2z"></path></svg>
                    </div>
                    <div className="navbar-right-item">
                        <span style={{cursor:"pointer"}}>&#9662;&nbsp;</span><svg viewBox="0 0  12 16" version="1.1" width="12" height="16" aria-hidden="true"><path style={{fill:"white", cursor:"pointer"}} d="M12 9H7v5H5V9H0V7h5V2h2v5h5v2z"></path></svg>
                    </div>
                    <div className="navbar-right-item">
                        <img style={{borderRadius:"3px", cursor:"pointer"}} src="https://avatars2.githubusercontent.com/u/47360225?s=40&amp;v=4" width="20" height="20" /><span style={{alignSelf:"center",cursor:"pointer"}}>&nbsp;&#9662;</span>
                    </div>
                </div>
            </div>
        );  
}

export default Navbar;