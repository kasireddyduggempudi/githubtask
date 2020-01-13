import React from 'react';

function SideDiv(props){
    
    return(

        <div id="side_panel">
            <div id="image_and_name_div">
                <div id="image_div">
                    <img id="image" src={props.info.avatar_url} width="260" height="260" />
                </div>
                <div id="name_div">
                    <div id="name">{props.info.name}</div>
                    <div id="user_name">{props.info.login}</div>
                    <div id="btn_div"><button id="follow_btn">Follow</button></div>
                </div>
            </div>
            <div id="bio_data_div">
                <span id="bio">{props.info.bio}</span>
                <span id="company">
                    <svg width="16" height="14" aria-hidden="true"><path style={{fill:"gray"}} d="M16 12.999c0 .439-.45 1-1 1H7.995c-.539 0-.994-.447-.995-.999H1c-.54 0-1-.561-1-1 0-2.634 3-4 3-4s.229-.409 0-1c-.841-.621-1.058-.59-1-3 .058-2.419 1.367-3 2.5-3s2.442.58 2.5 3c.058 2.41-.159 2.379-1 3-.229.59 0 1 0 1s1.549.711 2.42 2.088C9.196 9.369 10 8.999 10 8.999s.229-.409 0-1c-.841-.62-1.058-.59-1-3 .058-2.419 1.367-3 2.5-3s2.437.581 2.495 3c.059 2.41-.158 2.38-1 3-.229.59 0 1 0 1s3.005 1.366 3.005 4z"></path></svg>                    
                    &nbsp;&nbsp;{props.info.company}
                </span>
                <span id="location">
                    <svg width="12" height="16"><path style={{fill:"gray"}} d="M6 0C2.69 0 0 2.5 0 5.5 0 10.02 6 16 6 16s6-5.98 6-10.5C12 2.5 9.31 0 6 0zm0 14.55C4.14 12.52 1 8.44 1 5.5 1 3.02 3.25 1 6 1c1.34 0 2.61.48 3.56 1.36.92.86 1.44 1.97 1.44 3.14 0 2.94-3.14 7.02-5 9.05zM8 5.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path></svg>                   
                    &nbsp;&nbsp;&nbsp;{props.info.location}
                </span>
                <span id="email">
                    <svg  width="14" height="16"><path style={{fill:"gray"}} d="M0 4v8c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H1c-.55 0-1 .45-1 1zm13 0L7 9 1 4h12zM1 5.5l4 3-4 3v-6zM2 12l3.5-3L7 10.5 8.5 9l3.5 3H2zm11-.5l-4-3 4-3v6z"></path></svg>
                    &nbsp;&nbsp;supreetsingh.247@gmail.com
                </span>
            </div>
        </div>
    );
}

export default SideDiv;