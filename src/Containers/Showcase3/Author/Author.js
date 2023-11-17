import React from 'react';
import classes from './Author.module.css';

const author = (props)=>{
    return(
        <div className = {classes.AuthorSection}>
            <header>
                <h2 className = {classes.Heading}>Author</h2>
                <div className = {classes.AuthorDp}>
                    {/* m'Gonna Do BAckGROUND (_^^_)*/}
                </div>
            </header>
            <div className = {classes.About}></div>
            <div className = {classes.Contact}>
                <h3 className = {classes.FollowLine}>--Do Follow The Author--</h3>
                <ul className = {classes.FollowNav}>
                    <li>
                        <a href = {props.author.contact.fb}><ion-icon name = "logo-facebook" /></a>
                        <h6>Follow on facebook</h6>
                    </li>
                    <li>
                        <a href = {props.author.contact.insta}><ion-icon name = "logo-instagram" /></a>
                        <h6>Follow on instagram</h6>
                    </li>
                    <li>
                        <a href = {props.author.contact.email}><ion-icon name = "mail-outline" /></a>
                        <h6>Or mail ME</h6>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default author;