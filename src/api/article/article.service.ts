import db from "./../../db";

export const getArticles = async () => {
  return db.article.findMany();
};

export const createArticle = async (
  data: {
    title: string;
    content: string;
  },
  userId: number
) => {
  return db.article.create({
    data: {
      ...data,
      authorId: userId,
    },
  });
};

export const getArticleById = async (articleId: number) => {
  return db.article.findUnique({
    where: {
      id: articleId,
    },
  });
};

export const updateArticle = async (
  articleId: number,
  data: { title: string; content: string },
  userId: number
) => {
  return db.article.update({
    where: {
      id: articleId,
      authorId: userId,
    },
    data: {
      ...data,
      authorId: userId,
    },
  });
};

export const deleteArticle = async (articleId: number, userId: number) => {
  return db.article.delete({
    where: {
      id: articleId,
      authorId: userId,
    },
  });
};
