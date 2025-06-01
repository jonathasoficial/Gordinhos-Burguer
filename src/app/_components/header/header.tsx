"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const checkIsOpen = () => {
            const now = new Date();
            const brasilDate = new Date(
                now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
            );

            const day = brasilDate.getDay(); // 0 = Domingo, 6 = Sábado
            const hour = brasilDate.getHours();
            const minute = brasilDate.getMinutes();

            const isOpenDay = day >= 2 && day <= 6;
            const afterOpen = hour > 18 || (hour === 18 && minute >= 30);
            const beforeClose = hour < 23 || (hour === 23 && minute === 0);

            return isOpenDay && afterOpen && beforeClose;
        };

        setIsOpen(checkIsOpen());

        const interval = setInterval(() => {
            setIsOpen(checkIsOpen());
        }, 60000); // Atualiza a cada 1 minuto

        return () => clearInterval(interval);
    }, []);

    return (
        <header className="w-full h-[420px] bg-slate-900 bg-header">
            <div className="w-full h-full flex flex-col items-center justify-center">
                <Image
                    className="rounded-full shadow-lg hover:scale-100 transition-all duration-200"
                    src="/headerLogo.png"
                    alt="Logo da Gordinhos Burguer"
                    width={180}
                    height={180}
                />

                <h1 className="text-3xl mt-4 text-white font-bold">
                    Gordinhos Burguer
                </h1>

                <span className="text-white font-medium">
                    Rua Francisco Xavier Ribeiro, 62 - Bairro Chesf
                </span>

                <div className={`px-4 py-1 rounded-lg mt-5 ${isOpen ? 'bg-green-600' : 'bg-red-600'}`}>
                    <span className="text-white font-medium">
                        Ter à Sáb - 18:30 às 23:00
                    </span>
                </div>
            </div>
        </header>
    );
}
