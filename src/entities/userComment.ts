import unreal from "../unreal";

export interface IUserComment {
  user_id: string;
  product_id: string;
  content: string;
  created_at: string;
  edited_at: string;
}

export interface IUserCommentRow extends IUserComment {
  id: string;
}

const newComment = (user_id: string, product_id: string) => {
  const comment = {
    user_id,
    product_id,
    content: unreal.text.randomSentence(),
    created_at: unreal.date.randomSQLPastDate(3650, 366),
    edited_at: unreal.date.recentDate().toISOString(),
  };

  return comment;
};

export default newComment;
