import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const SkelentonCard = ({ className = "" }) => {
  return (
    <>
      <div>
        <div className="flex justify-between cursor-pointer text-customGray-200">
          <div className="flex gap-6">
            <div className="w-9 h-9">
              <Skeleton circle height={48} width={48} />
            </div>
            <div>
              <div className="flex items-center gap-1 font-bold">
                <Skeleton height={14} width={40} />
                <p className="px-2 py-[2px] text-xs bg-customGray-200 bg-opacity-10 rounded-2xl">
                  <Skeleton height={14} width={30} />
                </p>
              </div>
              <div className="flex gap-1 text-sm text-opacity-75 text-customGray-200">
                <Skeleton height={14} width={60} />
                <Skeleton height={14} width={40} />
              </div>
            </div>
          </div>
          <div>
            <h1 className="mb-0.5 text-customGray-200 text-end">
              <Skeleton height={14} width={70} />
            </h1>
            <div className="text-sm text-opacity-75 text-customGray-200">
              <Skeleton height={14} width={70} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkelentonCard;
