export function isHamburgueriaOpen() {
    const now = new Date();
    const brasilDate = new Date(
        now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
    );

    const day = brasilDate.getDay();
    const hour = brasilDate.getHours();
    const minute = brasilDate.getMinutes();

    const isOpenDay = day >= 2 && day <= 6;
    const afterOpen = hour > 18 || (hour === 18 && minute >= 30);
    const beforeClose = hour < 23 || (hour === 23 && minute === 0);

    return isOpenDay && afterOpen && beforeClose;
}
