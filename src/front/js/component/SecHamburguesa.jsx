import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Product from "./Product.jsx";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "../../styles/Stylecard.css";
import PropTypes from "prop-types";


export const CardHamburguesas = () => {
    const { store, actions } = useContext(Context);
    const [arrayHambur, setArrayHambur] = useState([]);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 5000, min: 4000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    useEffect(() => {
        actions.obtenerAllProducts();
    }, []);



    useEffect(() => {
        const hamburguesas = store.productos.filter((producto) => producto.category === "H");
        setArrayHambur(hamburguesas);
    }, [store.productos]);


    // const productHambur = arrayHambur.map((item, index) => (
    //     <Product key={index}
    //         id={item.id}
    //         name={item.name}
    //         url={item.img_url}
    //         price={item.cost}
    //         description={item.description}
    //         addmensaje={addmensaje}

    //     />
    // ));

    const addMensaje = (mensaje) => {

        console.log(mensaje)
    }

    const pepe = store.modalData.id

    return (
        <div>

            <div className="modal fade pruebahome" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

                <div className="modal-dialog pepesq1">
                    <div className="modal-content pruebasss">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body contenedorImg_Data">
                            {/* <div className="c1">
                                <img className="imagenDetalle" src="https://th.bing.com/th/id/R.b0413de9114bf291db0398ec898a8b47?rik=EpGjHxR4Kqr%2b5g&pid=ImgRaw&r=0" alt="" />

                            </div> */}

                            <div class="row">
                                <div class="col">
                                    <img className="imagenDetalle" src="https://th.bing.com/th/id/R.b0413de9114bf291db0398ec898a8b47?rik=EpGjHxR4Kqr%2b5g&pid=ImgRaw&r=0" alt="" />
                                </div>
                                <div class="col DetallesAgregados">



                                    <div className="c2_1">
                                        <div className="c2_conjunto">
                                            <div className="c2_1_1_Precio">
                                                hola
                                            </div>

                                            <div className="c2_1_1_Descripcion">
                                                mundo
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" c2_2">

                                        <section class="layout">
                                            <div className="bg-danger">
                                                <div>chico_1</div>
                                                <div>grande_1</div>

                                            </div>
                                            <div className="bg-primary">
                                                <ul className="Lista_Agregados  ">
                                                    <div className="col">hola</div>
                                                    <div className="col">hola</div>
                                                    <div className="col">hola</div>
                                                    <div className="col">hola</div>
                                                    <div className="col">hola</div>
                                                </ul>
                                            </div>
                                            <div className="bg-primary">
                                                <ul className="Lista_Agregados  ">
                                                    <div className="col">hola</div>
                                                    <div className="col">hola</div>
                                                    <div className="col">hola</div>
                                                    <div className="col">hola</div>
                                                    <div className="col">hola</div>
                                                </ul>
                                            </div>
                                        </section>
                                        <section class="layout">
                                            <div className="bg-danger">
                                                <div>chico_1</div>
                                                <div>grande_1</div>

                                            </div>
                                            <div className="bg-primary">
                                                <ul className="Lista_Agregados  ">
                                                    <div className="col">hola</div>
                                                    <div className="col">hola</div>
                                                    <div className="col">hola</div>
                                                    <div className="col">hola</div>
                                                    <div className="col">hola</div>
                                                </ul>
                                            </div>
                                        </section>
                                        {/* <div class=" contenedor_Agregados">

                                            <div className=" Tipos_Detalle ">
                                                <div className="Salsas_title ">
                                                    <div className="Sal_1">Salsas extra</div>
                                                    <div className="Maxsal">maximo 2 salsas</div>
                                                </div>

                                                <ul className="Lista_Agregados  ">
                                                    <div className="col">hola</div>
                                                    <div className="col">hola</div>
                                                    <div className="col">hola</div>
                                                    <div className="col">hola</div>
                                                    <div className="col">hola</div>
                                                </ul>
                                            </div>

                                            <div className="  Tipos_Detalle ">
                                                <div className="Bebidas_title ">
                                                    <div className="Sal_1">Salsas extra</div>
                                                    <div className="Maxsal">maximo 2 salsas</div>
                                                </div>

                                                <ul className="Lista_Bebidas ">
                                                    <div className="col">hola</div>
                                                    <div className="col">hola</div>
                                                    <div className="col">hola</div>
                                                    <div className="col">hola</div>
                                                    <div className="col">hola</div>
                                                </ul>


                                            </div>
                                        </div> */}

                                    </div>



                                </div>
                            </div>


                            {/* <div className="c2">

                                <div className="c2_1">
                                    <div className="c2_conjunto">
                                        <div className="c2_1_1_Precio">
                                            hola
                                        </div>

                                        <div className="c2_1_1_Descripcion">
                                            mundo
                                        </div>
                                    </div>
                                </div>
                                <div className=" c2_2">
                                    <div class=" contenedor_Agregados">

                                    </div>

                                </div>
                            </div> */}
                        </div>
                        <div className="modal-footer pruebaas">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>



            < div className="home" >
                <div className="App apapa">
                    <h1>Hamburguesas</h1>
                    <Carousel responsive={responsive}>

                        {arrayHambur.map((item, index) => {
                            return (

                                <Product addMensaje={addMensaje} key={index}
                                    id={item.id}
                                    name={item.name}
                                    url={item.img_url}
                                    price={item.cost}
                                    description={item.description}
                                />

                            )
                        })}
                    </Carousel>
                </div>
            </div >
        </div >
    );
};
