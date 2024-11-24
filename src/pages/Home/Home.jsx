import HeaderDinamico from '../../Components/HeaderDinamico/HeaderDinamico'
import './home.css'
import imagemSobre from '../../assets/imagem-capa.webp'
import instagram from '../../assets/instagram.svg'
import facebook from '../../assets/facebook.svg'
import whatsapp from '../../assets/whatsapp.svg'
import Moto1 from '../../assets/images-home/motos-home/moto1.webp'
import Moto2 from '../../assets/images-home/motos-home/moto2.webp'
import Moto3 from '../../assets/images-home/motos-home/moto3.webp'
import Moto4 from '../../assets/images-home/motos-home/moto4.webp'
import Moto5 from '../../assets/images-home/motos-home/moto5.webp'
import bike1 from '../../assets/images-home/bikes-home/bike1.webp'
import bike2 from '../../assets/images-home/bikes-home/bike2.webp'
import bike3 from '../../assets/images-home/bikes-home/bike3.webp'
import bike4 from '../../assets/images-home/bikes-home/bike4.webp'
import bike5 from '../../assets/images-home/bikes-home/bike5.webp'
import estetica1 from '../../assets/images-home/estetica-home/estetica1.webp'
import estetica2 from '../../assets/images-home/estetica-home/estetica2.webp'
import estetica3 from '../../assets/images-home/estetica-home/estetica3.webp'
import estetica4 from '../../assets/images-home/estetica-home/estetica4.webp'
import estetica5 from '../../assets/images-home/estetica-home/estetica5.webp'
import arrow from '../../assets/images-home/arrow.webp'
import star from '../../assets/images-home/yellowStar.webp'
import MapComponent from '../../components/MapComponent/MapComponent'
import FooterDinamico from '../../components/FooterDinamico/FooterDinamico'
import feedbacks from '../../utils/database/feedback'
import { useNavigate, } from 'react-router-dom'
import { useState } from 'react'


function Home() {

  const [currentFeedBackCount, setCurrentFeedbackCount] = useState(0);
  const [currentFeedback, setCurrentFeedback] = useState(feedbacks[currentFeedBackCount]);
  const navigate = useNavigate();


  const handleNextFeedback = async () => {
    if (currentFeedBackCount === feedbacks.length - 1) {
      setCurrentFeedbackCount(0);
      setCurrentFeedback(feedbacks[0]);
    } else {
      setCurrentFeedbackCount(currentFeedBackCount + 1);
      setCurrentFeedback(feedbacks[currentFeedBackCount + 1]);
    }

  };

  const handlePrevFeedback = async () => {

    if (currentFeedBackCount == 0) {
      setCurrentFeedbackCount(feedbacks.length - 1);
      setCurrentFeedback(feedbacks[currentFeedBackCount]);
    } else {
      setCurrentFeedbackCount(currentFeedBackCount - 1);
      setCurrentFeedback(feedbacks[currentFeedBackCount]);
    }

  }

  function handleNavigate(path) {
    navigate(`/produtos/${path}`);
  }

  

  return (
    <>
      <HeaderDinamico />
      <main className='container-main-home'>
        <section className='container-sobre'>
          <article>
            <div>
             
              <h1>Bem-Vindo!</h1>
              <p>
                Somos uma loja e oficina mecanica localizada em Tunápolis-SC. Atuando a mais de 20 anos no mesmo segmento.
                Prezamos pelo bom atendimento e pela satisfação dos nossos clientes
              </p>
              <ul>
                <li>
                  <a href="https://www.instagram.com/motobiketunas/" target='blank'onClick={() => handleNavigateMotos()}>
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
          </article>
          <img src={imagemSobre} alt="Imagem de um motoqueiro pilotando uma moto, o mesmo possui vestimentas pretas e proteção para pilotagem" />
        </section>
        <section className='container-produtos'>
          <ul>
            <li onClick={() => handleNavigate('motos')}>

              <h3>MOTOS</h3>
            </li>
            <li onClick={() => handleNavigate('motos')}>
              <img src={Moto1} alt="Imagem com motocicleta" />
            </li>
            <li onClick={() => handleNavigate('motos')}>
              <img src={Moto2} alt="Imagem com motocicleta" />
            </li>
            <li onClick={() => handleNavigate('motos')}>
              <img src={Moto3} alt="Imagem com motocicleta" />
            </li>
            <li onClick={() => handleNavigate('motos')}>
              <img src={Moto4} alt="Imagem com motocicleta" />
            </li>
            <li onClick={() => handleNavigate('motos')}>
              <img src={Moto5} alt="Imagem com motocicleta" />
            </li>
          </ul>
          <ul>
            <li onClick={() => handleNavigate('bicicletas')}>
              <h3>BICICLETAS</h3>
            </li>
            <li onClick={() => handleNavigate('bicicletas')}>
              <img src={bike1} alt="Imagem com bicicleta" />
            </li>
            <li onClick={() => handleNavigate('bicicletas')}>
              <img src={bike2} alt="Imagem com bicicleta" />
            </li>
            <li onClick={() => handleNavigate('bicicletas')}>
              <img src={bike3} alt="Imagem com bicicleta" />
            </li>
            <li onClick={() => handleNavigate('bicicletas')}>
              <img src={bike4} alt="Imagem com bicicleta" />
            </li>
            <li onClick={() => handleNavigate('bicicletas')}>
              <img src={bike5} alt="Imagem com bicicleta" />
            </li>
          </ul>
          <ul>
            <li onClick={() => handleNavigate('estetica')}>
              <h3>ESTÉTICA</h3>
            </li>
            <li onClick={() => handleNavigate('estetica')}>
              <img src={estetica1} alt="Imagem com motocicleta" />
            </li>
            <li onClick={() => handleNavigate('estetica')}>
              <img src={estetica2} alt="Imagem com motocicleta" />
            </li>
            <li onClick={() => handleNavigate('estetica')}>
              <img src={estetica3} alt="Imagem com motocicleta" />
            </li>
            <li onClick={() => handleNavigate('estetica')}>
              <img src={estetica4} alt="Imagem com motocicleta" />
            </li>
            <li onClick={() => handleNavigate('estetica')}>
              <img src={estetica5} alt="Imagem com motocicleta" />
            </li>
          </ul>
        </section>
        <section className='container-feedback'>
          <article>
            <button
              className='left-arrow-feedback'
              onClick={handlePrevFeedback}
            >
              <img src={arrow} alt="seta apontando para esquerda para trocar a exposição de feedback" />
            </button>
            <div className='card-feedback'>
              <h4>
                {currentFeedback.sellerName}
              </h4>
              <p>{currentFeedback.clientFeedback}</p>
              <ul>
                <li>
                  <img src={star} alt="Estrela demonstrando nível de qualidade" />
                </li>
                <li>
                  <img src={star} alt="Estrela demonstrando nível de qualidade" />
                </li>
                <li>
                  <img src={star} alt="Estrela demonstrando nível de qualidade" />
                </li>
                <li>
                  <img src={star} alt="Estrela demonstrando nível de qualidade" />
                </li>
                <li>
                  <img src={star} alt="Estrela demonstrando nível de qualidade" />
                </li>
              </ul>
            </div>
            <button
              className='right-arrow-feedback'
              onClick={() => handleNextFeedback()}
            >
              <img src={arrow} alt="seta apontando para esquerda para trocar a exposição de feedback" />
            </button>
          </article>
        </section>
        <section className='container-contato'>
          <h2>CONTATO</h2>
          <article>
            <MapComponent />
          </article>
          <div className='container-info-contato'>
            <ul>
              <li>
                <div>
                  <img src="https://img.icons8.com/ios-filled/50/phone.png"  alt="ícone de telefone indicando o número da loja" />
                  <p>(49)99152-5379</p>
                </div>
              </li>
              <li>
                <p>Segunda a Sexta - 7:30 ás 11:30/13:30 ás  18:00</p>
                <p>Sábado - 7:30 as 11:30</p>
              </li>
              <li>
                <div>
                  <img src="https://img.icons8.com/ios-filled/50/marker.png" alt="Marcador de localização" />
                  <p>Tunápolis/SC</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <FooterDinamico />
    </>
  )
}

export default Home