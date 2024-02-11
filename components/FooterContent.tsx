import Link from "next/link";

interface FooterContentProps {
    title: string,
    data: {
        title: string,
        link: string,
    }[],
}

const FooterContent: React.FC<FooterContentProps> = ({ data, title }) => {
    return (
        <div className="">
            <h1 className="font-bold text-[16px] text-white mb-4">{ title }</h1>
            <div className="space-y-3 flex flex-col">
                { data.map((data, index) => (
                    <Link href={data.link} key={index} className="text-gray-400 text-[14x] cursor-pointer hover:text-white">
                        <span className="">{ data.title }</span>
                    </Link>
                ))}
            </div>
        </div>  
    );
}

export default FooterContent;