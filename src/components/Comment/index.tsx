export type PropsType = {
  key?: number;
  item?: any;
};

const Comment = ({ item }: PropsType) => {
  return (
    <div className="flex">
      <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
        <div className="flex items-center justify-between">
          <strong>{item?.user?.fullName}</strong>
          <span className="text-xs text-gray-400">
            user ID: {item?.user?.id}
          </span>
        </div>

        <p className="text-sm">{item?.body}</p>
        <div className="mt-4 flex items-center">
          <div className="text-sm text-gray-500 font-semibold">
            {item?.likes} likes
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
