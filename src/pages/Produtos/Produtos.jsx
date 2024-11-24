import { useEffect, useState } from 'react';
import './Produtos.css'
import HeaderDinamico from '../../Components/HeaderDinamico/HeaderDinamico';
import Pagination from '../../components/Pagination/Pagination';
import { getProducts } from '../../utils/database/databaseFunctions';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FooterDinamico from '../../components/FooterDinamico/FooterDinamico';

function Produtos() {

  const filtro = useParams();
  const navigate = useNavigate();


  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedData = data.slice(startIndex, startIndex + itemsPerPage);

  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  const handleProductPage = (system_cod) => {
    navigate(`/produtos/${filtro.tipo}/${system_cod}`)
  }


  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts('todos');

      let filteredProducts = [...products]

      if (filtro.tipo == "motos") {
        filteredProducts = products.filter((produto) => produto.category == "motos");
      }

      if (filtro.tipo == "bicicletas") {
        filteredProducts = products.filter((produto) => produto.category == "bicicletas");
      }

      if (filtro.tipo == "estetica") {
        filteredProducts = products.filter((produto) => produto.category == "estetica");
      }

      setData([...filteredProducts])


    };
    fetchProducts();
  }, [filtro]);



  return (
    <>
      <HeaderDinamico />
      <main className='container-main-produtos'>
        <section className='container-paginacao-produtos'>
          <h1>Produtos</h1>
          <div className='breadcrumbs-produtos' >
            <Breadcrumbs
              aria-label="breadcrumb"
              separator=">"
            >
              <Link to={"/home"}>
                Home
              </Link>
              <Link to={"/produtos"}>
                Produtos
              </Link>
              <p>
                {
                  filtro.tipo === "estetica" ?
                  "Estética"
                  :
                  filtro.tipo
                }
              </p>
            </Breadcrumbs>
          </div>

          <ul>
            {selectedData.map((item, index) => (
              <li
                key={item.id}
                onClick={() => handleProductPage(item.system_cod)}
              >
                <img src={item.image_url} alt="" />
                <h3>{item.product}</h3>
                <p>R$ {item.price}</p>
              </li>
            ))}
          </ul>

          <Pagination
            totalItems={data.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </section>
      </main>
      <FooterDinamico />
    </>
  )
}

export default Produtos