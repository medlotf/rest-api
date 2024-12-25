import db from "./../../db";

export const getArticles = async () => {
  return db.article.findMany();
};

export const createArticle = async (data: {
  title: string;
  content: string;
}) => {
  return db.article.create({
    data,
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
  data: { title: string; content: string }
) => {
  return db.article.update({
    where: {
      id: articleId,
    },
    data,
  });
};

export const deleteArticle = async (articleId: number) => {
  return db.article.delete({
    where: {
      id: articleId,
    },
  });
};
