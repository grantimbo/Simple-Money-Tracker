import Link from "next/link";

const BackHomeLink = () => {
  return (
    <div className="border-b border-gray-200 pb-6 mb-10">
      <Link href="/dash">
        <a className="text-lg bg-lime-500 rounded-full px-4 py-2 text-white inline-flex items-center space-x-2 ">
          <span className="material-icons-round">arrow_back</span>
          <span>Back</span>
        </a>
      </Link>
    </div>
  );
};

export default BackHomeLink;
