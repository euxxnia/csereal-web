import './Title.css';

interface TitleProps {
  location: string;
  title: string;
}

export default function Title({ location, title }: TitleProps) {
  return (
    <div className="p-4 w-fit flex flex-col">
      <div className="flex gap-2">
        <div className="w-fit text-sm">{location}</div>
        <Node />
      </div>
      <h3 className="text-xl font-bold w-fit min-w-[350px] mt-1.5 pr-[51px]">{title}</h3>
    </div>
  );
}

function Node() {
  return (
    <div className="flex grow items-center node">
      <div className="border border-orange rounded-full w-2.5 h-2.5" />
      <div className="grow h-0 border-t border-orange" />
      <div className="diag w-[52px] h-0 rotate-45 translate-y-[18.3px] -translate-x-[7.8px] border-t border-orange"></div>
    </div>
  );
}
