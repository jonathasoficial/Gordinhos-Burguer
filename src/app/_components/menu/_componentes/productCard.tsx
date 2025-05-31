
import { Product } from '@/types/products';
import Image from 'next/image';
import { FaCartPlus } from "react-icons/fa";

type ProductCardProps = Product & {
    onAddToCart: () => void;
}

export function ProductCard({ name, description, price, image, onAddToCart, }: ProductCardProps) {
    return (
        <div className='flex gap-2 items-center justify-center'>
            <Image
                src={image}
                alt={name}
                width={112}
                height={112}
                className='rounded-md hover:scale-105 hover:-rotate-2 duration-300 object-cover'
            />

            <div className='w-full'>
                <p className='font-bold'>{name}</p>
                <p className='text-sm'>{description}</p>

                <div className='flex items-center gap-2 justify-between mt-3'>
                    <p className='text-lg font-bold'>R$ {price.toFixed(2)}</p>

                    <button
                        onClick={onAddToCart}
                        className='bg-gray-900 px-5 rounded'
                        data-name={name}
                        data-price={price}
                    >
                        <FaCartPlus
                            className='text-lg text-white' />

                    </button>
                </div>
            </div>
        </div>
    )
}