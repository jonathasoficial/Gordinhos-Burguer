import Image from "next/image";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Ativa os plugins
dayjs.extend(utc);
dayjs.extend(timezone);

export default function Header() {

    const isOpen = () => {
        const now = dayjs().tz('America/Sao_Paulo');
        const day = now.day();
        const hour = now.hour();
        const minute = now.minute();

        const isOpenDay = day >= 2 && day <= 6;
        const afterOpen = hour > 18 || (hour === 18 && minute >= 30);
        const beforeClose = hour < 23 || (hour === 23 && minute === 0);

        return isOpenDay && afterOpen && beforeClose;
    };

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

                <div className={`px-4 py-1 rounded-lg mt-5 ${isOpen() ? 'bg-green-600' : 'bg-red-600'}`}>
                    <span className="text-white font-medium">
                        Ter á Sáb - 18:30 às 23:00
                    </span>
                </div>
            </div>
        </header>
    );
}