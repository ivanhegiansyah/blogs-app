import Link from 'next/link';
import { Post } from '@/app/constant/types';

export type PropsType = {
  key?: number;
  item?: Post;
};

const Card = ({ item }: PropsType) => {
  return (
    <Link href={`/posts/${item?.id}`} passHref>
      <section
        className={`w-full min-h-full rounded-lg overflow-hidden cursor-pointer bg-white border border-[#DEE3ED] shadow-[1px_1px_5px_0_rgba(0,0,0,0.1)]`}
      >
        <section className="py-4 px-2 space-y-2 w-full">
          <h2
            className={`overflow-hidden text-lg font-semibold flex-nowrap leading-[21px] text-ellipsis line-clamp-2`}
          >
            {item?.title}
          </h2>
          <p className="overflow-hidden text-sm font-normal flex-nowrap text-ellipsis line-clamp-4 text-[#686E76]">
            {item?.body}
          </p>
        </section>
      </section>
    </Link>
  );
};

export default Card;
