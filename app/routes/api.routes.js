import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.get("/", (req, res) => {
  const path = `/api/auth/${uuidv4()}`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

router.get("/auth/:slug", (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

export default router;
