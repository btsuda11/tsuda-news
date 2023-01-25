'use client';

import { useRouter } from "next/navigation";

type Props = {
    article: Article
}

function ReadMoreButton({ article }: Props) {
  const router = useRouter();
  const handleClick = () => {
    const queryString = Object.entries(article)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    const url = `/article?${queryString}`;
    router.push(url)
  }

  return (
    <button
        onClick={handleClick}
        className="bg-red-400 h-10 rounded-b-lg dark:text-gray-900 hover:bg-red-500"
    >
        read more
    </button>
  )
}

export default ReadMoreButton