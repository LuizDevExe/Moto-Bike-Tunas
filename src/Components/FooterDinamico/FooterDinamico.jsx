import React from 'react'
import './FooterDinamico.css'
import logoFooter from '../../assets/logos/Logo-Padrao-Branca.webp'
import instagram from '../../assets/instagram.svg'
import facebook from '../../assets/facebook.svg'
import whatsapp from '../../assets/whatsapp.svg'

function FooterDinamico() {
    return (
        <footer>
            <section>
                <div>
                    <img src={logoFooter} alt="Logo Da loja moto bikes tunas contendo uma montanha em branco e uma catraca de bike" />
                </div>
                <div>
                    <ul>
                        <li>
                            <span>(49)99152-5379</span>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/motobiketunas/" target='blank'>
                                <img src={instagram} alt="" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/Motobiketunas" target='blank'>
                                <img src={facebook} alt="" />
                            </a>
                        </li>
                        <li>
                            <a href="https://wa.me/5549991525379" target='blank'>
                                <img src={whatsapp} alt="" />
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </footer>
    )
}

export default FooterDinamico