import { FaCartPlus } from "react-icons/fa";

type FooterProps = {
    onOpenCart: () => void;
    cartCount: number;
};

export default function Footer({ onOpenCart, cartCount }: FooterProps) {
    return (
        <footer className="w-full bg-red-500 py-2 fixed bottom-0 z-40 flex items-center justify-center">
            <button
                className="flex items-center gap-2 text-white font-bold"
                onClick={onOpenCart}
            >
                ( <span>{cartCount}</span> ) Veja meu carrinho
                <FaCartPlus className="text-lg text-white" />
            </button>
        </footer>
    );
}