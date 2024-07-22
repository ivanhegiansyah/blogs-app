export type PostsResponse = {
  posts: Post[];
  total: number;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reaction;
  views: number;
};

export type Reaction = {
  likes: number;
  dislikes: number;
};

export type Comment = {
  id: number;
  body: string;
  likes: string;
  user: UserComment;
};

export type CommentsResponse = {
  comments?: Comment[];
  total: number;
};

export type UserComment = {
  id: number;
  fullName: string;
};

export type FormType = {
  value: string;
  isError: boolean;
  message: string;
};
