import Image from "next/image";

export default function Header() {
    const isOpen = () => {
        const now = new Date();

        // Obter dia da semana no timezone de São Paulo
        const day = new Intl.DateTimeFormat('en-US', {
            timeZone: 'America/Sao_Paulo',
            weekday: 'short'
        }).format(now);

        // Obter hora no timezone de São Paulo
        const brasilHour = parseInt(new Intl.DateTimeFormat('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            hour: 'numeric',
            hour12: false,
        }).format(now));

        // Obter minutos no timezone de São Paulo
        const minute = parseInt(new Intl.DateTimeFormat('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            minute: 'numeric',
        }).format(now));

        // Verificar se é um dia de funcionamento (terça a sábado)
        const isOpenDay = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'].includes(day);

        // Verificar se está dentro do horário de funcionamento (18:30 às 23:00)
        const afterOpen = brasilHour > 18 || (brasilHour === 18 && minute >= 30);
        const beforeClose = brasilHour < 23 || (brasilHour === 23 && minute === 0);

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
                        Ter à Sáb - 18:30 às 23:00
                    </span>
                </div>
            </div>
        </header>
    );
}
