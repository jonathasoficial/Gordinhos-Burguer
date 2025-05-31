export default function Title({ title }: { title: string }) {
    return (
        <div className=" px- mb-8 mt-8">
            <h2 className="font-bold text text-1xl">
                {title}
            </h2>
        </div>
    )
}