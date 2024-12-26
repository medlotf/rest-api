import { Request, Response } from "express";

import {
  getArticles,
  createArticle,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "./article.service";

export const create = async (req: Request, res: Response) => {
  const userId = res.locals.user.id;
  const article = await createArticle(req.body, userId);
  return res.status(201).send(article);
};

export const find = async (req: Request, res: Response) => {
  const articles = await getArticles();
  return res.status(200).send(articles);
};

export const findOne = async (req: Request, res: Response) => {
  const article = await getArticleById(Number(req.params.id));
  return res.status(200).send(article);
};

export const update = async (req: Request, res: Response) => {
  const userId = res.locals.user.id;

  const article = await updateArticle(Number(req.params.id), req.body, userId);
  return res.status(200).send(article);
};

export const del = async (req: Request, res: Response) => {
  const userId = res.locals.user.id;
  await deleteArticle(Number(req.params.id), userId);
  return res.status(204).send();
};
