import React, {useState} from "react";

function Footer(){
    const year = new Date().getFullYear();
    return <footer>
        <p>Copyright Green Applications ⓒ {year}</p>
    </footer>;
}

export default Footer;