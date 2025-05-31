import { Product } from "@/types/products";
import { ProductCard } from "./_componentes/productCard";
import menu from "@/data/menu.json";
import drinks from "@/data/drinks.json";
import fallow from "@/data/followUp.json";

type MenuProps = {
    onAddToCart: (product: Product) => void;
};

export default function Menu({ onAddToCart }: MenuProps) {
    const { hamburguerSimples, hamburguerEspecial } = menu;
    const { acompanhamentos } = fallow;
    const { latinhas } = drinks;

    return (
        <>
            <h2 className="text-center text-2xl md:text-3xl font-bold mt-9 mb-8">
                Conheça nosso menu
            </h2>

            <main className="mx-auto max-w-7xl px-2 mb-16">
                <section>
                    <h3 className="font-bold text-xl mb-10">Hamburguer Simples</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10">
                        {hamburguerSimples.map((item) => (
                            <ProductCard
                                key={item.id}
                                {...item}
                                onAddToCart={() => onAddToCart(item)}
                            />
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="font-bold text-xl my-4 mb-10 mt-5">Hamburguer Especial</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10">
                        {hamburguerEspecial.map((item) => (
                            <ProductCard
                                key={item.id}
                                {...item}
                                onAddToCart={() => onAddToCart(item)}
                            />
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="font-bold text-xl my-4 mb-10 mt-5">Acompanhamentos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10">
                        {acompanhamentos.map((item) => (
                            <ProductCard
                                key={item.id}
                                {...item}
                                onAddToCart={() => onAddToCart(item)}
                            />
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="font-bold text-xl my-4 mb-10 mt-5">Bebidas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10">
                        {latinhas.map((item) => (
                            <ProductCard
                                key={item.id}
                                {...item}
                                onAddToCart={() => onAddToCart(item)}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}