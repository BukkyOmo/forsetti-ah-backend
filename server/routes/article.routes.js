import express, { Router } from 'express';
import { ArticleController, CommentController } from '../controllers';
import { tryCatch, createArticle, checkComments } from '../utils';
import { signInAuth } from '../utils/users/permissions.util';
import imageUpload from '../config/cloudinaryconfig';

const { createComments, threadedComment } = CommentController;

const router = new Router();

router.post('/', [signInAuth, imageUpload, createArticle], tryCatch(ArticleController.createArticle));

router.post('/:slug/comment', [checkComments, signInAuth], tryCatch(createComments));

router.post('/:slug/comment/:commentid/thread', [checkComments, signInAuth], tryCatch(threadedComment));

export default router;
