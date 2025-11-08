
interface HeadingProps {
    title?: string;
    text?: 'center' | 'left' | 'right';
}

const Heading = ({ title, text = "left" }: HeadingProps) => {
    return (
        <div className={`text-${text} text-2xl px-10 text-slate-500 font-bold`}>{title}</div>
    )
}

export default Heading