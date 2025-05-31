import Image from "next/image";

export default function Header() {

    const IsOpen = () => {
        const now = new Date()
        const currentHour = now.getHours()
        const currentMinute = now.getMinutes()

        const afterOpen = currentHour > 18 || (currentHour === 18 && currentMinute >= 30)
        const beforeClose = currentHour < 23 || (currentHour === 23 && currentMinute === 0)

        return afterOpen && beforeClose
    }

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

                <div className={`px-4 py-1 rounded-lg mt-5 ${IsOpen() ? 'bg-green-600' : 'bg-red-600'}`}>
                    <span className="text-white font-medium">
                        Ter á Sab - 18:30 ás 23:00
                    </span>
                </div>
            </div>
        </header >
    )
}