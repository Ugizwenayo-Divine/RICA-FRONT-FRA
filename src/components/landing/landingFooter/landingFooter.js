import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {Link} from 'react-router-dom';
import './landingFooter.css';

const landingFooter = () => {
    return(
        <div className='footer-container'>
            <div className='footer-left'>
                <h4 className='footer-head'>Service client</h4>
                <p><Link to='/addrefund'>Rembourser</Link></p>
                <p><Link to='/addfeedback'>Commentaire</Link></p>
            </div>
            <div className='footer-middle'>
                <h4 className='footer-head'>A propos de nous</h4>
                <div>L'incorporation de RICA est une boutique électronique qui fait également de la consultation de construction 
                    <br/>
                    RICA est situé à Kigali, KG523</div>
            </div>
            <div className='footer-right'>
            <h4 className='footer-head'>Nous contacter</h4>
                <p>Tel:+250780502050</p>
                <p>E:ricainc@gmail.com</p>
                <p>Emplacement:kigali</p>
            </div>
            <div className='footer-social'>
                <div className='facebook'><a href='https://www.facebook.com/Ricainc.ltd'><FontAwesomeIcon icon={faFacebook}/></a></div>
                <div className='twitter'><a href='https://www.twitter.com/@rica_inc'><FontAwesomeIcon icon={faTwitter}/></a></div>
                <div className='instagram'><a href='https://www.instagram.com/ricainc.ltd'><FontAwesomeIcon icon={faInstagram}/></a></div>
                <hr style={{width:'100%'}}/>
            </div>
            <hr/>
            <div className='footer-copyright'>
                &copy; 2020 RICA INC. Tous droits réservés.
            </div>
        </div>  
    )
}

export default landingFooter;