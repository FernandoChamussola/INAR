import Image from "next/image";
import Link from "next/link";
import { Portfolio } from "@/types/portfolio";

const SinglePortfolio = ({ portfolio }: { portfolio: Portfolio }) => {
  return (
    <div className="group relative overflow-hidden rounded-sm bg-white shadow-one duration-300 hover:shadow-two dark:bg-dark dark:shadow-three dark:hover:shadow-gray-dark">
      <Link href={portfolio.href} className="relative block aspect-[37/22] w-full">
        <Image src={portfolio.image} alt={portfolio.title} fill />
        <div className="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-40 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white text-black transition-all duration-300 hover:scale-110">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0L9.09 5.26L14 4L10.74 8.74L16 10L10.74 11.26L14 16L9.09 14.74L8 20L6.91 14.74L2 16L5.26 11.26L0 10L5.26 8.74L2 4L6.91 5.26L8 0Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </Link>
      <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8">
        <h3>
          <Link
            href={portfolio.href}
            className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
          >
            {portfolio.title}
          </Link>
        </h3>
        <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
          {portfolio.category}
        </p>
      </div>
    </div>
  );
};

export default SinglePortfolio;
