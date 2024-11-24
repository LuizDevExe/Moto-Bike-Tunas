import React from 'react'
import './HeaderDinamico.css'
import { Outlet, Link, useNavigate } from 'react-router-dom';
import logoPrincipalHeader from '../../assets/logos/logo-montanha-branca.webp'
import retanguloLogo from '../../assets/retangulo-fundo-logo.webp'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Cart from '../Cart/Cart';


function HeaderDinamico() {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/')
    };

    const handleNavigate = (path) => {
        navigate(`/produtos/${path}`);
        handleClose()
    };


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <header>


            <nav>
                <div className='logo-principal'>
                    <img
                        src={retanguloLogo}
                        alt="icone representando dois picos ou montanhas, imagem representa logo da loja"
                        onClick={() => handleHome()}
                    />
                </div>
                <ul>
                    <li>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}

                            sx={{
                                color: "#222222",
                                fontFamily: 'Poppins',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                textTransform: 'captalize',
                                 
                            }}
                            
                        >
                            Produtos 
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}

                            
                            
                        >
                            <MenuItem onClick={() => handleNavigate('motos')}>Motos</MenuItem>
                            <MenuItem onClick={() => handleNavigate('bicicletas')}>bicicletas</MenuItem>
                            <MenuItem onClick={() => handleNavigate('estetica')}>Estética</MenuItem>
                        </Menu>
                       
                    </li>
                    <li><Link to="/">SOBRE</Link></li>
                    <li><Link to="/">CONTATO</Link></li>
                </ul>
               
            </nav>
             <div className='container-cart-button'>
                    <Cart/>
            </div>
        </header>
    )
}

export default HeaderDinamico;