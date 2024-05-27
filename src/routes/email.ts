import { Router } from "express";
import { emailAdapter } from "../adapters/email-adapter";

export const emailRouter = Router()

emailRouter.post('/send', async (req, res) => {
    await emailAdapter.sendEmail(req.body.email, req.body.message, req.body.subject)
})
