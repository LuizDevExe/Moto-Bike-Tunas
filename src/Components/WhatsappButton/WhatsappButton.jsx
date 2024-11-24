import React, { useEffect, useState } from 'react';
import './WhatsappButton.css';
import whatsappLogo from '../../assets/whatsapp/whatsapp.svg';

export default function WhatsappButton({ products, oneUnit }) {

    const exampleProducts = [
        {
            system_cod: 124,
            product: "Glazy 500ml",
            quantity: 2,
            price: '18,90'
        },
        {
            system_cod: 653,
            product: "V-Mol 500ml",
            quantity: 1,
            price: '15,90'
        },
        {
            system_cod: 845,
            product: "Pneu Pretinho 1L",
            quantity: 2,
            price: '19,90'
        }
    ];

    const exampleOneProduct =
        [
            {
                system_cod: 124,
                product: "Glazy 500ml",
                quantity: 2,
                price: '18,90'
            }
        ];


    const buildMessage = () => {
        let message = '';

        if (products && products.length > 0) {
            if (oneUnit) {
                message = '*Olá, eu gostaria mais informações sobre:*\n';

                const produto = products[0];
                message += `${produto.product} - Preço: R$${produto.price}\n`;
            } else {
                message = '*Itens do meu Carrinho:*\n';
                message += `------------------------ \n`

                let totalPrice = 0;

                products.forEach((item) => {
                    const priceAsNumber = parseFloat(item.price.replace(',', '.'));
                    totalPrice += item.quantity * priceAsNumber;
                    message += `cod: ${item.system_cod} - qtd: ${item.quantity} - ${item.product} - Preço (un): R$${item.price}\n`;
                    message += `------------------------ \n`
                });
                const totalFormated = totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                message += `Total: R$ ${totalFormated}`;
            }
        } else {
            message += 'Nenhum produto no carrinho.';
        }

        return encodeURIComponent(message);
    }

    const sendWhatsappMessage = () => {
        const number = '5549991525379';
        const message = buildMessage();
        window.open(`https://wa.me/${number}?text=${message}`, '_blank');
    };

    return (
        <div>
            <a
                onClick={sendWhatsappMessage}
                className='button-whatsapp'
            >
                <img src={whatsappLogo} alt="" />
                {oneUnit ? 'Mais Informações' : 'Enviar Pedido'}
            </a>
        </div>
    );
}